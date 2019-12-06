import { SeoProductsForCollections_ascending_artworks } from "__generated__/SeoProductsForCollections_ascending_artworks.graphql"
import { SeoProductsForCollections_descending_artworks } from "__generated__/SeoProductsForCollections_descending_artworks.graphql"
import { Product } from "Components/v2/Seo/Product"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { get } from "Utils/get"

export interface SeoProductsProps {
  descending_artworks: SeoProductsForCollections_descending_artworks
  ascending_artworks: SeoProductsForCollections_ascending_artworks
  collectionDescription: string
  collectionURL: string
  collectionName: string
}

export const getMaxMinPrice = (descending_artworks, ascending_artworks) => {
  const result = { min: null, max: null }
  if (!descending_artworks.edges[0].node.listPrice) return null
  switch (descending_artworks.edges[0].node.listPrice.__typename) {
    case "PriceRange":
      if (!descending_artworks.edges[0].node.listPrice.maxPrice) return null
      if (descending_artworks.edges[0].node.listPrice.maxPrice) {
        result.max = get(
          descending_artworks,
          p => p.edges[0].node.listPrice.maxPrice
        )
      }
    case "Money":
      if (!descending_artworks.edges[0].node.listPrice.major) return null
      if (descending_artworks.edges[0].node.listPrice.major) {
        result.max = get(
          descending_artworks,
          p => p.edges[0].node.listPrice.major
        )
      }
  }
  if (!ascending_artworks.edges[0].node.listPrice) return null
  switch (ascending_artworks.edges[0].node.listPrice.__typename) {
    case "PriceRange":
      if (!ascending_artworks.edge[0].node.listPrice.minPrice) return null
      if (ascending_artworks.edge[0].node.listPrice.minPrice) {
        result.min = get(
          ascending_artworks,
          p => p.edges[0].node.listPrice.minPrice
        )
      }
    case "Money":
      if (!ascending_artworks.edges[0].node.listPrice.major) return null
      if (ascending_artworks.edges[0].node.listPrice.major) {
        result.min = get(
          ascending_artworks,
          p => p.edges[0].node.listPrice.major
        )
      }
  }
  return result
}

export class SeoProducts extends React.Component<SeoProductsProps> {
  render() {
    const {
      descending_artworks,
      ascending_artworks,
      collectionDescription,
      collectionName,
      collectionURL,
    } = this.props
    console.log("hahaha", descending_artworks)
    const handledItems = getMaxMinPrice(descending_artworks, ascending_artworks)
    return (
      <>
        <Product
          data={{
            name: collectionName,
            description: collectionDescription,
            url: collectionURL,
            offers: {
              "@type": "AggregateOffer",
              lowPrice: handledItems.min,
              highPrice: handledItems.max,
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
            },
          }}
        />
      </>
    )
  }
}

export const SeoProductsForCollections = createFragmentContainer(SeoProducts, {
  descending_artworks: graphql`
    fragment SeoProductsForCollections_descending_artworks on FilterArtworksConnection {
      edges {
        node {
          id
          availability
          listPrice {
            __typename
            ... on PriceRange {
              minPrice {
                major
                currencyCode
              }
              maxPrice {
                major
                currencyCode
              }
            }
            ... on Money {
              major
              currencyCode
            }
          }
        }
      }
    }
  `,
  ascending_artworks: graphql`
    fragment SeoProductsForCollections_ascending_artworks on FilterArtworksConnection {
      edges {
        node {
          id
          availability
          listPrice {
            __typename
            ... on PriceRange {
              minPrice {
                major
                currencyCode
              }
              maxPrice {
                major
                currencyCode
              }
            }
            ... on Money {
              major
              currencyCode
            }
          }
        }
      }
    }
  `,
})
