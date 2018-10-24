import { AuctionResultsFixture } from "Apps/__test__/Fixtures/Artist/Routes/AuctionResultsFixture"
import { AuctionResultsRouteFragmentContainer as AuctionResults } from "Apps/Artist/Routes/AuctionResults"
import { ContextProvider } from "Artsy"
import { MockBoot, renderRelayTree } from "DevTools"
import { ReactWrapper } from "enzyme"
import React from "react"
import { graphql } from "react-relay"
import { Breakpoint } from "Utils/Responsive"

jest.unmock("react-relay")

describe("AuctionResults", () => {
  let wrapper: ReactWrapper

  const getWrapper = async (breakpoint: Breakpoint = "xl") => {
    return await renderRelayTree({
      Component: AuctionResults,
      query: graphql`
        query AuctionResults_Test_Query($artistID: String!) {
          artist(id: $artistID) {
            ...AuctionResults_artist
          }
        }
      `,
      mockResolvers: {
        Artist: () => AuctionResultsFixture.artist,
      },
      variables: {
        artistID: "pablo-picasso",
      },
      wrapper: children => (
        <MockBoot breakpoint={breakpoint}>
          <ContextProvider>{children}</ContextProvider>
        </MockBoot>
      ),
    })
  }

  describe("general behavior", () => {
    beforeAll(async () => {
      wrapper = await getWrapper()
    })

    it("renders proper elements", () => {
      expect(wrapper.find("LargeSelect").length).toEqual(1)
      expect(wrapper.find("Pagination").length).toEqual(1)
      expect(wrapper.find("ArtistAuctionResultItem").length).toEqual(10)
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
      expect(wrapper.find("FullDescriptionLink").length).toEqual(10)
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
        expect(modalWrapper.length).toEqual(1)
      })

      it("renders the proper modal content", () => {
        expect(modalWrapper.length).toEqual(1)
        const html = modalWrapper.html()
        const data = AuctionResultsFixture.artist.auctionResults.edges[0].node
        expect(html).toContain("Lot description")
        expect(html).toContain(data.title)
        expect(html).toContain(data.dimension_text)
        expect(html).toContain(data.description)
        expect(html).toContain(data.images.thumbnail.url)
      })
    })
  })

  describe("xs", () => {
    beforeAll(async () => {
      wrapper = await getWrapper("xs")
    })

    it("renders proper elements", () => {
      expect(wrapper.find("TableColumns").html()).toEqual(null)
      expect(wrapper.find("SmallTableSidebar").length).toEqual(1)
    })
  })

  describe("sm", () => {
    beforeAll(async () => {
      wrapper = await getWrapper("sm")
    })

    it("renders proper elements", () => {
      expect(wrapper.find("LargeTableColumns").length).toEqual(0)
      expect(wrapper.find("SmallTableColumns").length).toEqual(1)
      expect(wrapper.find("LargeTableSidebar").length).toEqual(1)
    })
  })

  describe("md", () => {
    beforeAll(async () => {
      wrapper = await getWrapper("md")
    })

    it("renders proper elements", () => {
      expect(wrapper.find("LargeTableColumns").length).toEqual(0)
      expect(wrapper.find("SmallTableColumns").length).toEqual(1)
      expect(wrapper.find("LargeTableSidebar").length).toEqual(1)
    })
  })

  describe("lg", () => {
    beforeAll(async () => {
      wrapper = await getWrapper("lg")
    })

    it("renders proper elements", () => {
      expect(wrapper.find("SmallTableColumns").length).toEqual(0)
      expect(wrapper.find("LargeTableColumns").length).toEqual(1)
      expect(wrapper.find("LargeTableSidebar").length).toEqual(1)
    })
  })

  describe("xl", () => {
    beforeAll(async () => {
      wrapper = await getWrapper("xl")
    })

    it("renders proper elements", () => {
      expect(wrapper.find("SmallTableColumns").length).toEqual(0)
      expect(wrapper.find("LargeTableColumns").length).toEqual(1)
      expect(wrapper.find("LargeTableSidebar").length).toEqual(1)
    })
  })
})
