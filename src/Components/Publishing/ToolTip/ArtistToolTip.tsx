import styled from "styled-components"
import PropTypes from "prop-types"
import React from "react"
import { map } from "lodash"
import { createFragmentContainer, graphql } from "react-relay"
import fillwidthDimensions from "../../../Utils/fillwidth"
import { track } from "../../../Utils/track"
import { garamond, unica } from "Assets/Fonts"
import { ArtistMarketData } from "./Components/ArtistMarketData"
import { ArtistToolTip_artist } from "../../../__generated__/ArtistToolTip_artist.graphql"
import { NewFeature } from "./Components/NewFeature"
import { ToolTipDescription } from "./Components/Description"
import FollowArtistButton from "../../FollowButton/FollowArtistButton"

export interface ArtistToolTipProps {
  showMarketData?: boolean
  artist: ArtistToolTip_artist
  tracking?: any
}

export class ArtistToolTip extends React.Component<ArtistToolTipProps> {
  static contextTypes = {
    tooltipsData: PropTypes.object,
  }

  trackClick = () => {
    const { tracking } = this.props
    const { href } = this.props.artist

    tracking.trackEvent({
      action: "Click",
      type: "intext_tooltip",
      context_module: "tooltip",
      destination_path: href,
    })
  }

  render() {
    const {
      blurb,
      carousel,
      formatted_nationality_and_birthday,
      href,
      id,
      name,
    } = this.props.artist
    const { showMarketData, artist } = this.props
    const { artists } = this.context.tooltipsData
    const displayImages = map(carousel.images.slice(0, 2), "resized")
    const images = fillwidthDimensions(displayImages, 320, 15, 150)

    const trackingData = {
      context_module: "tooltip",
      tooltip_entity_id: id,
      tooltip_entity_slug: href,
    }

    return (
      <Wrapper>
        <ArtistContainer>
          {images && (
            <Images href={href} onClick={this.trackClick}>
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img.__id}
                  width={img.width}
                  height={img.height}
                />
              ))}
            </Images>
          )}

          <Header>
            <TitleDate href={href} target="_blank" onClick={this.trackClick}>
              <Title>{name}</Title>
              {formatted_nationality_and_birthday && (
                <Date>{formatted_nationality_and_birthday}</Date>
              )}
            </TitleDate>
            <FollowArtistButton
              artist={artists[id] as any}
              trackingData={trackingData}
            />
          </Header>

          <a href={href} target="_blank" onClick={this.trackClick}>
            {showMarketData ? (
              <ArtistMarketData artist={artist} />
            ) : (
              blurb && <ToolTipDescription text={blurb} />
            )}
          </a>
        </ArtistContainer>

        <NewFeature />
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  width: 320px;
`

export const ArtistContainer = styled.div`
  position: relative;
  a {
    text-decoration: none;
    color: black;
    &:hover {
      color: black;
    }
  }
`

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const TitleDate = styled.a`
  display: flex;
  flex-direction: column;
`

const Title = styled.div`
  ${garamond("s18")};
  font-weight: 600;
`

const Date = styled.div`
  ${unica("s14", "medium")};
`

const Images = styled.a`
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
`

export const ArtistTooltipContainer = track()(
  createFragmentContainer(
    ArtistToolTip,
    graphql`
      fragment ArtistToolTip_artist on Artist {
        name
        id
        _id
        formatted_nationality_and_birthday
        href
        blurb
        carousel {
          images {
            resized(height: 200) {
              url
              width
              height
            }
          }
        }
        collections
        highlights {
          partners(
            first: 5
            display_on_partner_profile: true
            represented_by: true
            partner_category: ["blue-chip", "top-established", "top-emerging"]
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
                display
              }
            }
          }
        }
        genes {
          name
        }
      }
    `
  )
)
