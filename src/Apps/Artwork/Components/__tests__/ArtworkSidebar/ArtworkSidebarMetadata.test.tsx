import { cloneDeep } from "lodash"
import { graphql } from "react-relay"
import { renderRelayTree } from "../../../../../DevTools"
import {
  EmptyMetadataNoEditions,
  FilledOutMetadataMultipleEditionSets,
  FilledOutMetadataNoEditions,
  FilledOutMetadataOneEditionSet,
  MetadataForAuctionWork,
} from "../../../../__tests__/Fixtures/Artwork/ArtworkSidebar/ArtworkSidebarMetadata"
import { ArtworkSidebarClassification } from "../../ArtworkSidebar/ArtworkSidebarClassification"
import { ArtworkSidebarMetadataFragmentContainer } from "../../ArtworkSidebar/ArtworkSidebarMetadata"
import { ArtworkSidebarSizeInfo } from "../../ArtworkSidebar/ArtworkSidebarSizeInfo"

jest.unmock("react-relay")

describe("ArtworkSidebarMetadata", () => {
  let wrapper = null

  const getWrapper = async (response = FilledOutMetadataNoEditions) => {
    return await renderRelayTree({
      Component: ArtworkSidebarMetadataFragmentContainer,
      query: graphql`
        query ArtworkSidebarMetadata_Test_Query {
          artwork(id: "josef-albers-homage-to-the-square-85") {
            ...ArtworkSidebarMetadata_artwork
          }
        }
      `,
      mockResolvers: {
        Artwork: () => response,
      },
    })
  }

  describe("for non editioned artwork", () => {
    beforeAll(async () => {
      wrapper = await getWrapper()
    })

    it("displays title and year", () => {
      expect(wrapper.html()).toContain("<i>Easel (Vydock)</i>, 1995")
    })

    it("displays medium", () => {
      expect(wrapper.html()).toContain(
        "Acrylic and graphite on bonded aluminium"
      )
    })

    it("displays dimentions", () => {
      expect(wrapper.html()).toContain("97 × 15 in; 246.4 × 38.1 cm")
    })

    it("displays classification", () => {
      expect(wrapper.html()).toContain("This is a unique work")
    })
  })

  describe("for artwork with one edition", () => {
    beforeAll(async () => {
      wrapper = await getWrapper(FilledOutMetadataOneEditionSet)
    })

    it("displays title and year", () => {
      expect(wrapper.html()).toContain("<i>Sun Keyed</i>, 1972")
    })

    it("displays medium", () => {
      expect(wrapper.html()).toContain("Serigraph")
    })

    it("displays edition dimentions", () => {
      expect(wrapper.html()).toContain("14 × 18 in; 35.6 × 45.7 cm")
    })

    it("displays edition details", () => {
      expect(wrapper.html()).toContain("Edition of 3000")
    })

    it("displays classification", () => {
      expect(wrapper.html()).toContain("This is part of a limited edition set")
    })
  })

  describe("for artwork with multiple editions", () => {
    beforeAll(async () => {
      wrapper = await getWrapper(FilledOutMetadataMultipleEditionSets)
    })

    it("displays title and year", () => {
      expect(wrapper.html()).toContain("<i>Abstract 36742</i>, 2018")
    })

    it("displays medium", () => {
      expect(wrapper.html()).toContain("Premium high gloss archival print")
    })

    it("does not render edition dimentions or details", () => {
      expect(wrapper.find(ArtworkSidebarSizeInfo).length).toBe(0)
      const html = wrapper.html()
      expect(html).not.toContain("40 × 42 in; cm: 101.6 × 106.7 cm")
      expect(html).not.toContain("Edition of 3000")
    })

    it("displays classification", () => {
      expect(wrapper.html()).toContain("This is part of a limited edition set")
    })
  })

  describe("for artwork with minimal metadata", () => {
    it("only displays title info", async () => {
      wrapper = await getWrapper(EmptyMetadataNoEditions)
      const html = wrapper.html()
      expect(html).toContain("<i>Empty metadata / No editions</i>")
      expect(html).not.toContain("<i>Empty metadata / No editions<i>,")
      expect(wrapper.find(ArtworkSidebarSizeInfo).html()).toBe(null)
      expect(wrapper.find(ArtworkSidebarClassification).html()).toBe(null)
    })
  })

  describe("for artwork in an auction", () => {
    beforeAll(async () => {
      wrapper = await getWrapper(MetadataForAuctionWork)
    })

    it("displays lot number when present for biddable works", () => {
      expect(wrapper.html()).toContain("Lot 210")
    })

    it("does not display lot number when present if work is not biddable(auction closed)", async () => {
      const closedAuctionArtwork = cloneDeep(MetadataForAuctionWork)
      closedAuctionArtwork.is_biddable = false
      wrapper = await getWrapper(closedAuctionArtwork)
      expect(wrapper.html()).not.toContain("Lot 210")
    })

    it("displays title and year", () => {
      expect(wrapper.html()).toContain(
        '<i>Then the boy displayed to the Dervish his bosom, saying: "Look at my breasts which be goodlier than the breasts of maidens and my lipdews are sweeter than sugar candy...", from Four Tales from the Arabian Nights</i>, 1948'
      )
    })

    it("displays medium", () => {
      expect(wrapper.html()).toContain("Lithograph in colors, on laid paper")
    })

    it("displays edition dimentions", () => {
      expect(wrapper.html()).toContain("17 × 13 in; 43.2 × 33 cm")
    })

    it("displays classification", () => {
      expect(wrapper.html()).toContain("This is part of a limited edition set")
    })
  })
})
