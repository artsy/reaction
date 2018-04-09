import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { cloneDeep, extend } from "lodash"
import { NewsArticle } from "../../Fixtures/Articles"
import { EditableChild } from "../../Fixtures/Helpers"
import { DateSource } from "../DateSource"
import { track } from "../../../../Utils/track"

jest.mock("../../../../Utils/track.ts", () => ({
  track: jest.fn(),
}))

describe("DateSource", () => {
  it("Renders children if present", () => {
    const component = mount(
      <DateSource article={NewsArticle} editSource={EditableChild("source")} />
    )
    expect(component.text()).toMatch("Child source")
  })

  it("does not render unnecessary text if it doesn't have a source", () => {
    const article = extend(cloneDeep(NewsArticle), { news_source: {} })
    const component = mount(<DateSource article={article} />)

    expect(component.html()).not.toContain("via")
  })

  describe("Analytics", () => {
    it("tracks news source link", () => {
      const component = mount(<DateSource article={NewsArticle} />)
      component
        .find("a")
        .at(0)
        .simulate("click")
      expect(track.mock.calls[0][0]).toEqual(
        expect.objectContaining({
          action: "Clicked news source link",
        })
      )
    })
  })
})
