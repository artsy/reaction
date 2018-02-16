import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { SeriesArticle, SeriesArticleSponsored } from "../../Fixtures/Articles"
import { EditableChild } from "../../Fixtures/Helpers"
import { SeriesAbout } from "../SeriesAbout"

jest.mock("../../../../Utils/track.ts", () => ({
  track: jest.fn(),
}))

describe("SeriesAbout", () => {
  describe("snapshots", () => {
    it("renders a series about properly", () => {
      const component = renderer
        .create(<SeriesAbout article={SeriesArticle} />)
        .toJSON()
      expect(component).toMatchSnapshot()
    })

    it("renders a sponsored series about properly", () => {
      const component = renderer
        .create(<SeriesAbout article={SeriesArticleSponsored} />)
        .toJSON()
      expect(component).toMatchSnapshot()
    })

    it("renders series about with children properly", () => {
      const component = renderer
        .create(
          <SeriesAbout
            article={SeriesArticle}
            editDescription={EditableChild("description")}
          />
        )
        .toJSON()
      expect(component).toMatchSnapshot()
    })
  })

  describe("unit", () => {
    it("Renders partner block for a sponsored series", () => {
      const component = mount(<SeriesAbout article={SeriesArticleSponsored} />)
      expect(component.find(".PartnerBlock").length).not.toBe(0)
    })

    it("Does not render partner block for an unsponsored series", () => {
      const component = mount(<SeriesAbout article={SeriesArticle} />)
      expect(component.find(".PartnerBlock").length).toBe(0)
    })

    it("Renders children if present", () => {
      const component = mount(
        <SeriesAbout
          article={SeriesArticle}
          editDescription={EditableChild("description")}
        />
      )
      expect(component.text()).toMatch("Child description")
    })

    it("Tracks click on link in footer", () => {
      const component = mount(
        <SeriesAbout
          article={SeriesArticleSponsored}
          tracking={{ trackEvent: jest.fn() }}
        />
      )
      const spy = jest.spyOn(component.props().tracking, "trackEvent")
      component
        .instance()
        .onClickFooterLink({ currentTarget: { href: "artsy.net" } })

      expect(spy.mock.calls[0][0]).toEqual(
        expect.objectContaining({
          action: "Click",
          destination_path: "artsy.net",
          flow: "Partner Footer CTA",
          type: "external_link",
        })
      )
    })
  })
})
