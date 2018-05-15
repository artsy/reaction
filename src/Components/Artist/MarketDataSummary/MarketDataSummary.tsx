import { groupBy } from "lodash"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"

import { unica } from "Assets/Fonts"

const MarketDataSummaryContainer = styled.div`
  ${unica("s14")};
`

export interface MarketDataSummaryProps
  extends RelayProps,
    React.HTMLProps<MarketDataSummary> {}

const Categories = {
  "blue-chip": "Blue Chip",
  "top-established": "Top Established",
  "top-emerging": "Top Emerging",
}

export class MarketDataSummary extends React.Component<
  MarketDataSummaryProps,
  null
> {
  renderGalleryCategory(categorySlug, partnerCount) {
    let introSentence
    const category = Categories[categorySlug]
    if (partnerCount > 1) {
      introSentence = "Represented by " + category.toLowerCase() + " galleries"
    } else {
      introSentence = "Represented by a " + category.toLowerCase() + " gallery"
    }
    return <div>{introSentence}</div>
  }

  hasSections() {
    const { highlights, auctionResults, collections } = this.props.artist
    const { partners } = highlights

    // Is there a gallery representation section?
    if (partners && partners.edges && partners.edges.length > 0) {
      return true
    }

    // Is there an auction highlights section?
    if (
      auctionResults &&
      auctionResults.edges &&
      auctionResults.edges.length > 0
    ) {
      return true
    }

    // Is there a permanent collections section?
    if (collections && collections.length > 0) {
      return true
    }

    return false
  }

  // We group all partners that represent an artist by their relevant category, from the list above.
  // Display the highest category string for all the partners that represent the artist
  renderGalleryRepresentation() {
    const { highlights } = this.props.artist
    const { partners } = highlights
    if (partners && partners.edges && partners.edges.length > 0) {
      const groupedByCategory = groupBy(partners.edges, ({ node: partner }) => {
        let category
        Object.keys(Categories).forEach(key => {
          partner.categories.forEach(partnerCategory => {
            if (partnerCategory.id === key) {
              category = key
            }
          })
        })
        return category
      })

      const highestCategory = Object.keys(groupedByCategory)[0]
      return (
        <div>
          {this.renderGalleryCategory(
            highestCategory,
            groupedByCategory[highestCategory].length
          )}
        </div>
      )
    }
  }

  renderAuctionHighlight() {
    if (
      !this.props.artist.auctionResults ||
      this.props.artist.auctionResults.edges.length < 1
    ) {
      return null
    }
    const topAuctionResult = this.props.artist.auctionResults.edges[0].node
    return <div>{topAuctionResult.price_realized.display} auction record</div>
  }

  renderPermanentCollection() {
    const { collections } = this.props.artist
    if (!collections || collections.length === 0) {
      return null
    }
    if (collections.length === 1) {
      return <div>Collected by a major museum</div>
    }
    return <div>Collected by major museums</div>
  }

  render() {
    if (this.hasSections()) {
      return (
        <MarketDataSummaryContainer>
          {this.renderAuctionHighlight()}
          {this.renderGalleryRepresentation()}
          {this.renderPermanentCollection()}
        </MarketDataSummaryContainer>
      )
    }
    return null
  }
}

export default createFragmentContainer(
  MarketDataSummary,
  graphql`
    fragment MarketDataSummary_artist on Artist
      @argumentDefinitions(
        partner_category: {
          type: "[String]"
          defaultValue: ["blue-chip", "top-established", "top-emerging"]
        }
      ) {
      _id
      collections
      highlights {
        partners(
          first: 10
          display_on_partner_profile: true
          represented_by: true
          partner_category: $partner_category
        ) {
          edges {
            node {
              categories {
                id
              }
            }
          }
        }
      }
      auctionResults(
        recordsTrusted: true
        first: 1
        sort: PRICE_AND_DATE_DESC
      ) {
        edges {
          node {
            price_realized {
              display(format: "0a")
            }
          }
        }
      }
    }
  `
)

interface RelayProps {
  artist: {
    _id: string
    collections: string[] | null
    highlights: {
      partners: {
        edges: Array<{
          node: {
            categories: Array<{
              id: string
            }> | null
          } | null
        }> | null
      } | null
    } | null
    auctionResults: {
      edges: Array<{
        node: {
          price_realized: {
            display: string | null
          }
        } | null
      }> | null
    } | null
  }
}
