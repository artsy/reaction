import { SystemContextProvider } from "Artsy"
import { mount } from "enzyme"
import React from "react"
import { ConsignRoute } from "../index"

jest.mock("Apps/Artist/Routes/Consign/Utils/getConsignmentData", () => ({
  getConsignmentData: () => {
    return {
      artworks: [],
      metadata: {
        highestRealized: "",
        realized: "",
        recentlySoldArtworkIDs: [""],
        roundedUniqueVisitors: "",
        roundedViews: "",
        str: "",
        uniqueVisitors: "",
        views: "",
      },
    }
  },
}))

describe("ConsignRoute", () => {
  const getWrapper = (props = {}) => {
    const artist: any = {
      name: "Banksy",
    }
    const artworksByInternalID: any = ["foo", "bar", "baz"]
    const match: any = {
      location: {
        pathname: "/artist/banksy/consign",
      },
    }
    const router: any = {
      replace: jest.fn(),
    }

    return mount(
      <SystemContextProvider user={{ type: "Admin" }}>
        <ConsignRoute
          artist={artist}
          artworksByInternalID={artworksByInternalID}
          match={match}
          router={router}
          {...props}
        />
      </SystemContextProvider>
    )
  }

  describe("ArtistConsignHeader", () => {
    const wrapper = getWrapper()

    it("displays artist name in header", () => {
      expect(wrapper.find("ArtistConsignHeader")).toContain("Banksy")
    })

    it("links out to consign page", () => {
      expect(
        wrapper
          .find("ArtistConsignHeader")
          .find("RouterLink")
          .html()
      ).toContain(`href="/consign"`)
      expect(wrapper.find("ArtistConsignHeader")).toContain("Banksy")
    })
  })

  describe("ArtistConsignRecentlySold", () => {
    const wrapper = getWrapper()

    it("includes artist name in recently sold", () => {
      // expect(wrapper.find("ArtistConsignRecentlySold")).toContain("Banksy")
    })

    it("displays recently sold artworks", () => {
      // expect(wrapper.find("ArtistConsignRecentlySold")).toContain("Banksy")
    })
  })

  describe("ArtistConsignPageViews", () => {
    const wrapper = getWrapper()

    it("includes artist name in pageviews title", () => {
      // expect(wrapper.find("ArtistConsignPageViews")).toContain("Banksy")
    })

    it("includes pageviews in header", () => {
      // expect(wrapper.find("ArtistConsignPageViews")).toContain("Banksy")
    })
  })

  describe("ArtistConsignMarketTrends", () => {
    const wrapper = getWrapper()

    it("includes highest realized price in stat", () => {
      //
    })

    it("includes sell-through rate in stat", () => {
      //
    })

    it("includes realized price in stat", () => {
      //
    })

    it("includes button that links out to auction results", () => {
      //
    })
  })

  describe("ArtistConsignHowtoSell", () => {
    const wrapper = getWrapper()

    it("includes button that links out to request estimate", () => {
      //
    })
  })

  describe("ArtistConsignFAQ", () => {
    const wrapper = getWrapper()

    it("includes link to FAQ and contact", () => {
      //
    })
  })

  describe("ArtistConsignSellArt", () => {
    const wrapper = getWrapper()

    it("includes button that links out to request estimate", () => {
      //
    })
  })
})
