// import { SeoProductsForCollections_descending_artworks } from "__generated__/SeoProductsForCollections_descending_artworks.graphql"
// import { Product } from "Components/v2/Seo/Product"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { get } from "Utils/get"

export interface SeoProductsProps {
  artworks: any
  collectionDescription: string
  collectionURL: string
  collectionName: string
}

// dont have anything about currency conversion in Artsy right now.
// Just use the fixed ratio to show the approximated price.
export function simpleConversionToUSD(price: number, currencyCode: string) {
  if (currencyCode === "USD") {
    return price
  } else if (currencyCode === "GBP") {
    return price * 1.28
  } else if (currencyCode === "EUR") return price * 1.1
}

export const getMaxMinPrice = priceableArtworks => {
  const priceRange = { min: Number.MAX_VALUE, max: Number.MIN_VALUE }
  priceableArtworks.map(artwork => {
    if (artwork.node.is_price_range && artwork.node.listPrice) {
      const maxPrice = get(artwork, p => p.node.listPrice.maxPrice)
      const minPrice = get(artwork, p => p.node.listPrice.minPrice)
      const convertedPrice = {
        maxPrice: simpleConversionToUSD(maxPrice.major, maxPrice.currencyCode),
        minPrice: simpleConversionToUSD(minPrice.major, minPrice.currencyCode),
      }
      if (priceRange.max < convertedPrice.maxPrice)
        priceRange.max = convertedPrice.maxPrice
      if (priceRange.min > convertedPrice.minPrice)
        priceRange.min = convertedPrice.minPrice
    } else if (artwork.node.listPrice && artwork.node.listPrice.major) {
      const convertedPrice = simpleConversionToUSD(
        artwork.node.listPrice.major,
        artwork.node.listPrice.currencyCode
      )
      if (convertedPrice > priceRange.max) priceRange.max = convertedPrice
      if (convertedPrice < priceRange.min) priceRange.min = convertedPrice
    }
  })
  return priceRange
}

// export const getFilteredArtworks = artworks => {
//   console.log("showme", artworks)
//   const filtedWorks = artworks.edges.filter(edge => {
//     return (
//       edge.node.listPrice &&
//       edge.node.sale_message !== "Contact For Price" &&
//       edge.node.sale_message !== "Sold"
//     )
//   })
//   return filtedWorks
// }

export class SeoProducts extends React.Component<SeoProductsProps> {
  render() {
    const {
      artworks,
      // collectionDescription,
      // collectionName,
      // collectionURL,
    } = this.props
    console.log(artworks)
    // const priceAbleArtworks = getFilteredArtworks(artworks)
    return (
      <>
        {/*
        <Product
          data={{
            name: collectionName,
            description: collectionDescription,
            url: collectionURL,
            offers: {
              "@type": "AggregateOffer",
              lowPrice: getMaxMinPrice(priceAbleArtworks).min,
              highPrice: getMaxMinPrice(priceAbleArtworks).max,
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
            },
          }}
        />
        */}
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
          sale_message: saleMessage
          availability
          is_price_range: isPriceRange
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
