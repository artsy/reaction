import {
  Buyer,
  OfferOrderWithShippingDetails,
  Offers,
  OfferWithTotals,
} from "Apps/__tests__/Fixtures/Order"
import { trackPageView } from "Apps/Order/Utils/trackPageView"
import moment from "moment"
import { commitMutation as _commitMutation, graphql } from "react-relay"
import {
  insufficientInventoryResponse,
  submitPendingOfferFailed,
  submitPendingOfferSuccess,
} from "../__fixtures__/MutationResults/submitPendingOffer"
import { CounterFragmentContainer } from "../Counter"
import { TestPage } from "./Utils/TestPage"

jest.mock("Apps/Order/Utils/trackPageView")
jest.mock("Utils/getCurrentTimeAsIsoString")
const NOW = "2018-12-05T13:47:16.446Z"
require("Utils/getCurrentTimeAsIsoString").__setCurrentTime(NOW)
jest.unmock("react-relay")

const testOrder = {
  ...OfferOrderWithShippingDetails,
  stateExpiresAt: moment(NOW)
    .add(1, "day")
    .add(4, "hours")
    .add(22, "minutes")
    .add(59, "seconds")
    .toISOString(),
  lastOffer: {
    ...OfferWithTotals,
    id: "lastOffer",
    createdAt: moment(NOW)
      .subtract(1, "day")
      .toISOString(),
    amount: "$sellers.offer",
  },
  myLastOffer: {
    ...OfferWithTotals,
    id: "myLastOffer",
    createdAt: moment(NOW)
      .subtract(1, "seconds")
      .toISOString(),
    amount: "$your.offer",
    fromParticipant: "BUYER",
  },
  offers: { edges: Offers },
  buyer: Buyer,
}

class CounterTestPage extends TestPage({
  Component: CounterFragmentContainer,
  query: graphql`
    query CounterTestQuery {
      order(id: "") {
        ...Counter_order
      }
    }
  `,
  defaultData: {
    order: testOrder,
  },
}) {}

describe("Submit Pending Counter Offer", () => {
  const page = new CounterTestPage()

  describe("with default data", () => {
    beforeAll(async () => {
      await page.init()
    })

    it("Shows the stepper", () => {
      expect(page.orderStepper.text()).toMatchInlineSnapshot(`"Respond Review"`)
      expect(page.orderStepperCurrentStep).toBe("Review")
    })

    it("shows the countdown timer", () => {
      expect(page.countdownTimer.text()).toContain("01d 04h 22m 59s left")
    })

    it("shows the transaction summary", () => {
      expect(page.transactionSummary.text()).toMatch("Your counterofferChange")
      expect(page.transactionSummary.text()).toMatch("Your offer$your.offer")
      expect(page.transactionSummary.text()).toMatch(
        "Seller's offer$sellers.offer"
      )
    })

    it("shows the artwork summary", () => {
      expect(page.artworkSummary.text()).toMatch(
        "Lisa BreslowGramercy Park South"
      )
    })

    it("shows the shipping details", () => {
      expect(page.shippingSummary.text()).toMatch(
        "Ship toJoelle Van Dyne401 Broadway"
      )
    })

    it("shows the payment details", () => {
      expect(page.paymentSummary.text()).toMatchInlineSnapshot(
        `"•••• 4444  Exp 3/21"`
      )
    })

    it("shows the submit button", () => {
      expect(page.submitButton.text()).toBe("Submit")
    })

    it("Shows the conditions of sale disclaimer.", () => {
      expect(page.conditionsOfSaleDisclaimer.text()).toMatch(
        "By clicking Submit, I agree to Artsy’s Conditions of Sale."
      )
    })
  })

  describe("mutation", () => {
    const resolveMutation = jest.fn(
      () => submitPendingOfferSuccess.ecommerceSubmitPendingOffer
    )
    beforeEach(async () => {
      resolveMutation.mockClear()
      await page.init({
        mockMutationResults: {
          ecommerceSubmitPendingOffer: resolveMutation,
        },
      })
    })

    it("routes to status page after mutation completes", async () => {
      await page.clickSubmit()

      expect(page.mockPushRoute).toHaveBeenCalledWith(
        `/orders/${testOrder.id}/status`
      )
    })

    it("shows the button spinner while loading the mutation", async () => {
      resolveMutation.mockImplementationOnce(() => {
        page.root.update()
        expect(page.submitButton.props().loading).toBeTruthy()
        return submitPendingOfferSuccess.ecommerceSubmitPendingOffer
      })

      expect(page.submitButton.props().loading).toBeFalsy()
      await page.clickSubmit()
      expect(page.submitButton.props().loading).toBeFalsy()
      expect.assertions(3)
    })

    it("shows an error modal with proper error when there is insufficient inventory", async () => {
      resolveMutation.mockReturnValueOnce(
        insufficientInventoryResponse.ecommerceSubmitPendingOffer
      )
      await page.clickSubmit()
      await page.expectErrorDialogMatching(
        "This work has already been sold.",
        "Please contact orders@artsy.net with any questions."
      )
    })

    it("shows generic error modal when there is an error from the server", async () => {
      resolveMutation.mockReturnValueOnce(
        submitPendingOfferFailed.ecommerceSubmitPendingOffer
      )
      await page.clickSubmit()
      await page.expectDefaultErrorDialog()
    })
    it("shows an error modal when there is a network error", async () => {
      page.mockMutationNetworkFailureOnce()
      await page.clickSubmit()
      await page.expectDefaultErrorDialog()
    })
  })

  describe("analytics", () => {
    beforeEach(async () => {
      await page.init()
    })
    it("tracks a pageview", () => {
      expect(trackPageView).toHaveBeenCalledTimes(1)
    })
  })
})
