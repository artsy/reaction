import { Boot } from "Artsy/Router"
import { mount } from "enzyme"
import React from "react"
import { LargeSlider, Slider, SmallSlider } from "../Slider"

describe("Slider", () => {
  beforeAll(() => {
    window.matchMedia = undefined // Immediately set matching media query in Boot
  })

  it("is responsive", () => {
    const small = mount(
      <Boot initialMatchingMediaQueries={["xs"]}>
        <Slider
          data={[{ name: "foo" }]}
          render={props => {
            return <div />
          }}
        />
      </Boot>
    )
    expect(small.find(SmallSlider).length).toEqual(1)

    const large = mount(
      <Boot initialMatchingMediaQueries={["lg"]}>
        <Slider
          data={[{ name: "foo" }]}
          render={props => {
            return <div />
          }}
        />
      </Boot>
    )
    expect(large.find(LargeSlider).length).toEqual(1)
  })

  it("renders any kind of react element and iterates over data", () => {
    const Foo = ({ name }) => <div>hello {name} how are you</div>

    let wrapper = mount(
      <Boot>
        <Slider
          data={[{ name: "name1" }, { name: "name2" }]}
          render={props => {
            return <Foo {...props} />
          }}
        />
      </Boot>
    )
    expect(wrapper.find(Foo).length).toEqual(2)
    expect(
      wrapper
        .find(Foo)
        .first()
        .html()
    ).toContain("hello name1 how are you")
  })
})
