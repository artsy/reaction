import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { NewsArticle } from "../../Fixtures/Articles"
import { EditableChild } from "../../Fixtures/Helpers"
import { DateSource } from "../DateSource"

describe("DateSource", () => {
  it("Renders children if present", () => {
    const component = mount(
      <DateSource article={NewsArticle} editSource={EditableChild("source")} />
    )
    expect(component.text()).toMatch("Child source")
  })
})
