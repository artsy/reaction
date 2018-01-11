import { groupBy, map } from "lodash"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"

import colors from "../../../Assets/Colors"
import { Fonts } from "../../Publishing/Fonts"
import TextLink from "../../TextLink"
import { Tooltip } from "../../Tooltip"

import { Help } from "../../../Assets/Icons/Help"

const MarketInsightsContainer = styled.div`
  ${Fonts.unica("s18", "medium")};
`

const SubHeadline = styled.div`
  font-size: 12px;
`

const FeedbackContainer = styled.div`
  color: ${colors.graySemibold};
  ${Fonts.unica("s10", "regular")};
`

const TooltipContainer = styled.div`
  display: inline-block;
  font-size: 12px;
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
        {introSentence}&nbsp;
        <TooltipContainer>
          <Tooltip message={categoryTooltipContent}>
            <span style={{ verticalAlign: "text-top" }}>
              <Help />
            </span>
          </Tooltip>
        </TooltipContainer>
        <SubHeadline>{galleryList}</SubHeadline>
      </div>
    )
  }

  hasSections() {
    const { highlights, auctionResults, collections } = this.props.artist
    const { partners } = highlights

    // Is there a gallery representation section?
    if (partners && partners.edges && partners.edges.length > 0) {
      return true
    }

    // Is there an auction highlights section?
    if (auctionResults && auctionResults.edges && auctionResults.edges.length > 0) {
      return true
    }

    // Is there a permanent collections section?
    if (collections && collections.length > 0) {
      return true
    }

    return false
  }

  // We group all partners that represent an artist by their relevant category, from the list above.
  // Assumption: these are mutually exclusive categories among a partner.
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
              <div key={categorySlug}>
                <div>{this.renderGalleryCategory(categorySlug, groupedByCategory[categorySlug])}</div>
                <br />
              </div>
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
        <div>
          {topAuctionResult.price_realized.display} auction record
          <SubHeadline>
            {topAuctionResult.organization} {topAuctionResult.sale_date}
          </SubHeadline>
        </div>
        <br />
      </div>
    )
  }

  renderPermanentCollection() {
    const { collections } = this.props.artist
    if (collections && collections.length > 0) {
      return (
        <div>
          <div>
            Collected by major museums
            <SubHeadline>{collections.join(", ")}</SubHeadline>
          </div>
          <br />
        </div>
      )
    }
  }

  renderFeedbackLine() {
    return (
      <FeedbackContainer>
        This is a new feature.&nbsp;
        <TextLink
          color={colors.graySemibold}
          underline
          href="mailto:productfeedback@artsy.net?subject=Feedback+on+%22About+the+Artist%22+information"
        >
          Tell us what you think.
        </TextLink>
      </FeedbackContainer>
    )
  }

  render() {
    return (
      <MarketInsightsContainer>
        {this.renderAuctionHighlight()}
        {this.renderGalleryRepresentation()}
        {this.renderPermanentCollection()}
        {this.hasSections() ? this.renderFeedbackLine() : null}
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
        partners(
          first: 10
          display_on_partner_profile: true
          represented_by: true
          partner_category: $partner_category
        ) {
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
      auctionResults(recordsTrusted: true, first: 1, sort: PRICE_AND_DATE_DESC) {
        edges {
          node {
            organization
            price_realized {
              display(format: "0a")
            }
            sale_date(format: "YYYY")
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
          sale_date: string | null
        } | null
      }> | null
    } | null
  }
}
