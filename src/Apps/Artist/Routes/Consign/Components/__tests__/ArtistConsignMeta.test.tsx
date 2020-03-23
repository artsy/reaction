import { MockBoot } from "DevTools"
import { mount } from "enzyme"
import React from "react"
import { ArtistConsignMeta } from "../ArtistConsignMeta"

jest.mock("Utils/getENV", () => ({
  getENV: () => "https://artsy.net",
}))

describe("ArtistConsignMeta", () => {
  const props = {
    artistName: "Alex Katz",
    artistHref: "/artist/alex-katz",
    imageURL: "path/to/image.jpg",
  }
  const getWrapper = (passedProps = {}) => {
    return mount(
      <MockBoot>
        <ArtistConsignMeta {...props} {...passedProps} />
      </MockBoot>
    )
  }

  it("outputs correct title tags", () => {
    const wrapper = getWrapper()
    expect(wrapper.find("Title").debug()).toContain(props.artistName) // use `debug` to assert on component tree, vs html tree
    expect(
      wrapper
        .find("Meta")
        .findWhere(c => c.props().property === "og:title")
        .debug()
    ).toContain(props.artistName)
    expect(
      wrapper
        .find("Meta")
        .findWhere(c => c.props().property === "og:title")
        .debug()
    ).toContain(props.artistName)
  })

  it("outputs correct description tags", () => {
    const wrapper = getWrapper()
    expect(
      wrapper
        .find("Meta")
        .findWhere(c => c.props().name === "description")
        .debug()
    ).toContain(props.artistName)
    expect(
      wrapper
        .find("Meta")
        .findWhere(c => c.props().property === "twitter:description")
        .debug()
    ).toContain(props.artistName)
    expect(
      wrapper
        .find("Meta")
        .findWhere(c => c.props().property === "og:description")
        .debug()
    ).toContain(props.artistName)
  })

  it("outputs correct URL tags", () => {
    const consignHref = `https://artsy.net${props.artistHref}/consign`
    const wrapper = getWrapper()
    expect(
      wrapper
        .find("Link")
        .findWhere(c => c.props().rel === "canonical")
        .debug()
    ).toContain(consignHref)
    expect(
      wrapper
        .find("Meta")
        .findWhere(c => c.props().property === "og:url")
        .debug()
    ).toContain(consignHref)
  })

  describe("image tags", () => {
    it("does not output image tag if image not available", () => {
      const wrapper = getWrapper({ imageURL: null })
      expect(
        wrapper.find("Meta").findWhere(c => c.props().name === "thumbnail")
          .length
      ).toEqual(0)
    })

    it("outputs correct image tags if available", () => {
      const wrapper = getWrapper()
      expect(
        wrapper
          .find("Meta")
          .findWhere(c => c.props().name === "thumbnail")
          .debug()
      ).toContain(props.imageURL)
    })
  })
})
