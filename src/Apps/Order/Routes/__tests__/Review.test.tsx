import { mount } from "enzyme"
import React from "react"

import { Button } from "@artsy/palette"
import { UntouchedOrder } from "Apps/__test__/Fixtures/Order"
import { TermsOfServiceCheckbox } from "Apps/Order/Components/TermsOfServiceCheckbox"
import { commitMutation, RelayProp } from "react-relay"
import { Provider } from "unstated"
import {
  ErrorModal,
  ModalButton,
} from "../../../../Components/Modal/ErrorModal"
import { OrderWithShippingDetails } from "../../../__test__/Fixtures/Order"
import {
  creatingCreditCardSuccess,
  settingOrderPaymentFailed,
} from "../__fixtures__/MutationResults"
import { ContinueButton } from "../Payment"
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

  it("disables the button while the terms are unchecked", () => {
    const component = getWrapper(defaultProps)
    expect(component.find(Button).props().disabled).toBe(true)
    expect(pushMock).not.toBeCalled
  })

  it("enables the button while the terms are checked and routes to the payoff page", () => {
    const component = getWrapper(defaultProps)
    expect(component.find(Button).props().disabled).toBe(true)
    component
      .find(TermsOfServiceCheckbox)
      .props()
      .onSelect()
    ;(commitMutation as jest.Mock<any>).mockImplementationOnce(
      (_, { onCompleted }) =>
        onCompleted({ submitOrder: { orderOrError: { order: {} } } })
    )
    component.find(Button).simulate("click")
    expect(commitMutation).toHaveBeenCalledTimes(1)
    expect(pushMock).toBeCalledWith("/order2/1234/status")
  })

  it("shows an error modal when there is an error in submitOrderPayload", () => {
    console.error = jest.fn() // Silences component logging.

    const component = getWrapper(defaultProps)

    expect(component.find(ErrorModal).props().show).toBe(false)
    ;(commitMutation as jest.Mock<any>).mockImplementationOnce(
      (_, { onCompleted }) =>
        onCompleted({
          submitOrder: {
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
