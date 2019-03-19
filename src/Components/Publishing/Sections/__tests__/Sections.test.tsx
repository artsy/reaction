import {
  FeatureArticle,
  StandardArticle,
} from "Components/Publishing/Fixtures/Articles"
import { WrapperWithFullscreenContext } from "Components/Publishing/Fixtures/Helpers"
import { SectionData } from "Components/Publishing/Typings"
import { mount } from "enzyme"
import "jest-styled-components"
import { cloneDeep, defer } from "lodash"
import React from "react"
import renderer from "react-test-renderer"
import { Sections } from "../Sections"

jest.mock("isomorphic-fetch")

jest.mock("react-lines-ellipsis/lib/html", () => {
  // tslint:disable:no-shadowed-variable
  const React = require("react")
  return () => <div />
})

jest.mock("react-dom/server", () => ({
  renderToStaticMarkup: x => x,
}))

declare const global: any
const renderSnapshot = props => {
  return renderer
    .create(WrapperWithFullscreenContext(<Sections {...props} />))
    .toJSON()
}

const mountWrapper = props => {
  return mount(WrapperWithFullscreenContext(<Sections {...props} />))
}

describe("Sections", () => {
  let props
  beforeEach(
    () =>
      (props = {
        article: StandardArticle,
        DisplayPanel: () => <div>hi!</div>,
        isMobile: true,
      })
  )

  describe("snapshots tests", () => {
    it("renders properly", () => {
      props.isMobile = false
      const sections = renderSnapshot(props)
      expect(sections).toMatchSnapshot()
    })
  })

  describe("unit tests", () => {
    const originalConsoleError = console.error

    afterAll(() => {
      console.error = originalConsoleError
    })

    it("doesnt throw an error on invalid markup", () => {
      console.error = jest.fn()

      expect(() => {
        const article = cloneDeep(StandardArticle)
        article.sections = [
          {
            type: "text",
            body: "<p>busted",
          },
        ]
        props.article = article
        mountWrapper(props)
        expect(console.error).toHaveBeenCalled()
      }).not.toThrowError()
    })

    it("does not inject if feature", () => {
      const article = cloneDeep(StandardArticle)
      article.layout = "feature"
      const spy = jest.spyOn(Sections.prototype, "mountDisplayToMarker")
      props.article = article
      const wrapper = mountWrapper(props)
        .childAt(0)
        .instance() as any
      expect(wrapper.state.shouldInjectMobileDisplay).toEqual(false)
      expect(spy).not.toHaveBeenCalled()
    })

    it("does not inject if desktop", () => {
      const spy = jest.spyOn(Sections.prototype, "mountDisplayToMarker")
      props.isMobile = false
      const wrapper = mountWrapper(props)
        .childAt(0)
        .instance() as any
      expect(wrapper.state.shouldInjectMobileDisplay).toEqual(false)
      expect(spy).not.toHaveBeenCalled()
    })

    it("if mobile, sets flag to inject display", () => {
      const element = document.createElement("div")
      element.id = "__mobile_display_inject__"
      document.getElementById = () => element
      const spy = jest.spyOn(Sections.prototype, "mountDisplayToMarker")

      const wrapper = mountWrapper(props)
        .childAt(0)
        .instance() as any
      expect(wrapper.state.shouldInjectMobileDisplay).toEqual(true)
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

    it("#getContentStartIndex returns the index of first text section if feature", () => {
      props.article = FeatureArticle
      const wrapper = mountWrapper(props)
        .childAt(0)
        .instance() as any
      expect(wrapper.getContentStartIndex()).toBe(0)
    })

    it("#getContentEndIndex returns the index of last text section", () => {
      props.article = FeatureArticle
      const wrapper = mountWrapper(props)
        .childAt(0)
        .instance() as any
      expect(wrapper.getContentEndIndex()).toBe(11)
    })
  })

  describe("SocialEmbed", () => {
    beforeEach(() => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          status: 200,
          json: () =>
            Promise.resolve({
              html: "<blockquote>Instagram</blockquote>",
            }),
        })
      )
    })

    afterEach(() => {
      global.fetch.mockClear()
    })

    it("Renders social embed section", done => {
      const sections = [
        {
          type: "social_embed",
          url: "https://instagram.com/p/965246051107164160",
          layout: "column_width",
        },
      ] as SectionData[]
      props.article = StandardArticle
      props.isMobile = false
      props.article.sections = sections
      const component = mount(<Sections {...props} />)

      defer(() => {
        expect(component.html()).toContain("Instagram")
        done()
      }, 10)
    })
  })
})
