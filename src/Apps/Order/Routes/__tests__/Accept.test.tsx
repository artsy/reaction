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
import {
  acceptOfferFailed,
  AcceptOfferPaymentFailed,
  acceptOfferSuccess,
} from "../__fixtures__/MutationResults"
import { AcceptFragmentContainer } from "../Accept"
import { OrderAppTestPage } from "./Utils/OrderAppTestPage"

jest.mock("Apps/Order/Utils/trackPageView")
jest.unmock("react-relay")

jest.mock("Utils/getCurrentTimeAsIsoString")
const NOW = "2018-12-05T13:47:16.446Z"
require("Utils/getCurrentTimeAsIsoString").__setCurrentTime(NOW)

const testOrder = {
  ...OfferOrderWithShippingDetails,
  stateExpiresAt: moment(NOW)
    .add(1, "day")
    .toISOString(),
  lastOffer: {
    ...OfferWithTotals,
    createdAt: moment(NOW)
      .subtract(1, "day")
      .toISOString(),
    amount: "$sellers.offer",
    fromParticipant: "SELLER",
  },
  offers: { edges: Offers },
  buyer: Buyer,
}

describe("Accept seller offer", () => {
  const { mutations, buildPage, routes } = createTestEnv({
    Component: AcceptFragmentContainer,
    query: graphql`
      query AcceptTestQuery {
        order(id: "") {
          ...Accept_order
        }
      }
    `,
    defaultData: {
      order: testOrder,
    },
    defaultMutationResults: {
      ...acceptOfferSuccess,
    },
    TestPage: OrderAppTestPage,
  })

  describe("with default data", () => {
    let page: OrderAppTestPage
    beforeAll(async () => {
      page = await buildPage({
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
    })

    it("shows the countdown timer", async () => {
      expect(page.countdownTimer.text()).toContain("01d 04h 22m 59s left")
    })

    it("Shows the stepper", async () => {
      expect(page.orderStepper.text()).toMatchInlineSnapshot(`"Respond Review"`)
      expect(page.orderStepperCurrentStep).toBe(`Review`)
    })

    it("shows the transaction summary", async () => {
      expect(page.transactionSummary.text()).toMatch(
        "Accept seller's offerChange"
      )
      expect(page.transactionSummary.text()).toMatch(
        "Seller's offer$sellers.offer"
      )
    })

    it("shows the artwork summary", async () => {
      expect(page.artworkSummary.text()).toMatch(
        "Lisa BreslowGramercy Park South"
      )
    })

    it("shows the shipping details", async () => {
      expect(page.shippingSummary.text()).toMatch(
        "Ship toJoelle Van Dyne401 Broadway"
      )
    })

    it("shows the payment details", async () => {
      expect(page.paymentSummary.text()).toMatchInlineSnapshot(
        `"•••• 4444  Exp 3/21"`
      )
    })

    it("shows the submit button", async () => {
      expect(page.submitButton.text()).toBe("Submit")
    })

    it("Shows the conditions of sale disclaimer.", async () => {
      expect(page.conditionsOfSaleDisclaimer.text()).toMatchInlineSnapshot(
        `"By clicking Submit, I agree to Artsy’s Conditions of Sale."`
      )
    })
  })

  describe("mutation", () => {
    let page: OrderAppTestPage
    beforeEach(async () => {
      page = await buildPage()
    })

    it("routes to status page after mutation completes", async () => {
      await page.clickSubmit()
      expect(routes.mockPushRoute).toHaveBeenCalledWith(
        `/orders/${testOrder.id}/status`
      )
    })

    it("shows the button spinner while loading the mutation", async () => {
      await page.expectButtonSpinnerWhenSubmitting()
    })

    it("shows an error modal when there is an error from the server", async () => {
      mutations.useResultsOnce(acceptOfferFailed)
      await page.clickSubmit()
      await page.expectAndDismissDefaultErrorDialog()
    })

    it("shows an error modal if there is a capture_failed error", async () => {
      mutations.useResultsOnce(AcceptOfferPaymentFailed)
      await page.clickSubmit()
      await page.expectAndDismissErrorDialogMatching(
        "An error occurred",
        "There was an error processing your payment. Please try again or contact orders@artsy.net."
      )
      expect(routes.mockPushRoute).toHaveBeenCalledWith(
        `/orders/${testOrder.id}/payment/new`
      )
    })
  })

  it("tracks a pageview", async () => {
    await buildPage()
    expect(trackPageView).toHaveBeenCalledTimes(1)
  })
})
