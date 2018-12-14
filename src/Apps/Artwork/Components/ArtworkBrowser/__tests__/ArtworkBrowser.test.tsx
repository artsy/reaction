import { ArtworkBrowserFixture } from "Apps/__tests__/Fixtures/Artwork/ArtworkBrowser.fixture"
import { MockBoot } from "DevTools"
import { RelayStubProvider } from "DevTools/RelayStubProvider"
import { mount, ReactWrapper } from "enzyme"
import React from "react"
import { Breakpoint } from "Utils/Responsive"
import { ArtworkBrowserFragmentContainer } from "../"

describe("ArtworkBrowser", () => {
  const getWrapper = (breakpoint: Breakpoint = "lg") => {
    return mount(
      <RelayStubProvider>
        <MockBoot breakpoint={breakpoint}>
          <ArtworkBrowserFragmentContainer
            artwork={ArtworkBrowserFixture.artwork as any}
          />
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
      expect(wrapper.find("ArtworkBrowser").length).toBe(1)
      expect(wrapper.find("ActionButtons").length).toBe(1)
    })

    it("renders correct number of images", () => {
      expect(wrapper.find("DesktopImage").length).toBe(4)
    })

    it("renders custom pagination dots", () => {
      expect(wrapper.find("PageIndicator").length).toBe(4)
    })

    it("renders share icons", () => {
      expect(wrapper.find("ShareButton").length).toBe(1)
      expect(wrapper.find("SaveButton").length).toBe(1)
    })

    it("opens share panel share button click", () => {
      wrapper
        .find("ActionIcon")
        .last()
        .simulate("click")
      wrapper.update()
      expect(wrapper.find("Share").length).toBe(1)
    })

    it("renders directional arrows", () => {
      expect(wrapper.find("ArrowButton").length).toBe(2)
    })
  })

  describe("mobile", () => {
    let wrapper: ReactWrapper

    beforeAll(() => {
      wrapper = getWrapper("xs")
    })

    it("renders correct container components", () => {
      expect(wrapper.find("ArtworkBrowser").length).toBe(1)
      expect(wrapper.find("ActionButtons").length).toBe(1)
    })

    it("renders correct number of images", () => {
      expect(wrapper.find("ResponsiveImage").length).toBe(4)
    })

    it("renders custom pagination dots", () => {
      expect(wrapper.find("PageIndicator").length).toBe(4)
    })

    it("renders share icons", () => {
      expect(wrapper.find("ShareButton").length).toBe(1)
      expect(wrapper.find("SaveButton").length).toBe(1)
    })

    it("opens share panel share button click", () => {
      wrapper
        .find("ActionIcon")
        .last()
        .simulate("click")
      wrapper.update()
      expect(wrapper.find("Share").length).toBe(1)
    })

    it("renders does not render directional arrows", () => {
      expect(wrapper.find("ArrowButton").length).toBe(0)
    })
  })
})
