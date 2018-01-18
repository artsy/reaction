import { mount } from "enzyme"
import _ from "lodash"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { Artworks } from "../../Fixtures/Components"
import { ArtworkCaption } from "../ArtworkCaption"

describe("ArtworkCaption", () => {
  const getWrapper = (props = {}) => {
    return mount(
      <ArtworkCaption artwork={props.artwork || Artworks[0]} />
    )
  }

  describe("snapshot", () => {
    it("renders a fullscreen caption properly", () => {
      const caption = renderer.create(
        <ArtworkCaption
          artwork={Artworks[0]}
          isFullscreenCaption
        />
      ).toJSON()
      expect(caption).toMatchSnapshot()
    })

    it("renders a classic caption properly", () => {
      const caption = renderer.create(
        <ArtworkCaption
          artwork={Artworks[0]}
          layout="classic"
        />
      ).toJSON()
      expect(caption).toMatchSnapshot()
    })

    it("renders a standard caption properly", () => {
      const caption = renderer.create(
        <ArtworkCaption
          artwork={Artworks[0]}
          layout="standard"
        />
      ).toJSON()
      expect(caption).toMatchSnapshot()
    })
  })

  describe("#joinParts", () => {
    it("joins one item", () => {
      const component = getWrapper()
      const joined = component.instance().joinParts(["Title"])
      expect(joined.toString()).toEqual("Title")
    })

    it("joins two items", () => {
      const component = getWrapper()
      const joined = component.instance().joinParts(["Title", "Date"])
      expect(joined.join("")).toEqual("Title, Date")
    })
  })

  describe("render methods", () => {
    it("renders a single artist", () => {
      const component = getWrapper()
      expect(component.html()).toMatch("Fernando Botero")
    })

    it("renders artists", () => {
      const component = getWrapper({
        artwork: _.extend({}, Artworks[0], {
          artists: [
            { name: "Andy Warhol" },
            { name: "Botero" }
          ]
        })
      })
      expect(component.html()).toMatch("<span class=\"name\">Andy Warhol</span>, <span class=\"name\">Botero</span></span>")
    })

    it("renders title + date", () => {
      const component = getWrapper({
        artwork: _.extend({}, Artworks[0], {
          date: "2000"
        })
      })
      expect(component.html()).toMatch("<span class=\"title\">Nude on the Beach</span>, <span class=\"date\">2000</span></span>")
    })

    it("renders partner + credit", () => {
      const component = getWrapper()
      expect(component.html()).toMatch("<span>Gary Nader. <span class=\"credit\">Courtesy of Gary Nader</span></span>")
    })
  })
})
