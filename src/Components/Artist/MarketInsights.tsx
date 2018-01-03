import { groupBy, map } from "lodash"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"

import colors from "../../Assets/Colors"
import * as fonts from "../../Assets/Fonts"
import TextLink from "../TextLink"
import Tooltip from "../Tooltip"

const MarketInsightsContainer = styled.div`
  font-family: ${fonts.secondary.fontFamily};
`

const SubHeadline = styled.div`
  font-size: 14px;
`

const FeedbackContainer = styled.div`
  color: ${colors.graySemibold};
`

export interface MarketInsightsProps extends RelayProps, React.HTMLProps<MarketInsights> {}

const Categories = {
  "blue-chip": "Blue Chip",
  "top-established": "Top Established",
  "top-emerging": "Top Emerging",
}

const CategoryTooltipContent = {
  "blue-chip": "Blue chip galleries have multiple locations internationally and participate in major art fairs.",
  "top-established": "Top established galleries have been industry leaders in their region or specialty for decades.",
  "top-emerging": "Top emerging dealers participate in curated, up-and-coming art fairs.",
}

export class MarketInsights extends React.Component<MarketInsightsProps, null> {
  renderGalleryCategory(categorySlug, partnerList) {
    let introSentence
    const category = Categories[categorySlug]
    const categoryTooltipContent = CategoryTooltipContent[categorySlug]
    if (partnerList.length > 1) {
      introSentence = "Represented by " + category.toLowerCase() + " galleries"
    } else {
      introSentence = "Represented by a " + category.toLowerCase() + " gallery"
    }

    const galleryList = map(partnerList, ({ node: partner }) => partner.name).join(", ")

    return (
      <div>
        {introSentence}
        <Tooltip message={categoryTooltipContent} />
        <SubHeadline>{galleryList}</SubHeadline>
      </div>
    )
  }

  // We group all partners that represent an artist by their relevant one, from Categories above.
  // These are mutually exclusive among a partner.
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

      return (
        <div>
          {Object.keys(groupedByCategory).map(categorySlug => {
            return (
              <div key={categorySlug}>{this.renderGalleryCategory(categorySlug, groupedByCategory[categorySlug])}</div>
            )
          })}
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
        {topAuctionResult.price_realized.display} auction record
        <SubHeadline>
          {topAuctionResult.organization} {topAuctionResult.date}
        </SubHeadline>
      </div>
    )
  }

  renderPermanentCollection() {
    const { collections } = this.props.artist
    if (collections && collections.length > 0) {
      return (
        <div>
          Collected by major museums
          <SubHeadline>{collections.join(", ")}</SubHeadline>
        </div>
      )
    }
  }

  renderFeedbackLine() {
    return (
      <FeedbackContainer>
        This is a new feature.&nbsp;
        <TextLink underline href="mailto:support@artsymail.com">
          Tell us what you think.
        </TextLink>
      </FeedbackContainer>
    )
  }

  render() {
    return (
      <MarketInsightsContainer>
        {this.renderGalleryRepresentation()}
        <br />
        {this.renderAuctionHighlight()}
        <br />
        {this.renderPermanentCollection()}
        <br />
        {this.renderFeedbackLine()}
      </MarketInsightsContainer>
    )
  }
}

export default createFragmentContainer(
  MarketInsights,
  graphql.experimental`
    fragment MarketInsights_artist on Artist
      @argumentDefinitions(
        partner_category: { type: "[String]", defaultValue: ["blue-chip", "top-established", "top-emerging"] }
      ) {
      _id
      collections
      highlights {
        partners(first: 10, represented_by: true, partner_category: $partner_category) {
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
            price_realized {
              display
            }
            date(format: "YYYY")
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
          price_realized: {
            display: string | null
          }
          date: string | null
        } | null
      }> | null
    } | null
  }
}
