import { mount } from "enzyme"
import React from "react"
import renderer from "react-test-renderer"
import { Provider } from "unstated"
import { AppState } from "../../../../Router/state"
import { Helper } from "../Helper"

describe("Order summary", () => {
  const mediatorMock = {
    trigger: jest.fn(),
  }
  it("renders the helper properly", () => {
    const appState = new AppState({ mediator: mediatorMock })
    const summary = renderer
      .create(
        <Provider inject={[appState]}>
          <Helper artworkId="whatever" />
        </Provider>
      )
      .toJSON()
    expect(summary).toMatchSnapshot()
  })

  it("handles FAQ modal", () => {
    const appState = new AppState({ mediator: mediatorMock })

    const summary = mount(
      <Provider inject={[appState]}>
        <Helper artworkId="whatever" />
      </Provider>
    )

    summary
      .find("a")
      .at(0)
      .simulate("click")

    expect(mediatorMock.trigger).toHaveBeenCalledWith("openOrdersBuyerFAQModal")
  })

  it("handles contact specialist modal", () => {
    const appState = new AppState({ mediator: mediatorMock })

    const summary = mount(
      <Provider inject={[appState]}>
        <Helper artworkId="whatever" />
      </Provider>
    )

    summary
      .find("a")
      .at(1)
      .simulate("click")

    expect(mediatorMock.trigger).toHaveBeenCalledWith(
      "openOrdersContactArtsyModal",
      { artworkId: "whatever" }
    )
  })
})
