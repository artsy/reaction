import { mount } from "enzyme"
import React from "react"

import { Button } from "@artsy/palette"
import { UntouchedOrder } from "Apps/__test__/Fixtures/Order"
import { TermsOfServiceCheckbox } from "Apps/Order/Components/TermsOfServiceCheckbox"
import { commitMutation } from "react-relay"
import { Provider } from "unstated"
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
})
