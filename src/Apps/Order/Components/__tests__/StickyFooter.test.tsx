import { ContextProvider } from "Artsy/Router"
import { mount } from "enzyme"
import React from "react"
import { StickyFooter } from "../StickyFooter"

describe("Sticky footer", () => {
  const mediatorMock = {
    trigger: jest.fn(),
  }

  // FIXME: Reenable when React 16.4.5 is release
  // https://github.com/facebook/react/issues/13150#issuecomment-411134477

  // describe("snapshots", () => {
  //   it("renders the StickyFooter properly", () => {
  //     const component = renderer
  //       .create(
  //         <ContextProvider>
  //           <StickyFooter artworkId="whatever" />
  //         </ContextProvider>
  //       )
  //       .toJSON()
  //     expect(component).toMatchSnapshot()
  //   })
  // })

  it("handles FAQ modal", () => {
    const component = mount(
      <StickyFooter orderType="OFFER" artworkId="whatever" />
    )

    component
      .find("a")
      .at(0)
      .simulate("click")

    expect(window.open).toHaveBeenCalledWith(
      "https://www.artsy.net/buy-now-feature-faq",
      "_blank"
    )
  })

  it("handles contact specialist modal", () => {
    const component = mount(
      <ContextProvider mediator={mediatorMock}>
        <StickyFooter orderType="OFFER" artworkId="whatever" />
      </ContextProvider>
    )

    component
      .find("a")
      .at(1)
      .simulate("click")

    expect(mediatorMock.trigger).toHaveBeenCalledWith(
      "openOrdersContactArtsyModal",
      { artworkId: "whatever" }
    )
  })

  it("displays the 'Need help?' message", () => {
    const component = mount(
      <StickyFooter orderType="OFFER" artworkId="whatever" />
    )
    expect(component.text()).toContain(
      "Need help? Read our FAQ or ask a question."
    )
  })
})
