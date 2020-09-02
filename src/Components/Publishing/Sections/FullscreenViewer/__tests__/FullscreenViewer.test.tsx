import React from "react"
import { mount } from "enzyme"
import { FullscreenViewer } from "../FullscreenViewer"
import { Images } from "Components/Publishing/Fixtures/Components"

it("renders properly", () => {
  const wrapper = mount(
    <FullscreenViewer images={Images} show onClose={() => {}} />
  )
  const html = wrapper.html()
  expect(html).toContain("Close")
  expect(html).toContain("View Caption")
  expect(html).toContain("Guggenheim Museum")
})
