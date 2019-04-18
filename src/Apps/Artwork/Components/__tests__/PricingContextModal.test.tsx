import { Button, Link, QuestionCircleIcon } from "@artsy/palette"
import { mount } from "enzyme"
import React from "react"
import { PricingContextModal } from "../PricingContextModal"

jest.unmock("react-relay")

describe("PricingContextModal", () => {
  it("renders with the modal closed", async () => {
    const component = mount(<PricingContextModal />)
    component.find(QuestionCircleIcon)

    expect(component.find(QuestionCircleIcon).length).toEqual(1)

    expect(component.text()).not.toContain(
      "This feature aims to provide insight into the range of prices for an artist's works and allow buyers to discover other available works by the artist at different price points."
    )
  })

  it("renders the link to 'How Artworks Get Their Prices' article", async () => {
    const component = mount(<PricingContextModal />)
    component
      .find(QuestionCircleIcon)
      .at(0)
      .simulate("click")

    component.find(Link)

    expect(component.find(Link).length).toEqual(1)
    expect(component.find(Link).props().href).toEqual(
      "https://www.artsy.net/article/artsy-editorial-artworks-prices"
    )
  })

  it("opens the modal when the question mark icon is clicked", async () => {
    const component = mount(<PricingContextModal />)

    component
      .find(QuestionCircleIcon)
      .at(0)
      .simulate("click")
    expect(component.text()).toContain(
      "This feature aims to provide insight into the range of prices for an artist's works and allow buyers to discover other available works by the artist at different price points."
    )
  })

  it("closes the modal when the 'Got it' button is clicked", async () => {
    const component = mount(<PricingContextModal />)
    component
      .find(QuestionCircleIcon)
      .at(0)
      .simulate("click")

    expect(component.text()).toContain(
      "This feature aims to provide insight into the range of prices for an artist's works and allow buyers to discover other available works by the artist at different price points."
    )

    component
      .find(Button)
      .at(0)
      .simulate("click")

    // Wait for modal close animation to finish
    setTimeout(() => {
      expect(component.text()).not.toContain(
        "This feature aims to provide insight into the range of prices for an artist's works and allow buyers to discover other available works by the artist at different price points."
      )
    }, 500)
  })
})
