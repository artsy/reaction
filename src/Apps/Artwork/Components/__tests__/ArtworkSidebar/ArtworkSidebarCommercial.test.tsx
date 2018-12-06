import {
  ArtworkBuyNow,
  ArtworkBuyNowMakeOffer,
  ArtworkMakeOffer,
  ArtworkSold,
} from "Apps/__tests__/Fixtures/Artwork/ArtworkSidebar/ArtworkSidebarCommercial"
import { ArtworkSidebarCommercialFragmentContainer } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarCommercial"
import { renderRelayTree } from "DevTools"
import { graphql } from "react-relay"

jest.unmock("react-relay")

describe("ArtworkSidebarCommercial", () => {
  const getWrapper = async response => {
    return await renderRelayTree({
      Component: ArtworkSidebarCommercialFragmentContainer,
      query: graphql`
        query ArtworkSidebarCommercial_Test_Query {
          artwork(id: "commercial_artwork") {
            ...ArtworkSidebarCommercial_artwork
          }
        }
      `,
      mockResolvers: {
        Artwork: () => response,
      },
    })
  }

  let artwork

  it("displays artwork enrolled in Buy Now", async () => {
    artwork = Object.assign({}, ArtworkBuyNow)

    const wrapper = await getWrapper(artwork)

    expect(wrapper.text()).toContain(artwork.sale_message)
  })

  it("displays sold acquireable artwork", async () => {
    artwork = Object.assign({}, ArtworkSold)

    const wrapper = await getWrapper(artwork)

    expect(wrapper.text()).toContain("Sold")
  })

  it("displays artwork enrolled in Make Offer", async () => {
    artwork = Object.assign({}, ArtworkMakeOffer)

    const wrapper = await getWrapper(artwork)

    expect(wrapper.text()).toContain("Make Offer")
  })

  it("displays artwork enrolled in both Buy Now and Make Offer", async () => {
    artwork = Object.assign({}, ArtworkBuyNowMakeOffer)

    const wrapper = await getWrapper(artwork)

    expect(wrapper.text()).toContain("Buy Now")
    expect(wrapper.text()).toContain("Make Offer")
  })
})
