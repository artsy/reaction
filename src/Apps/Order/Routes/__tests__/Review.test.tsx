import { mount } from "enzyme"
import React from "react"

import { Button } from "@artsy/palette"
import { UntouchedOrder } from "Apps/__test__/Fixtures/Order"
import { commitMutation } from "react-relay"
import { StepSummaryItem } from "Styleguide/Components/StepSummaryItem"
import { Provider } from "unstated"
import {
  ErrorModal,
  ModalButton,
} from "../../../../Components/Modal/ErrorModal"
import {
  creatingCreditCardSuccess,
  settingOrderPaymentFailed,
} from "../__fixtures__/MutationResults"
import { ReviewRoute } from "../Review"

jest.mock("react-relay", () => ({
  commitMutation: jest.fn(),
  createFragmentContainer: component => component,
}))

const pushMock = jest.fn()
const defaultProps = {
  order: { ...UntouchedOrder, id: "1234" },
  router: {
    push: pushMock,
  },
  relay: {
    environment: {},
  },
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
    expect(pushMock).toBeCalledWith("/order2/1234/status")
  })

  it("takes the user back to the /shipping view", () => {
    const component = getWrapper(defaultProps)
    component
      .find(StepSummaryItem)
      .first()
      .find("a")
      .simulate("click")
    expect(pushMock).toBeCalledWith("/order2/1234/shipping")
  })

  it("takes the user back to the /payment view", () => {
    const component = getWrapper(defaultProps)
    component
      .find(StepSummaryItem)
      .last()
      .find("a")
      .simulate("click")
    expect(pushMock).toBeCalledWith("/order2/1234/shipping")
  })

  it("shows an error modal when there is an error in submitOrderPayload", () => {
    console.error = jest.fn() // Silences component logging.

    const component = getWrapper(defaultProps)

    expect(component.find(ErrorModal).props().show).toBe(false)
    ;(commitMutation as jest.Mock<any>).mockImplementationOnce(
      (_, { onCompleted }) =>
        onCompleted({
          ecommerceSubmitOrder: {
            orderOrError: {
              __typename: "OrderWithMutationFailure",
              error: {
                type: "validation",
                code: "credit_card_not_found",
                data: '{"credit_card_id":"5b9987f72957190026d0ff54"}',
              },
            },
          },
        })
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
})
