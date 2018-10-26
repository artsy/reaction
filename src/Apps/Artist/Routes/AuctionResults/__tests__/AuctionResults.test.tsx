import { AuctionResultsFixture } from "Apps/__test__/Fixtures/Artist/Routes/AuctionResultsFixture"
import { AuctionResultsRouteFragmentContainer as AuctionResultsRoute } from "Apps/Artist/Routes/AuctionResults"
import { MockBoot } from "DevTools"
import { RelayStubProvider } from "DevTools/RelayStubProvider"
import { mount, ReactWrapper } from "enzyme"
import React from "react"
import { Breakpoint } from "Utils/Responsive"

describe("AuctionResults", () => {
  let wrapper: ReactWrapper

  const getWrapper = (breakpoint: Breakpoint = "xl") => {
    return mount(
      <RelayStubProvider>
        <MockBoot breakpoint={breakpoint}>
          <AuctionResultsRoute artist={AuctionResultsFixture as any} />
        </MockBoot>
      </RelayStubProvider>
    )
  }

  describe("general behavior", () => {
    beforeAll(() => {
      wrapper = getWrapper()
    })

    it("renders proper elements", () => {
      expect(wrapper.find("LargeSelect").length).toBe(1)
      expect(wrapper.find("Pagination").length).toBe(1)
      expect(wrapper.find("ArtistAuctionResultItem").length).toBe(10)
    })

    it("renders the proper count", () => {
      expect(wrapper.html()).toContain("830 Results")
    })

    it("renders proper select options", () => {
      const html = wrapper.find("LargeSelect").html()
      expect(html).toContain("Most recent")
      expect(html).toContain("Estimate")
      expect(html).toContain("Sale price")
    })

    it('renders "Full Description" buttons', () => {
      expect(wrapper.find("FullDescriptionLink").length).toBe(10)
    })

    describe("modal pop up", () => {
      let modalWrapper: ReactWrapper

      beforeAll(() => {
        wrapper
          .find("FullDescriptionLink")
          .first()
          .simulate("click")
        wrapper.update()
        modalWrapper = wrapper.find("ArtistAuctionDetailsModal")
      })

      it("shows a modal on FullDescriptionLink click", () => {
        expect(modalWrapper.length).toBe(1)
      })

      it("renders the proper modal content", () => {
        expect(modalWrapper.length).toBe(1)
        const html = modalWrapper.html()
        const data = AuctionResultsFixture.auctionResults.edges[0].node
        expect(html).toContain("Lot description")
        expect(html).toContain(data.title)
        expect(html).toContain(data.dimension_text)
        expect(html).toContain(data.description)
        expect(html).toContain(data.images.thumbnail.url)
      })
    })
  })

  describe("xs", () => {
    beforeAll(() => {
      wrapper = getWrapper("xs")
    })

    it("renders proper elements", () => {
      expect(wrapper.find("TableColumns").html()).toBe(null)
      expect(wrapper.find("SmallTableSidebar").length).toBe(1)
    })
  })

  describe("sm", () => {
    beforeAll(() => {
      wrapper = getWrapper("sm")
    })

    it("renders proper elements", () => {
      expect(wrapper.find("LargeTableColumns").length).toBe(0)
      expect(wrapper.find("SmallTableColumns").length).toBe(1)
      expect(wrapper.find("LargeTableSidebar").length).toBe(1)
    })
  })

  describe("md", () => {
    beforeAll(() => {
      wrapper = getWrapper("md")
    })

    it("renders proper elements", () => {
      expect(wrapper.find("LargeTableColumns").length).toBe(0)
      expect(wrapper.find("SmallTableColumns").length).toBe(1)
      expect(wrapper.find("LargeTableSidebar").length).toBe(1)
    })
  })

  describe("lg", () => {
    beforeAll(() => {
      wrapper = getWrapper("lg")
    })

    it("renders proper elements", () => {
      expect(wrapper.find("SmallTableColumns").length).toBe(0)
      expect(wrapper.find("LargeTableColumns").length).toBe(1)
      expect(wrapper.find("LargeTableSidebar").length).toBe(1)
    })
  })

  describe("xl", () => {
    beforeAll(() => {
      wrapper = getWrapper("xl")
    })

    it("renders proper elements", () => {
      expect(wrapper.find("SmallTableColumns").length).toBe(0)
      expect(wrapper.find("LargeTableColumns").length).toBe(1)
      expect(wrapper.find("LargeTableSidebar").length).toBe(1)
    })
  })
})
