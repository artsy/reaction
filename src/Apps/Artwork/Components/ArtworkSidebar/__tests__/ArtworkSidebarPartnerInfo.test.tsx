import { ArtworkFromPartnerWithLocations } from "Apps/__tests__/Fixtures/Artwork/ArtworkSidebar/ArtworkSidebarPartnerInfo"
import { ArtworkSidebarPartnerInfoFragmentContainer } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarPartnerInfo"
import { renderRelayTree } from "DevTools"
import { graphql } from "react-relay"

jest.unmock("react-relay")

describe("ArtworkSidebarPartnerInfo", () => {
  const getWrapper = async response => {
    return await renderRelayTree({
      Component: ArtworkSidebarPartnerInfoFragmentContainer,
      query: graphql`
        query ArtworkSidebarPartnerInfo_Test_Query {
          artwork(id: "artwork_from_partner_with_locations") {
            ...ArtworkSidebarPartnerInfo_artwork
          }
        }
      `,
      mockResolvers: {
        Artwork: () => response,
      },
    })
  }

  let artwork

  describe("ArtworkSidebarPartnerInfo", () => {
    beforeEach(() => {
      artwork = Object.assign({}, ArtworkFromPartnerWithLocations)
    })

    it("displays partner name", async () => {
      const wrapper = await getWrapper(artwork)

      expect(wrapper.text()).toContain(artwork.partner.name)
      expect(wrapper.find({ href: artwork.partner.href }).length).toBe(1)
    })

    it("displays partner name without href", async () => {
      artwork.partner.href = null

      const wrapper = await getWrapper(artwork)

      expect(wrapper.text()).toContain(artwork.partner.name)
      expect(wrapper.find({ href: artwork.partner.href }).length).toBe(0)
    })

    it("displays partner locations", async () => {
      const wrapper = await getWrapper(artwork)

      const text = wrapper.text()

      artwork.partner.locations.forEach(location => {
        expect(text).toContain(location.city)
      })
    })

    it("displays partner without locations", async () => {
      artwork.partner.locations = []

      const wrapper = await getWrapper(artwork)

      expect(wrapper.text()).toContain(artwork.partner.name)
    })
  })
})
