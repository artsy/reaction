import { SeoProductsForCollections_ascending_artworks } from "__generated__/SeoProductsForCollections_ascending_artworks.graphql"
import { SeoProductsForCollections_descending_artworks } from "__generated__/SeoProductsForCollections_descending_artworks.graphql"
import { mount } from "enzyme"
import React from "react"
import { HeadProvider } from "react-head"
import { SeoProductsForCollections } from "../SeoProductsForCollections"

describe("Seo Products for Collection Page", () => {
  function buildPriceRange(minPrice = 1, maxPrice = 2) {
    return {
      __typename: "PriceRange",
      minPrice: {
        major: minPrice,
        currencyCode: "USD",
      },
      maxPrice: {
        major: maxPrice,
        currencyCode: "USD",
      },
    }
  }

  function buildIndividualPrice(price) {
    return {
      __typename: "Money",
      major: price,
      currencyCode: "USD",
    }
  }

  function buildEmptyPrice() {
    return {}
  }

  function buildDescendingArtworks(
    listPrice
  ): SeoProductsForCollections_descending_artworks {
    return {
      " $refType": null,
      edges: [
        {
          node: {
            id: "1",
            availability: "yes",
            listPrice,
          },
        },
      ],
    }
  }

  function buildAscendingArtworks(
    listPrice
  ): SeoProductsForCollections_ascending_artworks {
    return {
      " $refType": null,
      edges: [
        {
          node: {
            id: "1",
            availability: "yes",
            listPrice,
          },
        },
      ],
    }
  }

  let props
  beforeEach(() => {
    props = {
      descending_artworks: buildDescendingArtworks(buildPriceRange(8800, 9000)),
      ascending_artworks: buildAscendingArtworks(buildPriceRange(10, 20)),
      collectionDescription: "A fake description for collection",
      collectionURL: "A fake URL for collection",
      collectionName: "A fake name for collection",
    }
  })

  const renderProducts = () => {
    return mount(
      <HeadProvider>
        <SeoProductsForCollections
          ascending_artworks={props.ascending_artworks}
          descending_artworks={props.descending_artworks}
          collectionDescription={props.collectionDescription}
          collectionName={props.collectionName}
          collectionURL={props.collectionURL}
        />
      </HeadProvider>
    )
  }

  it("renders collection metadata", () => {
    const wrapper = renderProducts()

    const html = wrapper.html()
    expect(html).toContain('"name":"A fake name for collection"')
    expect(html).toContain('"url":"A fake URL for collection"')
    expect(html).toContain('"description":"A fake description for collection"')
  })

  it("renders pricing data for collections with price ranges", () => {
    const wrapper = renderProducts()

    const html = wrapper.html()
    expect(html).toContain('"lowPrice":10')
    expect(html).toContain('"highPrice":9000')
  })

  it("renders pricing data for collections with individual prices", () => {
    props.descending_artworks = buildDescendingArtworks(
      buildIndividualPrice(30)
    )
    props.ascending_artworks = buildAscendingArtworks(buildIndividualPrice(15))
    const wrapper = renderProducts()

    const html = wrapper.html()
    expect(html).toContain('"lowPrice":15')
    expect(html).toContain('"highPrice":30')
  })

  describe("no prices for descending artwork", () => {
    beforeEach(() => {
      props.descending_artworks = buildDescendingArtworks(buildEmptyPrice())
    })

    it("renders price from individual ascending artwork price", () => {
      props.ascending_artworks = buildAscendingArtworks(
        buildIndividualPrice(20)
      )
      const wrapper = renderProducts()

      const html = wrapper.html()
      expect(html).toContain('"lowPrice":20')
      expect(html).toContain('"highPrice":20')
    })

    it("renders price from ascending artwork price range", () => {
      props.ascending_artworks = buildAscendingArtworks(buildPriceRange(11, 14))
      const wrapper = renderProducts()

      const html = wrapper.html()
      expect(html).toContain('"lowPrice":11')
      expect(html).toContain('"highPrice":14')
    })
  })

  describe("no prices for ascending artwork", () => {
    beforeEach(() => {
      props.ascending_artworks = buildAscendingArtworks(buildEmptyPrice())
    })

    it("renders price from individual descending artwork price", () => {
      props.descending_artworks = buildDescendingArtworks(
        buildIndividualPrice(20)
      )
      const wrapper = renderProducts()

      const html = wrapper.html()
      expect(html).toContain('"lowPrice":20')
      expect(html).toContain('"highPrice":20')
    })

    it("renders price from ascending artwork price range", () => {
      props.descending_artworks = buildDescendingArtworks(
        buildPriceRange(11, 14)
      )
      const wrapper = renderProducts()

      const html = wrapper.html()
      expect(html).toContain('"lowPrice":11')
      expect(html).toContain('"highPrice":14')
    })
  })
})
