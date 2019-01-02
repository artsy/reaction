import { BorderBox, Box, Flex, Sans } from "@artsy/palette"
import { SelectedCareerAchievementsArtistPage_artist } from "__generated__/SelectedCareerAchievementsArtistPage_artist.graphql"
import {
  hasSections,
  highestCategory,
} from "Components/Artist/MarketInsights/MarketInsights"

import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistInsight } from "Styleguide/Components/ArtistInsight"
import { ArtistInsightsModal } from "Styleguide/Components/ArtistInsightsModal"

export interface SelectedCareerAchievementsProps {
  artist: SelectedCareerAchievementsArtistPage_artist
  border?: boolean
  Container?: (props: { children: JSX.Element }) => JSX.Element
}

const CATEGORIES = {
  "blue-chip": "Blue chip",
  "top-established": "Established",
  "top-emerging": "Emerging",
}
const CATEGORY_LABEL_MAP = {
  "blue-chip": "Represented by internationally reputable galleries.",
  "top-established": "Represented by industry leading galleries.",
  "top-emerging": "Represented by up-and-coming galleries.",
}

export class SelectedCareerAchievements extends React.Component<
  SelectedCareerAchievementsProps
> {
  static defaultProps = {
    border: true,
  }

  state = {
    showModal: false,
  }

  renderAuctionHighlight() {
    if (
      !this.props.artist.auctionResults ||
      this.props.artist.auctionResults.edges.length < 1
    ) {
      return null
    }
    const topAuctionResult = this.props.artist.auctionResults.edges[0].node
    const display = `${topAuctionResult.price_realized.display}, ${
      topAuctionResult.organization
    }, ${topAuctionResult.sale_date}`

    return (
      <ArtistInsight
        type="HIGH_AUCTION"
        label="High auction record"
        value={display}
      />
    )
  }
  renderGalleryRepresentation() {
    const { highlights } = this.props.artist
    const { partners } = highlights
    if (partners && partners.edges && partners.edges.length > 0) {
      const highCategory = highestCategory(partners.edges)

      return (
        <ArtistInsight
          type={highCategory.toUpperCase().replace("-", "_")}
          label={CATEGORIES[highCategory]}
          value={CATEGORY_LABEL_MAP[highCategory]}
        />
      )
    }
  }

  renderInsight(insight) {
    return (
      <ArtistInsight
        type={insight.type}
        label={insight.label}
        entities={insight.entities}
      />
    )
  }

  render() {
    console.log(this.props)
    if (!hasSections(this.props.artist)) {
      return null
    }

    const Container = props => {
      let Wrap
      if (props.Container) {
        Wrap = this.props.Container
      } else if (this.props.border) {
        Wrap = BorderBox
      } else {
        Wrap = Box
      }

      return <Wrap {...props} />
    }

    return (
      <>
        <Container>
          <Flex flexDirection="column" alignItems="left">
            <Sans size="2" weight="medium">
              Selected Career Achievements
            </Sans>
            <Flex flexDirection="row" alignItems="left" flexWrap="wrap">
              {this.renderGalleryRepresentation()}
              {this.renderAuctionHighlight()}

              {this.props.artist.insights.map(insight => {
                return this.renderInsight(insight)
              })}
            </Flex>
          </Flex>
        </Container>

        <ArtistInsightsModal />

        {this.props.children}
      </>
    )
  }
}

export const SelectedCareerAchievementsFragmentContainer = createFragmentContainer(
  SelectedCareerAchievements,
  graphql`
    fragment SelectedCareerAchievementsArtistPage_artist on Artist
      @argumentDefinitions(
        partner_category: {
          type: "[String]"
          defaultValue: ["blue-chip", "top-established", "top-emerging"]
        }
      ) {
      _id
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
      insights {
        type
        label
        entities
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
            organization
            sale_date(format: "YYYY")
          }
        }
      }
    }
  `
)
