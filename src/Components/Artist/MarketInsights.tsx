import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"

export interface MarketInsightsProps extends RelayProps, React.HTMLProps<MarketInsights> {}

const Categories = {
  "blue-chip": "Blue Chip",
  "top-established": "Top Established",
  "top-emerging": "Top Emerging",
}

export class MarketInsights extends React.Component<MarketInsightsProps, null> {
  renderGalleryRepresentation() {
    const { highlights } = this.props.artist
    const { partners } = highlights
    if (partners && partners.edges && partners.edges.length > 0) {
      const partner = partners.edges[0].node
      const { categories } = partner
      let category
      Object.keys(Categories).forEach(key => {
        categories.forEach(partnerCategory => {
          if (partnerCategory.id === key) {
            category = Categories[key]
          }
        })
      })
      return (
        <div>
          Represented by {partner.name}
          <br />
          This is a {category} type of partner.
        </div>
      )
    }
  }

  renderAuctionHighlight() {
    if (!this.props.artist.auctionResults || this.props.artist.auctionResults.edges.length < 1) {
      return null
    }
    const topAuctionResult = this.props.artist.auctionResults.edges[0].node

    return (
      <div>
        Top auction result is {topAuctionResult.price_realized} at {topAuctionResult.organization}
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderGalleryRepresentation()}
        <br />
        {this.renderAuctionHighlight()}
      </div>
    )
  }
}

export default createFragmentContainer(
  MarketInsights,
  graphql.experimental`
    fragment MarketInsights_artist on Artist {
      _id
      highlights {
        partners(first: 1, represented_by: true, partner_category: ["blue-chip", "top-established", "top-emerging"]) {
          edges {
            node {
              name
              categories {
                id
                name
              }
            }
          }
        }
      }
      auctionResults(first: 1, sort: PRICE_AND_DATE_DESC) {
        edges {
          node {
            organization
            price_realized(symbol: "$")
          }
        }
      }
    }
  `
)

interface RelayProps {
  artist: {
    _id: string
    highlights: {
      partners: {
        edges: Array<{
          node: {
            name: string | null
            categories: Array<{
              id: string
              name: string | null
            }> | null
          } | null
        }> | null
      } | null
    } | null
    auctionResults: {
      edges: Array<{
        node: {
          organization: string | null
          price_realized: string | null
        } | null
      }> | null
    } | null
  }
}
