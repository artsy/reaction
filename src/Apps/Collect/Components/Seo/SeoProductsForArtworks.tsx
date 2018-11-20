import currency from "currency.js"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { toSentence } from "underscore.string"

import { SeoProductsForArtworks_artworks } from "__generated__/SeoProductsForArtworks_artworks.graphql"
import { get } from "Utils/get"
import { Product } from "./Product"

const { APP_URL } = process.env

const AVAILABILITY = {
  "for sale": "https://schema.org/InStock",
  sold: "https://schema.org/OutOfStock",
}

const formatCurrency = value => currency(value, { separator: "" }).format()

interface SeoProductsProps {
  artworks: SeoProductsForArtworks_artworks
}

export class SeoProducts extends React.Component<SeoProductsProps> {
  render() {
    const {
      artworks: { artworks_connection },
    } = this.props

    // here the filtering is necessary so we can re-use the artwork list shown in the page (could include
    // non-acquireable artworks) without making an extra request. Also, seller image is a required field
    // so excluding those that don't have `partner.profile.icon.url`.
    const artworksForSeoProduct = artworks_connection.edges.filter(edge => {
      return get(
        edge,
        e => e.node.is_acquireable && e.node.partner.profile.icon.url
      )
    })

    return artworksForSeoProduct.map(({ node }, index) => {
      const { artists, is_price_range, partner, price } = node
      const location = partner.locations && partner.locations[0]
      const artistsName = artists
        ? toSentence(node.artists.map(({ name }) => name))
        : null
      const isInstitution = partner.type === "Institution"

      return (
        <Product
          key={node.__id}
          data={{
            name: node.title,
            image: node.image.url,
            description: node.meta && node.meta.description,
            url: `${APP_URL}${node.href}`,
            brand: {
              "@type": "Person",
              name: artistsName,
            },
            ...(isInstitution
              ? {}
              : {
                  category: node.category,
                  productionDate: node.date,
                  offers: {
                    "@type": "Offer",
                    price: !is_price_range
                      ? formatCurrency(price)
                      : {
                          minPrice: formatCurrency(price.split("-")[0]),
                          maxPrice: formatCurrency(price.split("-")[1]),
                        },
                    priceCurrency: node.price_currency,
                    availability: AVAILABILITY[node.availability],
                    seller: {
                      "@type": "ArtGallery",
                      name: partner.name,
                      image: partner.profile.icon.url,
                      address: location
                        ? [
                            location.address,
                            location.address_2,
                            location.city,
                            location.state,
                            location.country,
                            location.postal_code,
                          ]
                            .filter(Boolean)
                            .join(", ")
                        : null,
                      telephone: location ? location.phone : null,
                    },
                  },
                }),
          }}
        />
      )
    })
  }
}

export const SeoProductsForArtworks = createFragmentContainer(SeoProducts, {
  artworks: graphql`
    fragment SeoProductsForArtworks_artworks on FilterArtworks
      @argumentDefinitions(
        first: { type: "Int", defaultValue: 30 }
        after: { type: "String", defaultValue: "" }
      ) {
      artworks_connection(first: $first, after: $after) {
        edges {
          node {
            __id
            availability
            category
            date
            href
            is_acquireable
            is_price_range
            price
            price_currency
            title
            artists {
              name
            }
            image {
              url(version: "larger")
            }
            meta {
              description
            }
            partner(shallow: true) {
              name
              type
              profile {
                icon {
                  url(version: "larger")
                }
              }
              locations(size: 1) {
                address
                address_2
                city
                state
                country
                postal_code
                phone
              }
            }
          }
        }
      }
    }
  `,
})
