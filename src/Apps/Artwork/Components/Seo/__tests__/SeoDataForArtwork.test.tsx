import { MockBoot } from "DevTools"
import { mount } from "enzyme"
import React from "react"

import { CreativeWork } from "Components/v2/Seo/CreativeWork"
import { Product } from "Components/v2/Seo/Product"
import { AVAILABILITY, SeoDataForArtwork } from "../SeoDataForArtwork"
import { SeoDataForArtworkFixture } from "./SeoDataForArtwork.fixture"

jest.unmock("react-relay")

describe("SeoDataForArtwork", () => {
  const getWrapper = async (artwork = SeoDataForArtworkFixture) => {
    return mount(
      <MockBoot>
        <SeoDataForArtwork artwork={artwork} />
      </MockBoot>
    )
  }

  const getProductData = wrapper =>
    wrapper
      .find(Product)
      .first()
      .props().data

  describe("SeoDataForArtworkFragmentContainer", () => {
    it("Renders a CreativeWork for an institution", async () => {
      const wrapper = await getWrapper({
        ...SeoDataForArtworkFixture,
        partner: {
          ...SeoDataForArtworkFixture.partner,
          type: "Institution",
        },
      })

      expect(wrapper.find(CreativeWork).length).toEqual(1)

      const data = wrapper
        .find(CreativeWork)
        .first()
        .props().data
      expect(data).toEqual({
        brand: {
          "@type": "Person",
          name: "Artist McArtist",
        },
        description: "artwork description",
        image: "artwork-image",
        name: "artwork title",
        url: "undefined/artwork/an-artwork",
        width: "1 in",
        height: "2 in",
      })
    })

    it("Renders a Product for a non-institution ", async () => {
      const wrapper = await getWrapper()

      expect(wrapper.find(Product).length).toEqual(1)

      const data = wrapper
        .find(Product)
        .first()
        .props().data
      expect(data).toEqual({
        brand: { "@type": "Person", name: "Artist McArtist" },
        category: "Design/Decorative Art",
        description: "artwork description",
        image: "artwork-image",
        name: "artwork title",
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          price: "sale message",
          priceCurrency: "USD",
          seller: {
            "@type": "ArtGallery",
            name: "Wright",
            image: "partner-image",
          },
        },
        productionDate: "1950",
        url: "undefined/artwork/an-artwork",
        width: "1 in",
        height: "2 in",
      })
    })

    describe("Artwork availability", () => {
      it("Renders InStock when 'for sale'", async () => {
        const wrapper = await getWrapper({
          ...SeoDataForArtworkFixture,
          availability: "for sale",
        })

        expect(getProductData(wrapper).offers.availability).toEqual(
          AVAILABILITY["for sale"]
        )
      })

      it("Renders OutOfStock when not 'for sale'", async () => {
        const wrapper = await getWrapper({
          ...SeoDataForArtworkFixture,
          availability: "sold",
        })

        expect(getProductData(wrapper).offers.availability).toEqual(
          AVAILABILITY.sold
        )
      })
    })

    describe("Artwork price", () => {
      it("Renders sale_message when the price range is hidden", async () => {
        const wrapper = await getWrapper({
          ...SeoDataForArtworkFixture,
          is_price_range: true,
          is_price_hidden: true,
        })

        expect(getProductData(wrapper).offers.price).toEqual("sale message")
      })

      it("Renders sale_message when not a price range", async () => {
        const wrapper = await getWrapper({
          ...SeoDataForArtworkFixture,
          is_price_range: false,
        })

        expect(getProductData(wrapper).offers.price).toEqual("sale message")
      })

      it("Renders sale_message when price range & not hidden, but there's no price", async () => {
        const wrapper = await getWrapper({
          ...SeoDataForArtworkFixture,
          is_price_range: false,
          is_price_hidden: false,
          price: undefined,
        })

        expect(getProductData(wrapper).offers.price).toEqual("sale message")
      })

      it("Renders price range when price range, not hidden, and price range exists", async () => {
        const wrapper = await getWrapper({
          ...SeoDataForArtworkFixture,
          is_price_range: true,
          is_price_hidden: false,
          price: "$1,234 - 2,345",
        })

        const offers = getProductData(wrapper).offers
        expect(offers.minPrice).toEqual("1,234")
        expect(offers.maxPrice).toEqual("2,345")
      })

      it("Breaks the price into minPrice & maxPrice when sale_message is a price range", async () => {
        const wrapper = await getWrapper({
          ...SeoDataForArtworkFixture,
          is_price_range: false,
          is_price_hidden: false,
          sale_message: "$1,234 - 2,345",
        })

        const offers = getProductData(wrapper).offers
        expect(offers.price).toBeUndefined()
        expect(offers.minPrice).toEqual("1,234")
        expect(offers.maxPrice).toEqual("2,345")
      })
    })

    describe("Artwork dimensions", () => {
      it("renders no dimensions when dimensions aren't parseable", async () => {
        const wrapper = await getWrapper({
          ...SeoDataForArtworkFixture,
          dimensions: {
            in: "one point twenty one gigawatts",
          },
        })

        expect(getProductData(wrapper).width).toBeUndefined()
        expect(getProductData(wrapper).height).toBeUndefined()
        expect(getProductData(wrapper).depth).toBeUndefined()
      })

      it("renders width and height when given two dimensions", async () => {
        const wrapper = await getWrapper({
          ...SeoDataForArtworkFixture,
          dimensions: {
            in: "2 × 4 in",
          },
        })

        expect(getProductData(wrapper).width).toEqual("2 in")
        expect(getProductData(wrapper).height).toEqual("4 in")
        expect(getProductData(wrapper).depth).toBeUndefined()
      })

      it("renders width, height, and depth when given three dimensions", async () => {
        const wrapper = await getWrapper({
          ...SeoDataForArtworkFixture,
          dimensions: {
            in: "2 × 4 × 6 in",
          },
        })

        expect(getProductData(wrapper).width).toEqual("2 in")
        expect(getProductData(wrapper).height).toEqual("4 in")
        expect(getProductData(wrapper).depth).toEqual("6 in")
      })

      it("parses dimensions missing spaces", async () => {
        const wrapper = await getWrapper({
          ...SeoDataForArtworkFixture,
          dimensions: {
            in: "2×4×6 in",
          },
        })

        expect(getProductData(wrapper).width).toEqual("2 in")
        expect(getProductData(wrapper).height).toEqual("4 in")
        expect(getProductData(wrapper).depth).toEqual("6 in")
      })

      it("assumes inches when no unit is included", async () => {
        const wrapper = await getWrapper({
          ...SeoDataForArtworkFixture,
          dimensions: {
            in: "2 × 4",
          },
        })

        expect(getProductData(wrapper).width).toEqual("2 in")
        expect(getProductData(wrapper).height).toEqual("4 in")
        expect(getProductData(wrapper).depth).toBeUndefined()
      })
    })
  })
})
