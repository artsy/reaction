import {
  BuyOrderWithShippingDetails,
  OfferOrderWithShippingDetails,
  OfferOrderWithShippingDetailsAndNote,
} from "Apps/__tests__/Fixtures/Order"
import { OfferSummaryItemFragmentContainer } from "Apps/Order/Components/OfferSummaryItem"
import { trackPageView } from "Apps/Order/Utils/trackPageView"
import { createTestEnv } from "DevTools/createTestEnv"
import { expectOne } from "DevTools/RootTestPage"
import { graphql } from "react-relay"
import {
  submitOfferOrderSuccess,
  submitOfferOrderWithFailure,
  submitOfferOrderWithNoInventoryFailure,
  submitOfferOrderWithVersionMismatchFailure,
  submitOrderSuccess,
  submitOrderWithFailure,
  submitOrderWithMissingInfo,
  submitOrderWithNoInventoryFailure,
  submitOrderWithVersionMismatchFailure,
} from "../__fixtures__/MutationResults"
import { ReviewFragmentContainer } from "../Review"
import { OrderAppTestPage } from "./Utils/OrderAppTestPage"

jest.mock("Apps/Order/Utils/trackPageView")
jest.unmock("react-relay")

const testOrder = { ...BuyOrderWithShippingDetails, id: "1234" }

class ReviewTestPage extends OrderAppTestPage {
  get offerSummary() {
    return expectOne(this.root.find(OfferSummaryItemFragmentContainer))
  }
}

describe("Review", () => {
  const { buildPage, mutations, routes } = createTestEnv({
    Component: ReviewFragmentContainer,
    defaultData: {
      order: testOrder,
    },
    defaultMutationResults: {
      ...submitOrderSuccess,
      ...submitOfferOrderSuccess,
    },
    query: graphql`
      query ReviewTestQuery {
        order: ecommerceOrder(id: "unused") {
          ...Review_order
        }
      }
    `,
    TestPage: ReviewTestPage,
  })

  describe("buy-mode orders", () => {
    let page: ReviewTestPage
    beforeEach(async () => {
      page = await buildPage()
    })

    it("enables the button and routes to the payoff page", async () => {
      await page.clickSubmit()
      expect(mutations.mockFetch).toHaveBeenCalledTimes(1)
      expect(routes.mockPushRoute).toBeCalledWith("/orders/1234/status")
    })

    it("takes the user back to the /shipping view", () => {
      page.shippingSummary.find("a").simulate("click")
      expect(routes.mockPushRoute).toBeCalledWith("/orders/1234/shipping")
    })

    it("takes the user back to the /payment view", () => {
      page.paymentSummary.find("a").simulate("click")
      expect(routes.mockPushRoute).toBeCalledWith("/orders/1234/payment")
    })

    it("shows an error modal when there is an error in submitOrderPayload", async () => {
      mutations.useResultsOnce(submitOrderWithFailure)
      await page.clickSubmit()
      await page.expectAndDismissDefaultErrorDialog()
    })

    it("shows an error modal when there is a network error", async () => {
      mutations.mockNetworkFailureOnce()
      await page.clickSubmit()
      await page.expectAndDismissDefaultErrorDialog()
    })

    it("shows a modal that redirects to the artwork page if there is an artwork_version_mismatch", async () => {
      window.location.assign = jest.fn()

      mutations.useResultsOnce(submitOrderWithVersionMismatchFailure)
      await page.clickSubmit()
      await page.expectAndDismissErrorDialogMatching(
        "Work has been updated",
        "Something about the work changed since you started checkout. Please review the work before submitting your order."
      )
      expect(window.location.assign).toBeCalledWith("/artwork/artworkId")
    })

    it("shows a modal with a helpful error message if a user has not entered shipping and payment information", async () => {
      window.location.assign = jest.fn()

      mutations.useResultsOnce(submitOrderWithMissingInfo)

      await page.clickSubmit()
      await page.expectAndDismissErrorDialogMatching(
        "Missing information",
        "Please review and update your shipping and/or payment details and try again."
      )
    })

    it("shows a modal that redirects to the artist page if there is an insufficient inventory", async () => {
      window.location.assign = jest.fn()

      mutations.useResultsOnce(submitOrderWithNoInventoryFailure)
      await page.clickSubmit()
      await page.expectAndDismissErrorDialogMatching(
        "Not available",
        "Sorry, the work is no longer available."
      )
      expect(window.location.assign).toBeCalledWith("/artist/artistId")
    })
  })

  describe("Offer-mode orders", () => {
    let page: ReviewTestPage
    beforeEach(async () => {
      page = await buildPage({
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
      expect(routes.mockPushRoute).toBeCalledWith(
        "/orders/offer-order-id/offer"
      )
    })

    it("does not show the offer note section if the offer has no note", () => {
      expect(page.offerSummary.text()).not.toMatch("Your note")
    })

    it("shows an offer note if one exists", async () => {
      page = await buildPage({
        mockData: {
          order: {
            ...OfferOrderWithShippingDetailsAndNote,
          },
        },
      })
      expect(page.offerSummary.text()).toMatch("Your noteThis is a note!")
    })

    it("enables the button and routes to the payoff page", async () => {
      await page.clickSubmit()
      expect(mutations.mockFetch).toHaveBeenCalledTimes(1)
      expect(routes.mockPushRoute).toBeCalledWith(
        "/orders/offer-order-id/status"
      )
    })

    it("shows an error modal when there is an error in submitOrderPayload", async () => {
      mutations.useResultsOnce(submitOfferOrderWithFailure)
      await page.clickSubmit()
      await page.expectAndDismissDefaultErrorDialog()
    })

    it("shows an error modal when there is a network error", async () => {
      mutations.mockNetworkFailureOnce()
      await page.clickSubmit()
      await page.expectAndDismissDefaultErrorDialog()
    })

    it("shows a modal that redirects to the artwork page if there is an artwork_version_mismatch", async () => {
      window.location.assign = jest.fn()

      mutations.useResultsOnce(submitOfferOrderWithVersionMismatchFailure)

      await page.clickSubmit()

      await page.expectAndDismissErrorDialogMatching(
        "Work has been updated",
        "Something about the work changed since you started checkout. Please review the work before submitting your order."
      )
      expect(window.location.assign).toBeCalledWith("/artwork/artworkId")
    })

    it("shows a modal that redirects to the artist page if there is an insufficient inventory", async () => {
      window.location.assign = jest.fn()
      mutations.useResultsOnce(submitOfferOrderWithNoInventoryFailure)
      await page.clickSubmit()
      await page.expectAndDismissErrorDialogMatching(
        "Not available",
        "Sorry, the work is no longer available."
      )
      expect(window.location.assign).toBeCalledWith("/artist/artistId")
    })
  })

  it("tracks a pageview", async () => {
    await buildPage()
    expect(trackPageView).toHaveBeenCalledTimes(1)
  })
})
