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
                __typename: "PriceRange",
                minPrice: {
                  major: 8800,
                  currencyCode: "USD",
                },
                maxPrice: {
                  major: 9000,
                  currencyCode: "USD",
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
                __typename: "PriceRange",
                minPrice: {
                  major: 10,
                  currencyCode: "USD",
                },
                maxPrice: {
                  major: 20,
                  currencyCode: "USD",
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

  it("send data into the component, and it correctly re-shows itself on ld-json", () => {
    const handledItems = getMaxMinPrice(
      props.descending_artworks,
      props.ascending_artworks
    )
    console.log("hhh", handledItems.max)

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
    expect(wrapper.html().includes("lowPrice" && "12")).toBe(true),
      expect(wrapper.html().includes("highPrice" && "8000")).toBe(true)
  })
})
