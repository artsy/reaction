import { SeoProductsForCollections_ascending_artworks } from "__generated__/SeoProductsForCollections_ascending_artworks.graphql"
import { SeoProductsForCollections_descending_artworks } from "__generated__/SeoProductsForCollections_descending_artworks.graphql"
import { mount } from "enzyme"
import React from "react"
import { HeadProvider } from "react-head"
import { SeoProductsForCollections } from "../SeoProductsForCollections"

describe("Seo Products for Collection Page", () => {
  let props
  beforeEach(() => {
    props = {
      descending_artworks: {
        " $refType": null,
        edges: [
          {
            node: {
              id: "1",
              availability: "yes",
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
      } as SeoProductsForCollections_descending_artworks,
      ascending_artworks: {
        " $refType": null,
        edges: [
          {
            node: {
              id: "2",
              availability: "yes",
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
      } as SeoProductsForCollections_ascending_artworks,
      collectionDescription: "A fake description for collection",
      collectionURL: "A fake URL for collection",
      collectionName: "A fake name for collection",
    }
  })

  it("pass data into the component, and it correctly re-shows itself on ld-json", () => {
    const wrapper = mount(
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
    const html = wrapper.html()
    expect(html).toContain('"name":"A fake name for collection"')
    expect(html).toContain('"lowPrice":10')
    expect(html).toContain('"highPrice":9000')
  })
})
