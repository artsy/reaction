import { mount } from "enzyme"
import React from "react"
import renderer from "react-test-renderer"
import { AppState } from "Router/state"
import { Provider } from "unstated"
import { SummaryFragmentContainer as Summary } from "../Summary"

describe("Order summary", () => {
  const mediatorMock = {
    trigger: jest.fn(),
  }
  it("renders the summary properly", () => {
    const appState = new AppState({ mediator: mediatorMock })
    const summary = renderer
      .create(
        <Provider inject={[appState]}>
          <Summary order={mockOrder} />
        </Provider>
      )
      .toJSON()
    expect(summary).toMatchSnapshot()
  })

  it("handles FAQ modal", () => {
    const appState = new AppState({ mediator: mediatorMock })

    const summary = mount(
      <Provider inject={[appState]}>
        <Summary order={mockOrder} mediator={mediatorMock} />
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
        <Summary order={mockOrder} mediator={mediatorMock} />
      </Provider>
    )

    summary
      .find("a")
      .at(1)
      .simulate("click")

    expect(mediatorMock.trigger).toHaveBeenCalledWith(
      "openOrdersContactArtsyModal",
      { artworkId: "lisa-breslow-cactus" }
    )
  })

  const mockOrder = {
    lineItems: {
      edges: [
        {
          node: {
            artwork: {
              id: "lisa-breslow-cactus",
            },
          },
        },
      ],
    },
  }
})
