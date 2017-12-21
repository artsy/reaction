import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { Images } from "../../../Fixtures/Components"
import { Caption } from "../Caption"

it("renders an artwork caption properly", () => {
  const caption = renderer.create(<Caption section={Images[0]} total={10} index={2} open />).toJSON()
  expect(caption).toMatchSnapshot()
})

it("renders an image caption properly", () => {
  const caption = renderer.create(<Caption section={Images[1]} total={10} index={3} open />).toJSON()
  expect(caption).toMatchSnapshot()
})

it("toggles the caption on mobile to hide", () => {
  const context = { onToggleCaption: jest.fn() }
  const caption = mount(<Caption section={Images[0]} total={10} index={2} open />, {
    childContextTypes: context,
    context,
  })
  console.log(caption.find(".fullscreen-viewer__caption-toggle"))
  expect(caption.find(".fullscreen-viewer__caption-toggle").text()).toBe("Hide")
  caption.find(".fullscreen-viewer__caption-toggle").simulate("click")
  expect(context.onToggleCaption.mock.calls.length).toBeGreaterThan(0)
})

it("toggles the caption on mobile to view", () => {
  const context = { onToggleCaption: jest.fn() }
  const caption = mount(<Caption section={Images[0]} total={10} index={2} open={false} />, {
    childContextTypes: context,
    context,
  })
  expect(caption.find(".fullscreen-viewer__caption-toggle").text()).toBe("View Caption")
  caption.find(".fullscreen-viewer__caption-toggle").simulate("click")
  expect(context.onToggleCaption.mock.calls.length).toBeGreaterThan(0)
})
