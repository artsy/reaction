import { trim } from "lodash"
import React from "react"

import { SeoDataForArtwork_artwork } from "__generated__/SeoDataForArtwork_artwork.graphql"
import { CreativeWork } from "Components/v2/Seo/CreativeWork"
import { Product } from "Components/v2/Seo/Product"
import { createFragmentContainer, graphql } from "react-relay"
import { get } from "Utils/get"

const { APP_URL } = process.env

interface SeoDataForArtworkProps {
  artwork: SeoDataForArtwork_artwork
}

export const AVAILABILITY = {
  "for sale": "https://schema.org/InStock",
  sold: "https://schema.org/OutOfStock",
}

export const SeoDataForArtwork: React.FC<SeoDataForArtworkProps> = ({
  artwork,
}) => {
  const artistsName = artwork.artist_names

  const dimensions = parseDimensions(get(artwork, a => a.dimensions.in))

  const artworkMetaData = {
    name: artwork.meta.title,
    image: get(artwork, a => a.meta_image.resized.url),
    description: get(artwork, a => a.meta.description),
    url: `${APP_URL}${artwork.href}`,
    ...dimensions,
    brand: {
      "@type": "Person",
      name: artistsName,
    },
  }

  if (artwork.partner.type === "Institution") {
    return <CreativeWork data={artworkMetaData} />
  }

  const ecommerceData = {
    category: artwork.category,
    productionDate: artwork.date,
    offers: {
      "@type": "Offer",
      ...displayPrice(artwork),
      priceCurrency: artwork.price_currency,
      availability: AVAILABILITY[artwork.availability],
      seller: {
        "@type": "ArtGallery",
        name: get(artwork, a => a.partner.name),
        image: get(artwork, a => a.partner.profile.image.resized.url),
      },
    },
  }

  return (
    <Product
      data={{
        ...artworkMetaData,
        ...ecommerceData,
      }}
    />
  )
}

export const SeoDataForArtworkFragmentContainer = createFragmentContainer(
  SeoDataForArtwork,
  {
    artwork: graphql`
      fragment SeoDataForArtwork_artwork on Artwork {
        href
        date
        is_price_hidden
        is_price_range
        price
        price_currency
        sale_message
        meta_image: image {
          resized(
            width: 640
            height: 640
            version: ["large", "medium", "tall"]
          ) {
            width
            height
            url
          }
        }
        meta {
          title
          description(limit: 155)
        }
        partner {
          name
          type
          profile {
            image {
              resized(width: 320, height: 320, version: ["medium"]) {
                url
              }
            }
          }
        }
        artist_names
        availability
        category
        dimensions {
          in
        }
      }
    `,
  }
)

const displayPrice = artwork => {
  const { is_price_hidden, is_price_range, price, sale_message } = artwork

  if (is_price_range && !is_price_hidden && price) {
    return splitPriceRange(price)
  }

  if (sale_message.includes("-")) {
    return splitPriceRange(sale_message)
  }

  return {
    price: sale_message,
  }
}

const splitPriceRange = priceRange => {
  const minAndMaxPrice = priceRange.split("-")
  return {
    minPrice: trim(minAndMaxPrice[0]).replace("$", ""),
    maxPrice: trim(minAndMaxPrice[1]),
  }
}

const parseDimensions = dimensionsAsString => {
  const segments = dimensionsAsString.replace(" in", "").split("×")

  if (segments.length === 2) {
    return {
      width: `${trim(segments[0])} in`,
      height: `${trim(segments[1])} in`,
    }
  }

  if (segments.length === 3) {
    return {
      width: `${trim(segments[0])} in`,
      height: `${trim(segments[1])} in`,
      depth: `${trim(segments[2])} in`,
    }
  }

  return {}
}
