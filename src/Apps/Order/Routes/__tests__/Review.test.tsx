import {
  BuyOrderWithShippingDetails,
  OfferOrderWithShippingDetails,
} from "Apps/__tests__/Fixtures/Order"
import { OfferSummaryItemFragmentContainer } from "Apps/Order/Components/OfferSummaryItem"
import { trackPageView } from "Apps/Order/Utils/trackPageView"
import { graphql } from "react-relay"
import {
  submitOfferOrderSuccess,
  submitOfferOrderWithFailure,
  submitOfferOrderWithNoInventoryFailure,
  submitOfferOrderWithVersionMismatchFailure,
  submitOrderSuccess,
  submitOrderWithFailure,
  submitOrderWithNoInventoryFailure,
  submitOrderWithVersionMismatchFailure,
} from "../__fixtures__/MutationResults"
import { ReviewFragmentContainer } from "../Review"
import { expectOne, TestPage } from "./Utils/OrderAppTestPage"

jest.mock("Apps/Order/Utils/trackPageView")
jest.unmock("react-relay")

const testOrder = { ...BuyOrderWithShippingDetails, id: "1234" }

const resolveSubmitOrderMutation = jest.fn(
  () => submitOrderSuccess.ecommerceSubmitOrder
)
const resolveSubmitOfferMutation = jest.fn(
  () => submitOfferOrderSuccess.ecommerceSubmitOrderWithOffer
)

class ReviewTestPage extends TestPage({
  Component: ReviewFragmentContainer,
  defaultData: {
    order: testOrder,
  },
  defaultMutationResults: {
    ecommerceSubmitOrder: resolveSubmitOrderMutation,
    ecommerceSubmitOrderWithOffer: resolveSubmitOfferMutation,
  },
  query: graphql`
    query ReviewTestQuery {
      order: ecommerceOrder(id: "unused") {
        ...Review_order
      }
    }
  `,
}) {
  get offerSummary() {
    return expectOne(this.root.find(OfferSummaryItemFragmentContainer))
  }
}

describe("Review", () => {
  const page = new ReviewTestPage()

  describe("buy-mode orders", () => {
    beforeEach(async () => {
      await page.init()
    })

    it("enables the button and routes to the payoff page", async () => {
      await page.clickSubmit()
      expect(page.mockFetchMutation).toHaveBeenCalledTimes(1)
      expect(page.mockPushRoute).toBeCalledWith("/orders/1234/status")
    })

    it("takes the user back to the /shipping view", () => {
      page.shippingSummary.find("a").simulate("click")
      expect(page.mockPushRoute).toBeCalledWith("/orders/1234/shipping")
    })

    it("takes the user back to the /payment view", () => {
      page.paymentSummary.find("a").simulate("click")
      expect(page.mockPushRoute).toBeCalledWith("/orders/1234/payment")
    })

    it("shows an error modal when there is an error in submitOrderPayload", async () => {
      resolveSubmitOrderMutation.mockReturnValueOnce(
        submitOrderWithFailure.ecommerceSubmitOrder
      )
      await page.clickSubmit()
      await page.expectDefaultErrorDialog()
    })

    it("shows an error modal when there is a network error", async () => {
      page.mockMutationNetworkFailureOnce()
      await page.clickSubmit()
      await page.expectDefaultErrorDialog()
    })

    it("shows a modal that redirects to the artwork page if there is an artwork_version_mismatch", async () => {
      window.location.assign = jest.fn()

      resolveSubmitOrderMutation.mockReturnValueOnce(
        submitOrderWithVersionMismatchFailure.ecommerceSubmitOrder
      )
      await page.clickSubmit()
      await page.expectErrorDialogMatching(
        "Work has been updated",
        "Something about the work changed since you started checkout. Please review the work before submitting your order."
      )
      expect(window.location.assign).toBeCalledWith("/artwork/artworkId")
    })

    it("shows a modal that redirects to the artist page if there is an insufficient inventory", async () => {
      window.location.assign = jest.fn()

      resolveSubmitOrderMutation.mockReturnValueOnce(
        submitOrderWithNoInventoryFailure.ecommerceSubmitOrder
      )
      await page.clickSubmit()
      await page.expectErrorDialogMatching(
        "Not available",
        "Sorry, the work is no longer available."
      )
      expect(window.location.assign).toBeCalledWith("/artist/artistId")
    })
  })

  describe("Offer-mode orders", () => {
    beforeEach(async () => {
      await page.init({
        mockData: {
          order: {
            ...OfferOrderWithShippingDetails,
            id: "offer-order-id",
          },
        },
      })
    })

    it("shows an active offer stepper if the order is an Offer Order", () => {
      expect(page.orderStepper.text()).toMatchInlineSnapshot(
        `"Offer Shipping Payment Review"`
      )
      expect(page.orderStepperCurrentStep).toBe("Review")
    })

    it("shows an offer section in the shipping and payment review", () => {
      expect(page.offerSummary.text()).toMatch("Your offer")
      page.offerSummary.find("a").simulate("click")
      expect(page.mockPushRoute).toBeCalledWith("/orders/offer-order-id/offer")
    })

    it("enables the button and routes to the payoff page", async () => {
      await page.clickSubmit()
      expect(page.mockFetchMutation).toHaveBeenCalledTimes(1)
      expect(page.mockPushRoute).toBeCalledWith("/orders/offer-order-id/status")
    })

    it("shows an error modal when there is an error in submitOrderPayload", async () => {
      resolveSubmitOfferMutation.mockReturnValueOnce(
        submitOfferOrderWithFailure.ecommerceSubmitOrderWithOffer
      )
      await page.clickSubmit()
      await page.expectDefaultErrorDialog()
    })

    it("shows an error modal when there is a network error", async () => {
      page.mockMutationNetworkFailureOnce()
      await page.clickSubmit()
      await page.expectDefaultErrorDialog()
    })

    it("shows a modal that redirects to the artwork page if there is an artwork_version_mismatch", async () => {
      window.location.assign = jest.fn()

      resolveSubmitOfferMutation.mockReturnValueOnce(
        submitOfferOrderWithVersionMismatchFailure.ecommerceSubmitOrderWithOffer
      )

      await page.clickSubmit()

      await page.expectErrorDialogMatching(
        "Work has been updated",
        "Something about the work changed since you started checkout. Please review the work before submitting your order."
      )
      expect(window.location.assign).toBeCalledWith("/artwork/artworkId")
    })

    it("shows a modal that redirects to the artist page if there is an insufficient inventory", async () => {
      window.location.assign = jest.fn()
      resolveSubmitOfferMutation.mockReturnValueOnce(
        submitOfferOrderWithNoInventoryFailure.ecommerceSubmitOrderWithOffer
      )
      await page.clickSubmit()
      await page.expectErrorDialogMatching(
        "Not available",
        "Sorry, the work is no longer available."
      )
      expect(window.location.assign).toBeCalledWith("/artist/artistId")
    })
  })

  it("tracks a pageview", async () => {
    await page.init()
    expect(trackPageView).toHaveBeenCalledTimes(1)
  })
})
