import { Product } from "Components/v2/Seo/Product"
import { mount } from "enzyme"
import React from "react"
import { HeadProvider } from "react-head"
import { getMaxMinPrice } from "../SeoProductsForCollections"

describe("Seo Products for Collection Page", () => {
  let props
  beforeEach(() => {
    props = {
      descending_artworks: {
        " $refType": null,
        edges: [
          {
            node: {
              listPrice: {
                minPrice: {
                  major: 8800,
                  currencyCode: "USD",
                  __typename: "PriceRange",
                },
                maxPrice: {
                  major: 9000,
                  currencyCode: "USD",
                  __typename: "PriceRange",
                },
              },
            },
          },
        ],
      },
      ascending_artworks: {
        " $refType": null,
        edges: [
          {
            node: {
              listPrice: {
                minPrice: {
                  major: 10,
                  currencyCode: "USD",
                  __typename: "PriceRange",
                },
                maxPrice: {
                  major: 20,
                  currencyCode: "USD",
                  __typename: "PriceRange",
                },
              },
            },
          },
        ],
      },
      collectionDescription: "A fake descripton for collection",
      collectionURL: "A fake URL for collection",
      collectionName: "A fake name for collection",
    }
  })

  it("pass data into the component, and it correctly re-shows itself on ld-json", () => {
    const handledItems = getMaxMinPrice(
      props.descending_artworks,
      props.ascending_artworks
    )

    const expectedData = {
      "@context": "http://schema.org",
      "@type": "Product",
      name: "A name",
      description: "Some Description",
      url: "Some URL",
      offers: {
        "@type": "AggregateOffer",
        lowPrice: 10,
        highPrice: 9000,
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
              lowPrice: handledItems.min,
              highPrice: handledItems.max,
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
    expect(wrapper.html().includes("lowPrice" && "10")).toBe(true),
      expect(wrapper.html().includes("highPrice" && "9000")).toBe(true)
  })
})
