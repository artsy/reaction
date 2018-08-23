import { Boot } from "Artsy/Router"
import { mount } from "enzyme"
import React from "react"
import { exhibitions } from "../../../Apps/__test__/Fixtures/SelectedExhibitions"
import { SelectedExhibitions } from "../SelectedExhibitions"

jest.mock("../../../Artsy/Router/Components/PreloadLink")

describe("SelectedExhibitions", () => {
  const props = {
    exhibitions: exhibitions as any,
    artistID: "andy-warhol",
    totalExhibitions: 100,
  }

  beforeAll(() => {
    window.matchMedia = undefined // Immediately set matching media query in Boot
  })

  it("is responsive", () => {
    const small = mount(
      <Boot initialMatchingMediaQueries={["xs"]}>
        <SelectedExhibitions {...props} />
      </Boot>
    )
    expect(
      (small.find("SelectedExhibitionsContainer").props() as any).collapsible
    ).toBe(true)

    const large = mount(
      <Boot>
        <SelectedExhibitions {...props} />
      </Boot>
    )
    expect(
      (large.find("SelectedExhibitionsContainer").props() as any).collapsible
    ).toBe(undefined)
  })

  it("shows count when collapsed", () => {
    const wrapper = mount(
      <Boot initialMatchingMediaQueries={["xs"]}>
        <SelectedExhibitions {...props} />
      </Boot>
    )

    expect(wrapper.html()).toContain("Selected exhibitions (3)")
    expect(wrapper.html()).not.toContain("Sculpture on the Move 1946–2016") // second item
  })

  it("shows all exhibitions when clicked", () => {
    const wrapper = mount(
      <Boot initialMatchingMediaQueries={["xs"]}>
        <SelectedExhibitions {...props} />
      </Boot>
    )

    expect(wrapper.html()).toContain("Selected exhibitions (3)")
    wrapper.find(".showLink").simulate("click")
    expect(wrapper.html()).toContain("Sculpture on the Move 1946–2016")
    expect(wrapper.html()).not.toContain("Selected exhibitions (3)")
  })
})
