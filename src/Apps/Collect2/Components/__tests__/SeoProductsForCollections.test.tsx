import { Product } from "Components/v2/Seo/Product"
import { mount } from "enzyme"
import React from "react"
import { HeadProvider } from "react-head"
import {
  getFilteredArtworks,
  getMaxMinPrice,
  simpleConversionToUSD,
} from "../SeoProductsForCollections"

describe("Seo Products for Collection Page", () => {
  let props
  beforeEach(() => {
    props = {
      artworks: {
        " $refType": null,
        artworks_connection: {
          edges: [
            {
              node: {
                availability: "for sale",
                is_price_range: true,
                sale_message: "$1000",
                listPrice: {
                  __typename: "PriceRange",
                  minPrice: {
                    major: 1000,
                    currencyCode: "USD",
                  },
                  maxPrice: {
                    major: 2000,
                    currencyCode: "USD",
                  },
                },
              },
            },
            {
              node: {
                availability: "for sale",
                sale_message: "$1000",
                is_price_range: true,
                listPrice: {
                  __typename: "PriceRange",
                  minPrice: {
                    major: 2000,
                    currencyCode: "EUR",
                  },
                  maxPrice: {
                    major: 3000,
                    currencyCode: "EUR",
                  },
                },
              },
            },
            {
              node: {
                availability: "sold",
                is_price_range: false,
                listPrice: null,
                sale_message: "$1000",
              },
            },
            {
              node: {
                availability: "sold",
                is_price_range: false,
                listPrice: null,
                sale_message: "$1000",
              },
            },
            {
              node: {
                sale_message: "$1000",
                availability: "for sale",
                is_price_range: false,
                listPrice: {
                  __typename: "Money",
                  major: 19500,
                  currencyCode: "GBP",
                },
              },
            },
          ],
        },
      },
      collectionDescription: "A fake descripton for collection",
      collectionURL: "A fake URL for collection",
      collectionName: "A fake name for collection",
    }
  })

  it("convert the GBP and EUR to USD by using fixed ratio", () => {
    expect(simpleConversionToUSD(1000, "USD")).toBe(1000)
    expect(simpleConversionToUSD(1000, "GBP")).toBe(1280)
    expect(simpleConversionToUSD(1000, "EUR")).toBe(1100)
  })

  it("go to get the Max & MinPrice when data with different currency, some artworks with no price and some artworks with price range", () => {
    const filterArtworks = getFilteredArtworks(
      props.artworks.artworks_connection
    )
    expect(getMaxMinPrice(filterArtworks)).toEqual({ min: 1000, max: 24960 })
  })

  it("pretends the data pass into the component, and it correctly re-shows itself on ld-json", () => {
    const filterArtworks = getFilteredArtworks(
      props.artworks.artworks_connection
    )
    const expectedData = {
      "@context": "http://schema.org",
      "@type": "Product",
      name: "A name",
      description: "Some Description",
      url: "Some URL",
      offers: {
        "@type": "AggregateOffer",
        lowPrice: 1000,
        highPrice: 24960,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
    }
    expectedData.toString()
    const wrapper = mount(
      <HeadProvider>
        <Product
          data={{
            name: props.collectionName,
            description: props.collectionDescription,
            url: props.collectionURL,
            offers: {
              "@type": "AggregateOffer",
              lowPrice: getMaxMinPrice(filterArtworks).min,
              highPrice: getMaxMinPrice(filterArtworks).max,
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
            },
          }}
        />
      </HeadProvider>
    )
    expect(
      wrapper.html().includes("name" && "A fake name for collection")
    ).toBe(true)
    expect(wrapper.html().includes("lowPrice" && "1000")).toBe(true),
      expect(wrapper.html().includes("highPrice" && "24960")).toBe(true)
  })
})
