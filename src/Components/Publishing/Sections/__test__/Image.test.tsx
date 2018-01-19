import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { Images } from "../../Fixtures/Components"
import { EditableChild } from "../../Fixtures/Helpers"
import { Image } from "../Image"
import { ViewFullscreen } from "../ViewFullscreen"

it("renders properly", () => {
  const image = renderer.create(<Image image={Images[1]} />).toJSON()
  expect(image).toMatchSnapshot()
})

it("renders a long caption properly", () => {
  const image = renderer.create(<Image image={Images[2]} />).toJSON()
  expect(image).toMatchSnapshot()
})

it("renders a react child as caption properly", () => {
  const image = renderer
    .create(<Image image={Images[2]}>{EditableChild("A React child.")}</Image>)
    .toJSON()
  expect(image).toMatchSnapshot()
})

it("renders a fullscreen button if linked", () => {
  const component = mount(<Image image={Images[2]} linked />)
  expect(component.find(ViewFullscreen).length).toBe(1)
})

it("does not render a fullscreen button if not linked", () => {
  const component = mount(<Image image={Images[2]} linked={false} />)
  expect(component.find(ViewFullscreen).length).toBe(0)
})

it("renders editCaption if present", () => {
  const component = mount(
    <Image image={Images[2]} editCaption={() => EditableChild("editCaption")} />
  )
  expect(component.text()).toMatch("editCaption")
})

it("renders a child if present", () => {
  const component = mount(
    <Image image={Images[2]}>{EditableChild("A React child.")}</Image>
  )
  expect(component.text()).toMatch("A React child.")
})
