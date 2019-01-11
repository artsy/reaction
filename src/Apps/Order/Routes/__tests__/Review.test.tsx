import { mount } from "enzyme"
import React from "react"

import { Button } from "@artsy/palette"
import {
  BuyOrderWithShippingDetails,
  OfferOrderWithShippingDetails,
} from "Apps/__tests__/Fixtures/Order"
import { CreditCardSummaryItemFragmentContainer } from "Apps/Order/Components/CreditCardSummaryItem"
import { ShippingSummaryItemFragmentContainer } from "Apps/Order/Components/ShippingSummaryItem"
import { trackPageView } from "Apps/Order/Utils/trackPageView"
import { ErrorModal } from "Components/Modal/ErrorModal"
import { ModalButton } from "Components/Modal/ModalDialog"
import { MockBoot } from "DevTools"
import { commitMutation } from "react-relay"
import {
  ActiveTabContainer,
  CheckMarkWrapper,
  Stepper,
} from "Styleguide/Components"
import { StepSummaryItem } from "Styleguide/Components/StepSummaryItem"
import {
  submitOfferOrderWithFailure,
  submitOfferOrderWithNoInventoryFailure,
  submitOfferOrderWithVersionMismatchFailure,
  submitOrderWithFailure,
  submitOrderWithNoInventoryFailure,
  submitOrderWithVersionMismatchFailure,
} from "../__fixtures__/MutationResults"
import { ReviewFragmentContainer as ReviewRoute } from "../Review"

jest.mock("Apps/Order/Utils/trackPageView")
jest.mock("react-relay", () => ({
  commitMutation: jest.fn(),
  createFragmentContainer: component => component,
}))

const pushMock = jest.fn()
const defaultProps = {
  order: { ...BuyOrderWithShippingDetails, id: "1234" },
  router: {
    push: pushMock,
  },
  route: {
    onTransition: jest.fn(),
  },
  relay: {
    environment: {},
  },
  mediator: { trigger: jest.fn() },
}

const mutationMock = commitMutation as jest.Mock<any>

describe("Review", () => {
  const getWrapper = props => {
    return mount(
      <MockBoot breakpoint="xs">
        <ReviewRoute {...props} />
      </MockBoot>
    )
  }

  beforeEach(() => {
    mutationMock.mockReset()
    pushMock.mockReset()
  })

  describe("buy-mode orders", () => {
    it("enables the button and routes to the payoff page", () => {
      const component = getWrapper(defaultProps)
      mutationMock.mockImplementationOnce((_, { onCompleted }) =>
        onCompleted({ ecommerceSubmitOrder: { orderOrError: { order: {} } } })
      )
      component.find(Button).simulate("click")
      expect(mutationMock).toHaveBeenCalledTimes(1)
      expect(pushMock).toBeCalledWith("/orders/1234/status")
    })

    it("takes the user back to the /shipping view", () => {
      const component = getWrapper(defaultProps)
      component
        .find(ShippingSummaryItemFragmentContainer)
        .find("a")
        .simulate("click")
      expect(pushMock).toBeCalledWith("/orders/1234/shipping")
    })

    it("takes the user back to the /payment view", () => {
      const component = getWrapper(defaultProps)
      component
        .find(CreditCardSummaryItemFragmentContainer)
        .find("a")
        .simulate("click")
      expect(pushMock).toBeCalledWith("/orders/1234/payment")
    })

    it("shows an error modal when there is an error in submitOrderPayload", () => {
      const component = getWrapper(defaultProps)

      expect(component.find(ErrorModal).props().show).toBe(false)
      mutationMock.mockImplementationOnce((_, { onCompleted }) =>
        onCompleted(submitOrderWithFailure)
      )

      component.find(Button).simulate("click")

      expect(component.find(ErrorModal).props().show).toBe(true)

      component.find(ModalButton).simulate("click")

      expect(component.find(ErrorModal).props().show).toBe(false)
    })

    it("shows an error modal when there is a network error", () => {
      const component = getWrapper(defaultProps)
      mutationMock.mockImplementationOnce((_, { onError }) =>
        onError(new TypeError("Network request failed"))
      )

      component.find(Button).simulate("click")

      expect(component.find(ErrorModal).props().show).toBe(true)
    })

    it("shows a modal that redirects to the artwork page if there is an artwork_version_mismatch", () => {
      window.location.assign = jest.fn()

      const component = getWrapper(defaultProps)

      expect(component.find(ErrorModal).props().show).toBe(false)
      mutationMock.mockImplementationOnce((_, { onCompleted }) =>
        onCompleted(submitOrderWithVersionMismatchFailure)
      )

      component.find(Button).simulate("click")

      const errorComponent = component.find(ErrorModal)
      expect(errorComponent.props().show).toBe(true)
      expect(errorComponent.text()).toContain(
        "Something about the work changed since you started checkout. Please review the work before submitting your order."
      )

      component.find(ModalButton).simulate("click")

      expect(window.location.assign).toBeCalledWith("/artwork/artworkId")
    })

    it("shows a modal that redirects to the artist page if there is an insufficient inventory", () => {
      window.location.assign = jest.fn()

      const component = getWrapper(defaultProps)

      expect(component.find(ErrorModal).props().show).toBe(false)
      mutationMock.mockImplementationOnce((_, { onCompleted }) =>
        onCompleted(submitOrderWithNoInventoryFailure)
      )

      component.find(Button).simulate("click")

      const errorComponent = component.find(ErrorModal)
      expect(errorComponent.props().show).toBe(true)
      expect(errorComponent.text()).toContain(
        "Sorry, the work is no longer available."
      )

      component.find(ModalButton).simulate("click")
      expect(window.location.assign).toBeCalledWith("/artist/artistId")
    })
  })

  describe("Offer-mode orders", () => {
    const offerOrderProps = {
      ...defaultProps,
      order: {
        ...OfferOrderWithShippingDetails,
        id: "offer-order-id",
      },
    }

    it("shows an active offer stepper if the order is an Offer Order", () => {
      const component = getWrapper(offerOrderProps)
      expect(component.find(ActiveTabContainer).text()).toEqual("Review")
      expect(component.find(Stepper).props().currentStepIndex).toEqual(3)
      expect(component.find(CheckMarkWrapper).length).toEqual(3)
    })

    it("shows an offer section in the shipping and payment review", () => {
      const component = getWrapper(offerOrderProps)

      expect(component.find(StepSummaryItem).length).toEqual(4)

      expect(
        component
          .find(StepSummaryItem)
          .first()
          .text()
      ).toMatch("Your offer")

      pushMock.mockReset()

      component
        .find(StepSummaryItem)
        .first()
        .find("a")
        .simulate("click")

      expect(pushMock).toBeCalledWith("/orders/offer-order-id/offer")
    })

    it("enables the button and routes to the payoff page", () => {
      const component = getWrapper(offerOrderProps)
      mutationMock.mockImplementationOnce((_, { onCompleted }) =>
        onCompleted({
          ecommerceSubmitOrderWithOffer: { orderOrError: { order: {} } },
        })
      )
      component.find(Button).simulate("click")
      expect(mutationMock).toHaveBeenCalledTimes(1)
      expect(pushMock).toBeCalledWith("/orders/offer-order-id/status")
    })

    it("shows an error modal when there is an error in submitOrderPayload", () => {
      const component = getWrapper(offerOrderProps)

      expect(component.find(ErrorModal).props().show).toBe(false)
      mutationMock.mockImplementationOnce((_, { onCompleted }) =>
        onCompleted(submitOfferOrderWithFailure)
      )

      component.find(Button).simulate("click")

      expect(component.find(ErrorModal).props().show).toBe(true)

      component.find(ModalButton).simulate("click")

      expect(component.find(ErrorModal).props().show).toBe(false)
    })

    it("shows an error modal when there is a network error", () => {
      const component = getWrapper(offerOrderProps)
      mutationMock.mockImplementationOnce((_, { onError }) =>
        onError(new TypeError("Network request failed"))
      )

      component.find(Button).simulate("click")

      expect(component.find(ErrorModal).props().show).toBe(true)
    })

    it("shows a modal that redirects to the artwork page if there is an artwork_version_mismatch", () => {
      window.location.assign = jest.fn()

      const component = getWrapper(offerOrderProps)

      expect(component.find(ErrorModal).props().show).toBe(false)
      mutationMock.mockImplementationOnce((_, { onCompleted }) =>
        onCompleted(submitOfferOrderWithVersionMismatchFailure)
      )

      component.find(Button).simulate("click")

      const errorComponent = component.find(ErrorModal)
      expect(errorComponent.props().show).toBe(true)
      expect(errorComponent.text()).toContain(
        "Something about the work changed since you started checkout. Please review the work before submitting your order."
      )

      component.find(ModalButton).simulate("click")

      expect(window.location.assign).toBeCalledWith("/artwork/artworkId")
    })

    it("shows a modal that redirects to the artist page if there is an insufficient inventory", () => {
      window.location.assign = jest.fn()

      const component = getWrapper(offerOrderProps)

      expect(component.find(ErrorModal).props().show).toBe(false)
      mutationMock.mockImplementationOnce((_, { onCompleted }) =>
        onCompleted(submitOfferOrderWithNoInventoryFailure)
      )

      component.find(Button).simulate("click")

      const errorComponent = component.find(ErrorModal)
      expect(errorComponent.props().show).toBe(true)
      expect(errorComponent.text()).toContain(
        "Sorry, the work is no longer available."
      )

      component.find(ModalButton).simulate("click")
      expect(window.location.assign).toBeCalledWith("/artist/artistId")
    })
  })

  it("tracks a pageview", () => {
    getWrapper(defaultProps)

    expect(trackPageView).toHaveBeenCalledTimes(1)
  })
})
