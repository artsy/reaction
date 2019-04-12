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
  acceptOfferInsufficientInventoryFailure,
  acceptOfferPaymentFailed,
  acceptOfferPaymentFailedInsufficientFunds,
  acceptOfferSuccess,
} from "../__fixtures__/MutationResults"
import { AcceptFragmentContainer } from "../Accept"
import { OrderAppTestPage } from "./Utils/OrderAppTestPage"

jest.mock("Apps/Order/Utils/trackPageView")
jest.unmock("react-relay")

jest.mock("Utils/getCurrentTimeAsIsoString")
const NOW = "2018-12-05T13:47:16.446Z"
require("Utils/getCurrentTimeAsIsoString").__setCurrentTime(NOW)

window.location.assign = jest.fn()

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

  beforeEach(() => {
    ;(window.location.assign as any).mockReset()
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
      expect(page.orderStepper.text()).toMatchInlineSnapshot(
        `"checkRespond navigate rightReview"`
      )
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
        "Ship toLockedJoelle Van Dyne401 Broadway"
      )
    })

    it("shows the payment details", async () => {
      expect(page.paymentSummary.text()).toMatchInlineSnapshot(
        `"Lockedvisa•••• 4444   Exp 03/21"`
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
      mutations.useResultsOnce(acceptOfferPaymentFailed)
      await page.clickSubmit()
      await page.expectAndDismissErrorDialogMatching(
        "Charge failed",
        "Payment authorization has been declined. Please contact your card provider, then press “Submit” again. Alternatively, use a new card."
      )
      expect(routes.mockPushRoute).toHaveBeenCalledWith(
        `/orders/${testOrder.id}/payment/new`
      )
    })

    it("shows an error modal if there is a capture_failed error with insuffient_funds", async () => {
      mutations.useResultsOnce(acceptOfferPaymentFailedInsufficientFunds)
      await page.clickSubmit()
      await page.expectAndDismissErrorDialogMatching(
        "Insufficient funds",
        "There aren’t enough funds available on the card you provided. Please use a new card. Alternatively, contact your card provider, then press “Submit” again."
      )
      expect(routes.mockPushRoute).toHaveBeenCalledWith(
        `/orders/${testOrder.id}/payment/new`
      )
    })

    it("shows an error modal and routes the user to the artist page if there is insufficient inventory", async () => {
      mutations.useResultsOnce(acceptOfferInsufficientInventoryFailure)

      await page.clickSubmit()
      await page.expectAndDismissErrorDialogMatching(
        "Not available",
        "Sorry, the work is no longer available."
      )
      const artistId = testOrder.lineItems.edges[0].node.artwork.artists[0].id
      expect(window.location.assign).toHaveBeenCalledWith(`/artist/${artistId}`)
    })
  })

  it("tracks a pageview", async () => {
    await buildPage()
    expect(trackPageView).toHaveBeenCalledTimes(1)
  })
})
