import { BorderedRadio, Button } from "@artsy/palette"
import {
  Buyer,
  OfferOrderWithShippingDetails,
  OfferOrderWithShippingDetailsAndNote,
  Offers,
  OfferWithTotals,
} from "Apps/__tests__/Fixtures/Order"
import { OfferHistoryItemFragmentContainer } from "Apps/Order/Components/OfferHistoryItem"
import moment from "moment"
import { RespondFragmentContainer } from "../Respond"

// Need to mock Utils/Events instead of using mockTracking because
// Boot's `dispatch` tracking prop overrides the one injected by
// mockTracking
jest.unmock("react-tracking")
jest.mock("Utils/Events", () => ({
  postEvent: jest.fn(),
}))
const mockPostEvent = require("Utils/Events").postEvent as jest.Mock

jest.mock("Apps/Order/Utils/trackPageView")

jest.mock("Utils/getCurrentTimeAsIsoString")
jest.mock("Utils/logger")

const NOW = "2018-12-05T13:47:16.446Z"

require("Utils/getCurrentTimeAsIsoString").__setCurrentTime(NOW)

jest.unmock("react-relay")

import { trackPageView } from "Apps/Order/Utils/trackPageView"
import { createTestEnv } from "DevTools/createTestEnv"
import { expectOne } from "DevTools/RootTestPage"
import { graphql } from "react-relay"
import {
  buyerCounterOfferFailed,
  buyerCounterOfferSuccess,
} from "../__fixtures__/MutationResults/buyerCounterOffer"
import { OrderAppTestPage } from "./Utils/OrderAppTestPage"

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
  },
  offers: { edges: Offers },
  buyer: Buyer,
  itemsTotalCents: 1000000,
}

class RespondTestPage extends OrderAppTestPage {
  get offerHistory() {
    return expectOne(this.find(OfferHistoryItemFragmentContainer))
  }

  get showOfferHistoryButton() {
    return expectOne(this.offerHistory.find(Button))
  }

  findRadioWithText(text: string) {
    return this.find(BorderedRadio).filterWhere(elem => {
      return elem.text().includes(text)
    })
  }

  async selectAcceptRadio() {
    const radio = this.findRadioWithText("Accept seller's offer")
    radio.props().onSelect({ selected: true, value: "ACCEPT" })
    await this.update()
  }

  async selectDeclineRadio() {
    const radio = this.findRadioWithText("Decline seller's offer")
    radio.props().onSelect({ selected: true, value: "DECLINE" })
    await this.update()
  }

  async selectCounterRadio() {
    const radio = this.findRadioWithText("Send counteroffer")
    radio.props().onSelect({ selected: true, value: "COUNTER" })
    await this.update()
  }
}

describe("The respond page", () => {
  const { buildPage, mutations, routes } = createTestEnv({
    Component: RespondFragmentContainer,
    defaultData: {
      order: testOrder,
    },
    defaultMutationResults: {
      ...buyerCounterOfferSuccess,
    },
    query: graphql`
      query RespondTestQuery {
        order: ecommerceOrder(id: "unused") {
          ...Respond_order
        }
      }
    `,
    TestPage: RespondTestPage,
  })

  beforeEach(() => {
    mockPostEvent.mockReset()
  })

  describe("the page layout", () => {
    let page: RespondTestPage
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

    it("shows the countdown timer", () => {
      expect(page.countdownTimer.text()).toContain("01d 04h 22m 59s left")
    })

    it("shows the offer input", () => {
      expect(page.offerInput.text()).toContain("Your offer")
    })

    it("shows the stepper", () => {
      expect(page.orderStepper.text()).toMatchInlineSnapshot(`"RespondReview"`)
      expect(page.orderStepperCurrentStep).toBe("Respond")
    })

    it("shows a note if there is one", async () => {
      const pageWithNote = await buildPage({
        mockData: {
          order: {
            ...OfferOrderWithShippingDetailsAndNote,
            stateExpiresAt: moment(NOW)
              .add(1, "day")
              .add(4, "hours")
              .add(22, "minutes")
              .add(59, "seconds")
              .toISOString(),
          },
        },
      })
      expect(pageWithNote.text()).toContain("Seller's noteAnother note!")
    })

    it("does not show a note if there is none", () => {
      expect(page.text()).not.toContain("Your note")
    })

    it("shows the offer history item", () => {
      expect(page.showOfferHistoryButton.text()).toMatch("Show offer history")

      page.showOfferHistoryButton.props().onClick({})

      expect(page.offerHistory.text()).toMatch(
        "You (May 21)$1,200.00Seller (Apr 30)$1,500.00You (Apr 5)$1,100.00"
      )
    })

    it("shows the transaction summary", () => {
      expect(page.transactionSummary.text()).toMatch("Seller's offer$14,000")
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

    it("shows the continue button", () => {
      expect(page.submitButton.text()).toBe("Continue")
    })

    it("shows three radio buttons with response choices", () => {
      const radios = page.find(BorderedRadio)
      expect(radios).toHaveLength(3)

      expect(radios.first().text()).toMatch("Accept seller's offer")
      expect(radios.at(1).text()).toMatch("Send counteroffer")
      expect(radios.at(2).text()).toMatch("Decline seller's offer")
    })
  })

  describe("taking action", () => {
    let page: RespondTestPage
    beforeEach(async () => {
      page = await buildPage()
    })

    it("Accepting the seller's offer works", async () => {
      await page.selectAcceptRadio()
      await page.clickSubmit()

      expect(routes.mockPushRoute).toHaveBeenCalledWith(
        `/orders/${testOrder.id}/review/accept`
      )
    })

    it("Declining the seller's offer works", async () => {
      await page.selectDeclineRadio()
      await page.clickSubmit()

      expect(routes.mockPushRoute).toHaveBeenCalledWith(
        `/orders/${testOrder.id}/review/decline`
      )
    })

    describe("countering the seller's offer", () => {
      it("doesn't work if nothing was typed in", async () => {
        await page.selectCounterRadio()
        expect(page.offerInput.props().showError).toBe(false)
        await page.clickSubmit()
        expect(page.offerInput.props().showError).toBe(true)
        expect(mutations.mockFetch).not.toHaveBeenCalled()
      })

      it("doesn't let the user continue if the offer value is not positive", async () => {
        await page.selectCounterRadio()
        await page.setOfferAmount(0)

        expect(page.offerInput.props().showError).toBe(false)
        await page.clickSubmit()
        expect(page.offerInput.props().showError).toBe(true)
        expect(mutations.mockFetch).not.toHaveBeenCalled()
      })

      it("works when a valid number is inputted", async () => {
        await page.selectCounterRadio()
        await page.setOfferAmount(9000)

        expect(mutations.mockFetch).toHaveBeenCalledTimes(0)
        await page.clickSubmit()
        expect(mutations.mockFetch).toHaveBeenCalledTimes(1)
        expect(mutations.lastFetchVariables).toMatchObject({
          input: {
            offerId: "myoffer-id",
            offerPrice: {
              amount: 9000,
              currencyCode: "USD",
            },
          },
        })
        expect(routes.mockPushRoute).toHaveBeenCalledWith(
          "/orders/2939023/review/counter"
        )
      })
    })

    it("shows the error modal if submitting a counter offer fails at network level", async () => {
      await page.selectCounterRadio()
      await page.setOfferAmount(9000)
      mutations.mockNetworkFailureOnce()

      expect(mutations.mockFetch).toHaveBeenCalledTimes(0)
      await page.clickSubmit()
      expect(mutations.mockFetch).toHaveBeenCalledTimes(1)

      expect(routes.mockPushRoute).not.toHaveBeenCalled()
      await page.expectAndDismissDefaultErrorDialog()
    })

    it("shows the error modal if submitting a counter offer fails for business reasons", async () => {
      mutations.useResultsOnce(buyerCounterOfferFailed)
      await page.selectCounterRadio()
      await page.setOfferAmount(9000)

      expect(mutations.mockFetch).toHaveBeenCalledTimes(0)
      await page.clickSubmit()
      expect(mutations.mockFetch).toHaveBeenCalledTimes(1)

      expect(routes.mockPushRoute).not.toHaveBeenCalled()
      await page.expectAndDismissDefaultErrorDialog()
    })

    describe("The 'amount too small' speed bump", () => {
      it("shows if the offer amount is too small", async () => {
        await page.selectCounterRadio()
        await page.setOfferAmount(1000)

        await page.clickSubmit()

        await page.expectAndDismissErrorDialogMatching(
          "Offer may be too low",
          "Offers within 25% of the seller's offer are most likely to receive a response",
          "OK"
        )

        expect(mutations.mockFetch).not.toHaveBeenCalled()
        expect(routes.mockPushRoute).not.toHaveBeenCalled()

        // should work after clicking submit again
        await page.clickSubmit()

        expect(mutations.mockFetch).toHaveBeenCalledTimes(1)
        expect(routes.mockPushRoute).toHaveBeenCalledTimes(1)
      })
    })

    describe("The 'amount too high' speed bump", () => {
      it("shows if the offer amount is too high", async () => {
        await page.selectCounterRadio()
        await page.setOfferAmount(17000)

        await page.clickSubmit()

        await page.expectAndDismissErrorDialogMatching(
          "Offer higher than seller's offer",
          "You’re making an offer higher than the seller's offer",
          "OK"
        )

        expect(mutations.mockFetch).not.toHaveBeenCalled()
        expect(routes.mockPushRoute).not.toHaveBeenCalled()

        // should work after clicking submit again
        await page.clickSubmit()

        expect(mutations.mockFetch).toHaveBeenCalledTimes(1)
        expect(routes.mockPushRoute).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe("Analaytics", () => {
    let page: RespondTestPage
    beforeEach(async () => {
      page = await buildPage()
    })

    it("tracks a pageview", () => {
      expect(trackPageView).toHaveBeenCalledTimes(1)
    })

    it("tracks the offer input focus", async () => {
      await page.selectCounterRadio()

      expect(mockPostEvent).not.toHaveBeenCalled()

      page.offerInput.find("input").simulate("focus")

      expect(mockPostEvent).toHaveBeenCalledTimes(1)
      expect(mockPostEvent).toHaveBeenLastCalledWith({
        order_id: "2939023",
        action_type: "Focused on offer input",
        flow: "Make offer",
      })
    })

    it("tracks viwing the low offer speedbump", async () => {
      await page.selectCounterRadio()
      await page.setOfferAmount(1000)

      expect(mockPostEvent).not.toHaveBeenCalled()

      await page.clickSubmit()

      expect(mockPostEvent).toHaveBeenLastCalledWith({
        order_id: "2939023",
        action_type: "Viewed offer too low",
        flow: "Make offer",
      })
    })

    it("tracks viwing the high offer speedbump", async () => {
      await page.selectCounterRadio()
      await page.setOfferAmount(20000)

      expect(mockPostEvent).not.toHaveBeenCalled()

      await page.clickSubmit()

      expect(mockPostEvent).toHaveBeenLastCalledWith({
        order_id: "2939023",
        action_type: "Viewed offer higher than listed price",
        flow: "Make offer",
      })
    })
  })
})
