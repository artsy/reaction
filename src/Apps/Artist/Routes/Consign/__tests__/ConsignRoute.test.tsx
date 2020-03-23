import { ConsignRouteFixture } from "Apps/__tests__/Fixtures/Artist/Routes/ConsignRouteFixture"
import { SystemContextProvider } from "Artsy"
import { MockBoot, renderRelayTree } from "DevTools"
import React from "react"
import { graphql } from "relay-runtime"
import { ConsignRouteFragmentContainer } from "../index"

import { ConsignRoute_Test_QueryRawResponse } from "__generated__/ConsignRoute_Test_Query.graphql"

jest.unmock("react-relay")

jest.mock("Apps/Artist/Routes/Consign/Utils/getConsignmentData", () => ({
  getConsignmentData: () => {
    const {
      artistConsignmentFixture,
    } = require("Apps/__tests__/Fixtures/Artist/Routes/ConsignRouteFixture")

    return artistConsignmentFixture
  },
}))

describe("ConsignRoute", () => {
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

    return await renderRelayTree({
      Component: ({ artist, artworksByInternalID }) => {
        return (
          <SystemContextProvider>
            <MockBoot user={{ type: "Admin" }}>
              <ConsignRouteFragmentContainer
                artist={artist}
                artworksByInternalID={artworksByInternalID}
                match={match}
                router={router}
              />
            </MockBoot>
          </SystemContextProvider>
        )
      },
      query: graphql`
        query ConsignRoute_Test_Query(
          $artistID: String!
          $recentlySoldArtworkIDs: [String]!
        ) @raw_response_type {
          artist(id: $artistID) {
            ...Consign_artist
          }
          artworksByInternalID(ids: $recentlySoldArtworkIDs) {
            ...Consign_artworksByInternalID
          }
        }
      `,
      variables: {
        artistID: "alex-katz",
        recentlySoldArtworkIDs: [
          "5d9ca6fe8f1aee0011475cf7",
          "5d126f9bba46ba0012c3134f",
          "5cffddff404918000ec89beb",
          "5aa2e90d7622dd49dc8b356c",
        ],
      },
      mockData: response,
    })
  }

  describe("ArtistConsignHeader", () => {
    it("displays artist name in header", async () => {
      const wrapper = await getWrapper()
      expect(wrapper.find("ArtistConsignHeader").text()).toContain("Alex Katz")
    })

    it("links out to consign page", async () => {
      const wrapper = await getWrapper()
      expect(
        wrapper
          .find("ArtistConsignHeader")
          .find("RouterLink")
          .html()
      ).toContain(`href="/consign"`)
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
  })

  describe("ArtistConsignHowtoSell", () => {
    it("includes button that links out to request estimate", async () => {
      const wrapper = await getWrapper()
      expect(
        wrapper
          .find("ArtistConsignHowtoSell")
          .find("RouterLink")
          .html()
      ).toContain(`href="/consign"`)
    })
  })

  describe("ArtistConsignFAQ", () => {
    it("includes link and contact", async () => {
      const wrapper = await getWrapper()
      expect(wrapper.find("ArtistConsignFAQ").html()).toContain(
        "mailto:consign@artsty.net"
      )
    })

    // FIXME: Wire up new FAQ page
    xit("includes link to stand alone FAQ page", async () => {
      //
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
      ).toContain(`href="/consign"`)
    })
  })
})
