// tslint:enable:no-switch-case-fall-through

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

export const getMaxMinPrice = (
  descending_artworks: SeoProductsForCollections_descending_artworks,
  ascending_artworks: SeoProductsForCollections_ascending_artworks
) => {
  const leastExpensive = getLeastExpensivePrice(
    ascending_artworks.edges[0].node.listPrice
  )
  const mostExpensive = getMostExpensivePrice(
    descending_artworks.edges[0].node.listPrice
  )

  return {
    min: leastExpensive || mostExpensive,
    max: mostExpensive || leastExpensive,
  }
}

const getLeastExpensivePrice = (listPrice: any) => {
  if (!listPrice) return null
  switch (listPrice.__typename) {
    case "PriceRange":
      return get(listPrice, x => x.minPrice.major)
    case "Money":
      return get(listPrice, x => x.major)
  }
}

const getMostExpensivePrice = (listPrice: any) => {
  if (!listPrice) return null
  switch (listPrice.__typename) {
    case "PriceRange":
      return get(listPrice, x => x.maxPrice.major)
    case "Money":
      return get(listPrice, x => x.major)
  }
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
                major(convertTo: "USD")
                currencyCode
              }
              maxPrice {
                major(convertTo: "USD")
                currencyCode
              }
            }
            ... on Money {
              major(convertTo: "USD")
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
                major(convertTo: "USD")
                currencyCode
              }
              maxPrice {
                major(convertTo: "USD")
                currencyCode
              }
            }
            ... on Money {
              major(convertTo: "USD")
              currencyCode
            }
          }
        }
      }
    }
  `,
})
