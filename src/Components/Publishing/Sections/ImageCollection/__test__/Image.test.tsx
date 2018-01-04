import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { Images } from "../../../Fixtures/Components"
import { EditableChild } from "../../../Fixtures/Helpers"
import { Image } from "../Image"

it("renders properly", () => {
  const image = renderer.create(<Image image={Images[1]} />).toJSON()
  expect(image).toMatchSnapshot()
})

it("renders a long caption properly", () => {
  const image = renderer.create(<Image image={Images[2]} />).toJSON()
  expect(image).toMatchSnapshot()
})

it("renders an editable caption properly", () => {
  const image = renderer
    .create(
    <Image image={Images[2]} editCaption={() => EditableChild('caption')} />
    )
    .toJSON()
  expect(image).toMatchSnapshot()
})

it("Renders editable fields if present", () => {
  const component = mount(
    <Image image={Images[2]} editCaption={() => EditableChild('caption')} />
  )
  expect(component.text()).toMatch("Child caption")
})