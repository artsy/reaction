import { ContextProvider } from "Artsy"
import { mount } from "enzyme"
import React from "react"
import renderer from "react-test-renderer"
import { Provider } from "unstated"
import { Helper } from "../Helper"

describe("Order summary", () => {
  const mediatorMock = {
    trigger: jest.fn(),
  }

  // FIXME: Reenable when React 16.4.5 is release
  // https://github.com/facebook/react/issues/13150#issuecomment-411134477

  // describe("snapshots", () => {
  //   it("renders the helper properly", () => {
  //     const summary = renderer
  //       .create(
  //         <ContextProvider>
  //           <Helper artworkId="whatever" />
  //         </ContextProvider>
  //       )
  //       .toJSON()
  //     expect(summary).toMatchSnapshot()
  //   })
  // })

  it("handles FAQ modal", () => {
    const summary = mount(
      <ContextProvider mediator={mediatorMock}>
        <Helper artworkId="whatever" />
      </ContextProvider>
    )

    summary
      .find("a")
      .at(0)
      .simulate("click")

    expect(mediatorMock.trigger).toHaveBeenCalledWith("openOrdersBuyerFAQModal")
  })

  it("handles contact specialist modal", () => {
    const summary = mount(
      <ContextProvider mediator={mediatorMock}>
        <Helper artworkId="whatever" />
      </ContextProvider>
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
