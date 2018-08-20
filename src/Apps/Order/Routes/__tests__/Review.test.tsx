import { mount } from "enzyme"
import React from "react"

import { IncompleteOrder } from "Apps/__test__/Fixtures/Order"
import { TermsOfServiceCheckbox } from "Apps/Order/Components/TermsOfServiceCheckbox"
import { Button } from "Styleguide/Elements/Button"
import { Provider } from "unstated"
import { ReviewRoute } from "../Review"

jest.mock("react-relay", () => ({
  createFragmentContainer: component => component,
}))

const pushMock = jest.fn()
const defaultProps = {
  order: { ...IncompleteOrder, id: "1234" },
  router: {
    push: pushMock,
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
    component.find(Button).simulate("click")
    expect(pushMock).toBeCalledWith("/order2/1234/submission")
  })
})
