import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { Sections } from "../Sections"
import { StandardArticle } from "../../Fixtures/Articles"
import { cloneDeep } from "lodash"
import { mount } from "enzyme"

jest.mock("react-sizeme", () => jest.fn(c => d => d))
jest.mock("react-lines-ellipsis/lib/html", () => {
  const React = require("react")
  return () => <div />
})

jest.mock("react-dom/server", () => ({
  renderToStaticMarkup: x => x,
}))

describe("snapshots", () => {
  it("renders properly", () => {
    const sections = renderer
      .create(<Sections article={StandardArticle} />)
      .toJSON()
    expect(sections).toMatchSnapshot()
  })
})

describe("units", () => {
  it("doesnt throw an error on invalid markup", () => {
    const spy = jest.spyOn(global.console, "error")

    expect(() => {
      const article = cloneDeep(StandardArticle)
      article.sections = [
        {
          type: "text",
          body: "<p>busted",
        },
      ]

      mount(
        <Sections
          isMobile
          DisplayPanel={() => <div>hi!</div>}
          article={article}
        />
      )
      expect(spy).toHaveBeenCalled()
    }).not.toThrowError()
  })

  it("does not inject if feature", () => {
    const article = cloneDeep(StandardArticle)
    article.layout = "feature"
    const spy = jest.spyOn(Sections.prototype, "mountDisplayToMarker")
    const wrapper = mount(
      <Sections
        isMobile
        DisplayPanel={() => <div>hi!</div>}
        article={article}
      />
    )
    expect(wrapper.state().shouldInjectMobileDisplay).toEqual(false)
    expect(spy).not.toHaveBeenCalled()
  })

  it("does not inject if desktop", () => {
    const spy = jest.spyOn(Sections.prototype, "mountDisplayToMarker")
    const wrapper = mount(
      <Sections
        isMobile={false}
        DisplayPanel={() => <div>hi!</div>}
        article={StandardArticle}
      />
    )
    expect(wrapper.state().shouldInjectMobileDisplay).toEqual(false)
    expect(spy).not.toHaveBeenCalled()
  })

  it("if mobile, sets flag to inject display", () => {
    const element = document.createElement("div")
    element.id = "__mobile_display_inject__"
    document.getElementById = () => element
    const spy = jest.spyOn(Sections.prototype, "mountDisplayToMarker")
    const wrapper = mount(
      <Sections
        isMobile
        DisplayPanel={() => <div>hi!</div>}
        article={StandardArticle}
      />
    )
    expect(wrapper.state().shouldInjectMobileDisplay).toEqual(true)
    expect(spy).toHaveBeenCalled()
  })

  it("injects a display panel marker after the second paragraph", () => {
    const { injectDisplayPanelMarker } = Sections.prototype
    const scope = {
      displayInjectId: "__to_replace__",
      props: {
        article: { id: "234" },
      },
    }
    const body = injectDisplayPanelMarker.call(
      scope,
      ["<p>hello</p>", "<p>how are you</p>", "<p>how are you</p>"].join("")
    )

    expect(body).toContain("__mobile_display_inject__234")
  })
})
