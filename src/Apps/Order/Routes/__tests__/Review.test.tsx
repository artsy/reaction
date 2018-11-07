import { mount } from "enzyme"
import React from "react"

import { Button } from "@artsy/palette"
import { UntouchedBuyOrder } from "Apps/__test__/Fixtures/Order"
import { ErrorModal, ModalButton } from "Components/Modal/ErrorModal"
import { commitMutation } from "react-relay"
import { StepSummaryItem } from "Styleguide/Components/StepSummaryItem"
import { Provider } from "unstated"
import {
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
}

describe("Review", () => {
  const getWrapper = props => {
    return mount(
      <Provider>
        <ReviewRoute {...props} />
      </Provider>
    )
  }

  it("enables the button and routes to the payoff page", () => {
    const component = getWrapper(defaultProps)
    ;(commitMutation as jest.Mock<any>).mockImplementationOnce(
      (_, { onCompleted }) =>
        onCompleted({ ecommerceSubmitOrder: { orderOrError: { order: {} } } })
    )
    component.find(Button).simulate("click")
    expect(commitMutation).toHaveBeenCalledTimes(1)
    expect(pushMock).toBeCalledWith("/orders/1234/status")
  })

  it("takes the user back to the /shipping view", () => {
    const component = getWrapper(defaultProps)
    component
      .find(StepSummaryItem)
      .first()
      .find("a")
      .simulate("click")
    expect(pushMock).toBeCalledWith("/orders/1234/shipping")
  })

  it("takes the user back to the /payment view", () => {
    const component = getWrapper(defaultProps)
    component
      .find(StepSummaryItem)
      .last()
      .find("a")
      .simulate("click")
    expect(pushMock).toBeCalledWith("/orders/1234/shipping")
  })

  it("shows an error modal when there is an error in submitOrderPayload", () => {
    console.error = jest.fn() // Silences component logging.

    const component = getWrapper(defaultProps)

    expect(component.find(ErrorModal).props().show).toBe(false)
    ;(commitMutation as jest.Mock<any>).mockImplementationOnce(
      (_, { onCompleted }) => onCompleted(submitOrderWithFailure)
    )

    component.find(Button).simulate("click")

    expect(component.find(ErrorModal).props().show).toBe(true)

    component.find(ModalButton).simulate("click")

    expect(component.find(ErrorModal).props().show).toBe(false)
  })

  it("shows an error modal when there is a network error", () => {
    console.error = jest.fn() // Silences component logging.

    const component = getWrapper(defaultProps)
    ;(commitMutation as jest.Mock<any>).mockImplementationOnce(
      (_, { onError }) => onError(new TypeError("Network request failed"))
    )

    component.find(Button).simulate("click")

    expect(component.find(ErrorModal).props().show).toBe(true)
  })

  it("shows a modal that redirects to the artwork page if there is an artwork_version_mismatch", () => {
    console.error = jest.fn() // Silences component logging.
    window.location.assign = jest.fn()

    const component = getWrapper(defaultProps)

    expect(component.find(ErrorModal).props().show).toBe(false)
    ;(commitMutation as jest.Mock<any>).mockImplementationOnce(
      (_, { onCompleted }) => onCompleted(submitOrderWithVersionMismatchFailure)
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
    console.error = jest.fn() // Silences component logging.
    window.location.assign = jest.fn()

    const component = getWrapper(defaultProps)

    expect(component.find(ErrorModal).props().show).toBe(false)
    ;(commitMutation as jest.Mock<any>).mockImplementationOnce(
      (_, { onCompleted }) => onCompleted(submitOrderWithNoInventoryFailure)
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
