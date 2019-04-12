import {
  Buyer,
  OfferOrderWithShippingDetails,
  Offers,
  OfferWithTotals,
} from "Apps/__tests__/Fixtures/Order"
import { trackPageView } from "Apps/Order/Utils/trackPageView"
import { createTestEnv } from "DevTools/createTestEnv"
import moment from "moment"
import { graphql } from "react-relay"
import * as paymentPickerMock from "../../Components/__mocks__/PaymentPicker"
import {
  creatingCreditCardSuccess,
  fixFailedPaymentFailure,
  fixFailedPaymentInsufficientInventoryFailure,
  fixFailedPaymentSuccess,
} from "../__fixtures__/MutationResults"
import { NewPaymentFragmentContainer } from "../NewPayment"
import { OrderAppTestPage } from "./Utils/OrderAppTestPage"

jest.unmock("react-tracking")
jest.unmock("react-relay")
jest.mock("Utils/Events", () => ({
  postEvent: jest.fn(),
}))

jest.mock("Apps/Order/Utils/trackPageView")
jest.mock(
  "Apps/Order/Components/PaymentPicker",
  // not sure why this is neccessary :(
  // should just work without this extra argument
  () => {
    return require("../../Components/__mocks__/PaymentPicker")
  }
)

jest.mock("Utils/getCurrentTimeAsIsoString")
const NOW = "2018-12-05T13:47:16.446Z"
require("Utils/getCurrentTimeAsIsoString").__setCurrentTime(NOW)

window.location.assign = jest.fn()

const testOrder = {
  ...OfferOrderWithShippingDetails,
  id: "1234",
  state: "SUBMITTED",
  stateExpiresAt: moment(NOW)
    .add(1, "day")
    .toISOString(),
  lastOffer: {
    ...OfferWithTotals,
    createdAt: moment(NOW)
      .subtract(1, "day")
      .toISOString(),
  },
  awaitingResponseFrom: "BUYER",
  offers: { edges: Offers },
  buyer: Buyer,
}

describe("Payment", () => {
  const { buildPage, mutations, routes } = createTestEnv({
    Component: NewPaymentFragmentContainer,
    defaultData: {
      order: testOrder,
      me: { creditCards: { edges: [] } },
    },
    defaultMutationResults: {
      ...creatingCreditCardSuccess,
      ...fixFailedPaymentSuccess,
    },
    query: graphql`
      query NewPaymentTestQuery {
        me {
          ...NewPayment_me
        }
        order: ecommerceOrder(id: "unused") {
          ...NewPayment_order
        }
      }
    `,
    TestPage: OrderAppTestPage,
  })

  beforeEach(() => {
    ;(window.location.assign as any).mockReset()
  })

  it("shows the countdown timer", async () => {
    const page = await buildPage({
      mockData: {
        order: {
          ...testOrder,
          stateExpiresAt: moment(NOW)
            .add(1, "day")
            .add(4, "hours")
            .add(22, "minutes")
            .add(59, "seconds")
            .toISOString(),
        },
      },
    })

    expect(page.countdownTimer.text()).toContain("01d 04h 22m 59s left")
  })

  it("shows the button spinner while loading the mutation", async () => {
    const page = await buildPage()
    await page.expectButtonSpinnerWhenSubmitting()
  })

  it("commits fixFailedPayment mutation with Gravity credit card id", async () => {
    const page = await buildPage()
    await page.clickSubmit()

    expect(mutations.lastFetchVariables).toMatchObject({
      input: {
        creditCardId: "credit-card-id",
        offerId: "myoffer-id",
      },
    })
  })

  it("takes the user to the status page", async () => {
    const page = await buildPage()
    await page.clickSubmit()
    expect(routes.mockPushRoute).toHaveBeenCalledWith("/orders/1234/status")
  })

  it("does not do anything when there are form errors", async () => {
    const page = await buildPage()
    paymentPickerMock.useInvalidFormResult()
    await page.clickSubmit()
    expect(mutations.mockFetch).not.toHaveBeenCalled()
    expect(routes.mockPushRoute).not.toHaveBeenCalled()
    expect(page.modalDialog.props().show).toBeFalsy()
  })

  it("shows the default error modal when the payment picker throws an error", async () => {
    paymentPickerMock.useThrownError()
    const page = await buildPage()
    await page.clickSubmit()
    await page.expectAndDismissDefaultErrorDialog()
  })

  it("shows an error modal and redirects to artist page when not enough inventory", async () => {
    const page = await buildPage()

    mutations.useResultsOnce(fixFailedPaymentInsufficientInventoryFailure)

    await page.clickSubmit()
    await page.expectAndDismissErrorDialogMatching(
      "Not available",
      "Sorry, the work is no longer available."
    )
    const artistId = testOrder.lineItems.edges[0].node.artwork.artists[0].id
    expect(window.location.assign).toHaveBeenCalledWith(`/artist/${artistId}`)
  })

  it("shows a custom error modal with when the payment picker returns a normal error", async () => {
    paymentPickerMock.useErrorResult()
    const page = await buildPage()
    await page.clickSubmit()
    await page.expectAndDismissErrorDialogMatching(
      "An error occurred",
      "This is the description of an error."
    )
  })

  it("shows an error modal when fixing the failed payment fails", async () => {
    const page = await buildPage()
    mutations.useResultsOnce(fixFailedPaymentFailure)
    await page.clickSubmit()
    await page.expectAndDismissErrorDialogMatching(
      "Charge failed",
      "Payment authorization has been declined. Please contact your card provider and try again."
    )
  })

  it("shows an error modal when there is a network error", async () => {
    const page = await buildPage()
    mutations.mockNetworkFailureOnce()

    await page.clickSubmit()
    await page.expectAndDismissDefaultErrorDialog()
  })

  it("tracks a pageview", async () => {
    await buildPage()
    expect(trackPageView).toHaveBeenCalledTimes(1)
  })
})
