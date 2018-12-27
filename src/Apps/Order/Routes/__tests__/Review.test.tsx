import { mount } from "enzyme"
import React from "react"

import { Button } from "@artsy/palette"
import {
  OfferOrderWithShippingDetails,
  UntouchedBuyOrder,
} from "Apps/__tests__/Fixtures/Order"
import { CreditCardSummaryItemFragmentContainer } from "Apps/Order/Components/CreditCardSummaryItem"
import { ShippingSummaryItemFragmentContainer } from "Apps/Order/Components/ShippingSummaryItem"
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
import { ReviewRoute } from "../Review"

jest.mock("react-relay", () => ({
  commitMutation: jest.fn(),
  createFragmentContainer: component => component,
}))

const pushMock = jest.fn()
const mockShowErrorModal = jest.fn()
const defaultProps = {
  order: { ...UntouchedBuyOrder, id: "1234" },
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
  showErrorModal: mockShowErrorModal,
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
    mockShowErrorModal.mockReset()
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

      mutationMock.mockImplementationOnce((_, { onCompleted }) =>
        onCompleted(submitOrderWithFailure)
      )

      expect(mockShowErrorModal).not.toHaveBeenCalled()

      component.find(Button).simulate("click")

      expect(mockShowErrorModal).toHaveBeenCalledWith({
        title: undefined,
        message: undefined,
        ctaAction: undefined,
      })
    })

    it("shows an error modal when there is a network error", () => {
      const component = getWrapper(defaultProps)
      mutationMock.mockImplementationOnce((_, { onError }) =>
        onError(new TypeError("Network request failed"))
      )

      expect(mockShowErrorModal).not.toHaveBeenCalled()

      component.find(Button).simulate("click")

      expect(mockShowErrorModal).toHaveBeenCalledWith({
        title: undefined,
        message: undefined,
        ctaAction: undefined,
      })
    })

    it("shows a modal that redirects to the artwork page if there is an artwork_version_mismatch", () => {
      window.location.assign = jest.fn()

      const component = getWrapper(defaultProps)

      mutationMock.mockImplementationOnce((_, { onCompleted }) =>
        onCompleted(submitOrderWithVersionMismatchFailure)
      )

      expect(mockShowErrorModal).not.toHaveBeenCalled()

      component.find(Button).simulate("click")

      expect(mockShowErrorModal).toHaveBeenCalledTimes(1)
      expect(mockShowErrorModal.mock.calls[0][0]).toMatchObject({
        message:
          "Something about the work changed since you started checkout. Please review the work before submitting your order.",
        title: "Work has been updated",
      })

      expect(window.location.assign).not.toBeCalledWith("/artwork/artworkId")

      mockShowErrorModal.mock.calls[0][0].ctaAction()

      expect(window.location.assign).toBeCalledWith("/artwork/artworkId")
    })

    it("shows a modal that redirects to the artist page if there is an insufficient inventory", () => {
      window.location.assign = jest.fn()

      const component = getWrapper(defaultProps)

      mutationMock.mockImplementationOnce((_, { onCompleted }) =>
        onCompleted(submitOrderWithNoInventoryFailure)
      )

      expect(mockShowErrorModal).not.toHaveBeenCalled()

      component.find(Button).simulate("click")

      expect(mockShowErrorModal).toHaveBeenCalledTimes(1)
      expect(mockShowErrorModal.mock.calls[0][0]).toMatchObject({
        message: "Sorry, the work is no longer available.",
        title: "Not available",
      })

      expect(window.location.assign).not.toBeCalledWith("/artist/artistId")

      mockShowErrorModal.mock.calls[0][0].ctaAction()

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

      mutationMock.mockImplementationOnce((_, { onCompleted }) =>
        onCompleted(submitOfferOrderWithFailure)
      )

      expect(mockShowErrorModal).not.toHaveBeenCalled()

      component.find(Button).simulate("click")

      expect(mockShowErrorModal).toHaveBeenCalledTimes(1)
      expect(mockShowErrorModal).toHaveBeenCalledWith({
        ctaAction: undefined,
        message: undefined,
        title: undefined,
      })
    })

    it("shows an error modal when there is a network error", () => {
      const component = getWrapper(offerOrderProps)
      mutationMock.mockImplementationOnce((_, { onError }) =>
        onError(new TypeError("Network request failed"))
      )

      expect(mockShowErrorModal).not.toHaveBeenCalled()

      component.find(Button).simulate("click")

      expect(mockShowErrorModal).toHaveBeenCalledTimes(1)
      expect(mockShowErrorModal).toHaveBeenCalledWith({
        ctaAction: undefined,
        message: undefined,
        title: undefined,
      })
    })

    it("shows a modal that redirects to the artwork page if there is an artwork_version_mismatch", () => {
      window.location.assign = jest.fn()

      const component = getWrapper(offerOrderProps)

      mutationMock.mockImplementationOnce((_, { onCompleted }) =>
        onCompleted(submitOfferOrderWithVersionMismatchFailure)
      )

      expect(mockShowErrorModal).not.toHaveBeenCalled()

      component.find(Button).simulate("click")

      expect(mockShowErrorModal).toHaveBeenCalledTimes(1)
      expect(mockShowErrorModal.mock.calls[0][0]).toMatchObject({
        message:
          "Something about the work changed since you started checkout. Please review the work before submitting your order.",
        title: "Work has been updated",
      })

      expect(window.location.assign).not.toBeCalledWith("/artwork/artworkId")

      mockShowErrorModal.mock.calls[0][0].ctaAction()

      expect(window.location.assign).toBeCalledWith("/artwork/artworkId")
    })

    it("shows a modal that redirects to the artist page if there is an insufficient inventory", () => {
      window.location.assign = jest.fn()

      const component = getWrapper(offerOrderProps)

      mutationMock.mockImplementationOnce((_, { onCompleted }) =>
        onCompleted(submitOfferOrderWithNoInventoryFailure)
      )

      expect(mockShowErrorModal).not.toHaveBeenCalled()

      component.find(Button).simulate("click")

      expect(mockShowErrorModal).toHaveBeenCalledTimes(1)
      expect(mockShowErrorModal.mock.calls[0][0]).toMatchObject({
        message: "Sorry, the work is no longer available.",
        title: "Not available",
      })

      expect(window.location.assign).not.toBeCalledWith("/artist/artistId")

      mockShowErrorModal.mock.calls[0][0].ctaAction()

      expect(window.location.assign).toBeCalledWith("/artist/artistId")
    })
  })
})
