import { ArtworkImageBrowserFixture } from "Apps/__tests__/Fixtures/Artwork/ArtworkImageBrowser.fixture"
import { MockBoot, renderRelayTree } from "DevTools"
import { ReactWrapper } from "enzyme"
import { cloneDeep } from "lodash"
import React from "react"
import { graphql } from "react-relay"
import { Breakpoint } from "Utils/Responsive"
import { ArtworkImageBrowserFragmentContainer as ArtworkImageBrowser } from "../"

jest.unmock("react-relay")

describe("ArtworkImageBrowser", () => {
  const getWrapper = async (
    breakpoint: Breakpoint = "lg",
    data = ArtworkImageBrowserFixture
  ) => {
    return await renderRelayTree({
      Component: ArtworkImageBrowser,
      query: graphql`
        query ArtworkImageBrowser_Test_Query($artwork_id: String!) {
          artwork(id: $artwork_id) {
            ...ArtworkImageBrowser_artwork
          }
        }
      `,
      mockData: data,
      variables: {
        artwork_id: "matt-z-and-percy-still-life",
      },
      wrapper: children => (
        <MockBoot breakpoint={breakpoint}>{children}</MockBoot>
      ),
    })
  }

  describe("desktop", () => {
    let wrapper: ReactWrapper

    beforeAll(async () => {
      wrapper = await getWrapper()
    })

    it("renders correct container components", () => {
      expect(wrapper.find("ArtworkImageBrowser").length).toBe(1)
    })

    it("renders correct number of images", () => {
      expect(wrapper.find("Image").length).toBe(4)
    })

    it("renders directional arrows", () => {
      expect(wrapper.find("ArrowButton").length).toBe(2)
    })

    it("returns null if missing images", async () => {
      const data = cloneDeep(ArtworkImageBrowserFixture) as any
      data.artwork.images = []
      wrapper = await getWrapper("lg", data)
      expect(wrapper.find("ArtworkImageBrowser").length).toBe(0)
      expect(wrapper.find("ArtworkActions").length).toBe(0)
    })
  })

  describe("mobile", () => {
    let wrapper: ReactWrapper

    beforeAll(async () => {
      wrapper = await getWrapper("xs")
    })

    it("renders correct container components", () => {
      expect(wrapper.find("ArtworkImageBrowser").length).toBe(1)
    })

    it("renders correct number of images", () => {
      expect(wrapper.find("Image").length).toBe(4)
    })

    it("renders does not render directional arrows", () => {
      expect(wrapper.find("ArrowButton").length).toBe(0)
    })
  })
})
