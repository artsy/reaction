import { ConsignRouteFixture } from "Apps/__tests__/Fixtures/Artist/Routes/ConsignRouteFixture"
import { SystemContextProvider } from "Artsy"
import { useTracking } from "Artsy/Analytics/useTracking"
import { MockBoot, renderRelayTree } from "DevTools"
import React from "react"
import { graphql } from "relay-runtime"
import { ConsignRouteFragmentContainer } from "../index"

import { ConsignRoute_Test_QueryRawResponse } from "__generated__/ConsignRoute_Test_Query.graphql"
import { getConsignmentData } from "../Utils/getConsignmentData"

jest.unmock("react-relay")
jest.mock("Artsy/Analytics/useTracking")

describe("ConsignRoute", () => {
  const trackEvent = jest.fn()

  const getWrapper = async (
    response: ConsignRoute_Test_QueryRawResponse = ConsignRouteFixture
  ) => {
    const match: any = {
      location: {
        pathname: "/artist/alex-katz/consign",
      },
      params: {
        artistID: "alex-katz",
      },
    }
    const router: any = {
      replace: jest.fn(),
    }

    const artistConsignment = getConsignmentData("/artist/alex-katz")

    return await renderRelayTree({
      Component: ({ artist, artworksByInternalID }) => {
        return (
          <SystemContextProvider>
            <MockBoot user={{ type: "Admin" }}>
              <ConsignRouteFragmentContainer
                artist={artist}
                artistConsignment={artistConsignment}
                match={match}
                router={router}
              />
            </MockBoot>
          </SystemContextProvider>
        )
      },
      query: graphql`
        query ConsignRoute_Test_Query($artistID: String!) @raw_response_type {
          artist(id: $artistID) {
            ...Consign_artist
          }
        }
      `,
      variables: {
        artistID: "alex-katz",
        recentlySoldArtworkIDs: [
          "5dbc8e526a65d700114f8c2b",
          "5d9ca6fe8f1aee0011475cf7",
          "5d126f9bba46ba0012c3134f",
          "5cffddff404918000ec89beb",
          "5ccb4516ec8701614303dd94",
          "5ccb45163a7e934cc7818be5",
          "5aa2e90d7622dd49dc8b356c",
        ],
      },
      mockData: response,
    })
  }

  beforeEach(() => {
    const mockTracking = useTracking as jest.Mock
    mockTracking.mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe("ArtistConsignHeader", () => {
    it("displays artist name in header", async () => {
      const wrapper = await getWrapper()
      expect(wrapper.find("ArtistConsignHeader").text()).toContain("Alex Katz")
    })

    it("displays two images in header", async () => {
      const wrapper = await getWrapper()
      expect(
        wrapper.find("ArtistConsignHeader").find("ResponsiveImage").length
      ).toEqual(4) // actually 2, but second set of images creates border
    })

    it("links out to consign page", async () => {
      const wrapper = await getWrapper()
      expect(
        wrapper
          .find("ArtistConsignHeader")
          .find("RouterLink")
          .html()
      ).toContain(`href="/consign/submission"`)
    })

    it("tracks event", async () => {
      const wrapper = await getWrapper()
      wrapper
        .find("ArtistConsignHeader")
        .find("RouterLink")
        .simulate("click")
      expect(trackEvent).toHaveBeenCalledWith({
        action_type: "Click",
        subject: "Request a price estimate",
        context_module: "Sell Works by",
      })
    })
  })

  describe("ArtistConsignRecentlySold", () => {
    it("includes artist name in recently sold", async () => {
      const wrapper = await getWrapper()
      expect(
        wrapper
          .find("ArtistConsignRecentlySold")
          .find("Subheader")
          .text()
      ).toContain("Alex Katz")
      expect(wrapper.find("ArtistConsignRecentlySold").text()).toContain(
        "Alex Katz"
      )
    })

    it("displays recently sold artworks", async () => {
      const wrapper = await getWrapper()
      expect(
        wrapper.find("ArtistConsignRecentlySold").find("FillwidthItem").length
      ).toEqual(4)
    })

    it("appends displays sold for <price> to artwork brick", async () => {
      const wrapper = await getWrapper()
      const html = wrapper.find("ArtistConsignRecentlySold").html()
      const prices = ["$5,000", "$8,500", "$1,300", "$7,500"]
      prices.forEach(price => {
        expect(html).toContain(`Sold for ${price}`)
      })
    })
  })

  describe("ArtistConsignPageViews", () => {
    it("includes artist name in pageviews title", async () => {
      const wrapper = await getWrapper()
      expect(wrapper.find("ArtistConsignPageViews").text()).toContain(
        "Alex Katz"
      )
    })

    it("includes pageviews in header", async () => {
      const wrapper = await getWrapper()
      expect(wrapper.find("ArtistConsignPageViews").text()).toContain("3,500")
    })

    it("includes unique visitors in header", async () => {
      const wrapper = await getWrapper()
      expect(wrapper.find("ArtistConsignPageViews").text()).toContain("1,200")
    })
  })

  describe("ArtistConsignMarketTrends", () => {
    it("includes highest realized price in stat", async () => {
      const wrapper = await getWrapper()
      expect(wrapper.find("ArtistConsignMarketTrends").text()).toContain(
        "$4.17M"
      )
    })

    it("includes sell-through rate in stat", async () => {
      const wrapper = await getWrapper()
      expect(wrapper.find("ArtistConsignMarketTrends").text()).toContain("79%")
    })

    it("includes realized price in stat", async () => {
      const wrapper = await getWrapper()
      expect(wrapper.find("ArtistConsignMarketTrends").text()).toContain("177%")
    })

    it("includes button that links out to auction results", async () => {
      const wrapper = await getWrapper()
      expect(
        wrapper
          .find("ArtistConsignMarketTrends")
          .find("RouterLink")
          .html()
      ).toContain(`href="/artist/alex-katz/auction-results"`)
    })

    it("tracks event", async () => {
      const wrapper = await getWrapper()
      wrapper
        .find("ArtistConsignMarketTrends")
        .find("RouterLink")
        .simulate("click")
      expect(trackEvent).toHaveBeenCalledWith({
        action_type: "Click",
        subject: "Explore Auction Results",
      })
    })
  })

  describe("ArtistConsignHowtoSell", () => {
    it("includes button that links out to request estimate", async () => {
      const wrapper = await getWrapper()
      expect(
        wrapper
          .find("ArtistConsignHowtoSell")
          .find("RouterLink")
          .html()
      ).toContain(`href="/consign/submission"`)
    })

    it("tracks event", async () => {
      const wrapper = await getWrapper()
      wrapper
        .find("ArtistConsignHowtoSell")
        .find("RouterLink")
        .simulate("click")
      expect(trackEvent).toHaveBeenCalledWith({
        action_type: "Click",
        context_module: "How to sell your collection with Artsy",
        subject: "Request a price estimate",
      })
    })
  })

  describe("ArtistConsignFAQ", () => {
    it("includes link and contact", async () => {
      const wrapper = await getWrapper()
      expect(wrapper.find("ArtistConsignFAQ").html()).toContain(
        "mailto:consign@artsty.net"
      )
    })

    it("tracks event", async () => {
      const wrapper = await getWrapper()
      wrapper
        .find("ArtistConsignFAQ")
        .find("[data-test='submitOnFAQ']")
        .simulate("click")
      expect(trackEvent).toHaveBeenCalledWith({
        action_type: "Click",
        context_module: "FAQ",
        subject: "submit works you’re interested in selling here",
      })
    })
  })

  describe("ArtistConsignSellArt", () => {
    it("includes button that links out to request estimate", async () => {
      const wrapper = await getWrapper()
      expect(
        wrapper
          .find("ArtistConsignSellArt")
          .find("RouterLink")
          .html()
      ).toContain(`href="/consign/submission"`)
    })

    it("tracks event", async () => {
      const wrapper = await getWrapper()
      wrapper
        .find("ArtistConsignSellArt")
        .find("RouterLink")
        .simulate("click")
      expect(trackEvent).toHaveBeenCalledWith({
        action_type: "Click",
        context_module: "Sell Art From Your Collection",
        subject: "Request a price estimate",
      })
    })
  })
})
