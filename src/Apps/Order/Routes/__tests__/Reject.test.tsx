import { OfferOrderWithShippingDetails } from "Apps/__tests__/Fixtures/Order"
import { trackPageView } from "Apps/Order/Utils/trackPageView"
import { StepSummaryItem } from "Components/v2"
import moment from "moment"
import { commitMutation as _commitMutation, graphql } from "react-relay"
import {
  rejectOfferFailed,
  rejectOfferSuccess,
} from "../__fixtures__/MutationResults/rejectOffer"
import { RejectFragmentContainer } from "../Reject"
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
    createdAt: moment(NOW)
      .subtract(1, "day")
      .toISOString(),
  },
}

const resolveRejectMutation = jest.fn(
  () => rejectOfferSuccess.ecommerceBuyerRejectOffer
)

class RejectTestPage extends TestPage({
  Component: RejectFragmentContainer,
  query: graphql`
    query RejectTestQuery {
      order: ecommerceOrder(id: "unused") {
        ...Reject_order
      }
    }
  `,
  defaultData: {
    order: testOrder,
  },
  defaultMutationResults: {
    ecommerceBuyerRejectOffer: resolveRejectMutation,
  },
}) {}

describe("Buyer rejects seller offer", () => {
  beforeEach(() => {
    resolveRejectMutation.mockClear()
  })
  const page = new RejectTestPage()

  describe("the page layout", () => {
    beforeEach(async () => {
      await page.init()
    })

    it("Shows the stepper", () => {
      expect(page.orderStepper.text()).toMatchInlineSnapshot(`"Respond Review"`)
      expect(page.orderStepperCurrentStep).toBe("Review")
    })

    it("Shows the countdown timer", () => {
      expect(page.countdownTimer.text()).toContain("01d 04h 22m 59s left")
    })

    it("Shows a message explaining the consequences of a rejection", () => {
      expect(page.find(StepSummaryItem).text()).toContain(
        "Declining an offer permanently ends the negotiation process."
      )
    })

    it("Shows a change link that takes the user back to the respond page", () => {
      page.root.find("StepSummaryItem a").simulate("click")
      expect(page.mockPushRoute).toHaveBeenCalledWith(
        `/orders/${testOrder.id}/respond`
      )
    })
  })

  describe("taking action", () => {
    beforeEach(async () => {
      await page.init()
    })

    it("routes to status page after mutation completes", async () => {
      await page.clickSubmit()
      expect(page.mockPushRoute).toHaveBeenCalledWith(
        `/orders/${testOrder.id}/status`
      )
    })

    it("shows the button spinner while loading the mutation", async () => {
      await page.expectButtonSpinnerWhenSubmitting()
    })

    it("shows an error modal when there is an error from the server", async () => {
      resolveRejectMutation.mockReturnValueOnce(
        rejectOfferFailed.ecommerceBuyerRejectOffer
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

  it("tracks a pageview", async () => {
    await page.init()
    expect(trackPageView).toHaveBeenCalledTimes(1)
  })
})
