import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { Images } from "../../Fixtures/Components"
import { EditableChild } from "../../Fixtures/Helpers"
import { Artwork } from "../Artwork"
import { ViewFullscreen } from "../ViewFullscreen"

jest.mock("react-lines-ellipsis/lib/html", () => {
  const React = require("react")
  return () => <div />
})

jest.mock("react-dom/server", () => ({
  renderToStaticMarkup: x => x,
}))

it("renders properly", () => {
  const artwork = renderer.create(<Artwork artwork={Images[0]} />).toJSON()
  expect(artwork).toMatchSnapshot()
})

it("renders a fullscreen button if linked", () => {
  const component = mount(<Artwork artwork={Images[0]} linked />)
  expect(component.find(ViewFullscreen).length).toBe(1)
})

it("does not render a fullscreen button if not linked", () => {
  const component = mount(<Artwork artwork={Images[0]} linked={false} />)
  expect(component.find(ViewFullscreen).length).toBe(0)
})

it("renders a child if present", () => {
  const component = mount(
    <Artwork artwork={Images[0]}>{EditableChild("A React child.")}</Artwork>
  )
  expect(component.text()).toMatch("A React child.")
})
