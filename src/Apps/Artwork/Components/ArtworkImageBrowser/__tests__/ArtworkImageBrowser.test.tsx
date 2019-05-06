import { ArtworkImageBrowserFixture } from "Apps/__tests__/Fixtures/Artwork/ArtworkImageBrowser.fixture"
import { MockBoot } from "DevTools"
import { RelayStubProvider } from "DevTools/RelayStubProvider"
import { mount, ReactWrapper } from "enzyme"
import { cloneDeep } from "lodash"
import React from "react"
import { Breakpoint } from "Utils/Responsive"
import { ArtworkImageBrowserFragmentContainer } from "../"

describe("ArtworkImageBrowser", () => {
  const getWrapper = (
    breakpoint: Breakpoint = "lg",
    data = ArtworkImageBrowserFixture
  ) => {
    return mount(
      <RelayStubProvider>
        <MockBoot breakpoint={breakpoint}>
          <ArtworkImageBrowserFragmentContainer artwork={data.artwork as any} />
        </MockBoot>
      </RelayStubProvider>
    )
  }

  describe("desktop", () => {
    let wrapper: ReactWrapper

    beforeAll(() => {
      wrapper = getWrapper()
    })

    it("renders correct container components", () => {
      expect(wrapper.find("ArtworkImageBrowser").length).toBe(1)
    })

    it("renders correct number of images", () => {
      expect(wrapper.find("DesktopImage").length).toBe(4)
    })

    it("renders custom pagination dots", () => {
      expect(wrapper.find("PageIndicator").length).toBe(4)
    })

    it("renders directional arrows", () => {
      expect(wrapper.find("ArrowButton").length).toBe(2)
    })

    it("returns null if missing images", () => {
      const data = cloneDeep(ArtworkImageBrowserFixture) as any
      data.artwork.images = []
      wrapper = getWrapper("lg", data)
      expect(wrapper.find("ArtworkImageBrowser").length).toBe(0)
      expect(wrapper.find("ArtworkActions").length).toBe(0)
    })
  })

  describe("mobile", () => {
    let wrapper: ReactWrapper

    beforeAll(() => {
      wrapper = getWrapper("xs")
    })

    it("renders correct container components", () => {
      expect(wrapper.find("ArtworkImageBrowser").length).toBe(1)
    })

    it("renders correct number of images", () => {
      expect(wrapper.find("Image").length).toBe(4)
    })

    it("renders custom pagination dots", () => {
      expect(wrapper.find("PageIndicator").length).toBe(4)
    })

    it("renders does not render directional arrows", () => {
      expect(wrapper.find("ArrowButton").length).toBe(0)
    })
  })
})
