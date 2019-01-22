import {
  ArtworkAuctionBannerFixture,
  ArtworkFairBannerFixture,
  ArtworkUpcomingShowBannerFixture,
  ArtwrorkNoBannerFixture,
} from "Apps/__tests__/Fixtures/Artwork/ArtworkBanner"
import { ArtworkBannerFragmentContainer } from "Apps/Artwork/Components/ArtworkBanner"
import { renderRelayTree } from "DevTools"
import { graphql } from "react-relay"

jest.unmock("react-relay")

describe("ArtworkBanner", () => {
  const getWrapper = async (response = ArtwrorkNoBannerFixture) => {
    return await renderRelayTree({
      Component: ArtworkBannerFragmentContainer,
      query: graphql`
        query ArtworkBanner_Test_Query {
          artwork(id: "richard-anuszkiewicz-lino-yellow-318") {
            ...ArtworkBanner_artwork
          }
        }
      `,
      mockData: { artwork: response },
    })
  }

  let wrapper

  describe("ArtworkBanner for artwork with no banner", () => {
    beforeAll(async () => {
      wrapper = await getWrapper()
    })
    it("renders nothing", () => {
      const html = wrapper.html()
      expect(html).toBe(null)
    })
  })

  describe("ArtworkBanner for artwork with regular auction banner", () => {
    beforeAll(async () => {
      wrapper = await getWrapper(ArtworkAuctionBannerFixture)
    })
    it("renders a correct data for the auction", () => {
      const html = wrapper.html()

      expect(html).toContain("In auction")
      // expect(html).toContain("Doyle: Post-War & Contemporary Art")
      expect(html).toContain(
        "https://d32dm0rphc51dk.cloudfront.net/teoB9Znrq-78iSh6_Vh6Og/square.jpg"
      )
      expect(html).toContain("Doyle")
    })
  })

  describe("ArtworkBanner for artwork with benefit auction banner", () => {
    beforeAll(async () => {
      wrapper = await getWrapper(ArtworkAuctionBannerFixture)
    })
    it("renders a correct data for the auction", () => {
      const html = wrapper.html()

      expect(html).toContain("In auction")
      // expect(html).toContain("BFAMI: Live Benefit Auction 2019")
      expect(html).toContain(
        "https://d32dm0rphc51dk.cloudfront.net/teoB9Znrq-78iSh6_Vh6Og/square.jpg"
      )
      expect(html).not.toContain(
        "BFAMI: Live Benefit Auction 2019 partner name"
      )
    })
  })

  describe("ArtworkBanner for artwork with fair banner", () => {
    beforeAll(async () => {
      wrapper = await getWrapper(ArtworkFairBannerFixture)
    })

    it("renders a correct data for the fair", () => {
      const html = wrapper.html()
      expect(html).toContain("At fair")
      // expect(html).toContain("West Bund Art & Design 2018")
      expect(html).toContain("White Cube")
    })
  })

  describe("ArtworkBanner for artwork with partner show banner", () => {
    beforeAll(async () => {
      wrapper = await getWrapper(ArtworkUpcomingShowBannerFixture)
    })

    it("renders a correct data for the show", () => {
      const html = wrapper.html()
      expect(html).toContain("In upcoming show")
      // expect(html).toContain("Claudia Giraudo | The age of innocence")
      expect(html).toContain("Galleria Punto Sull'Arte")
    })
  })
})
