import { garamond, unica } from "Assets/Fonts"
import { map } from "lodash"
import PropTypes from "prop-types"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { ArtistToolTip_artist } from "../../../__generated__/ArtistToolTip_artist.graphql"
import fillwidthDimensions from "../../../Utils/fillwidth"
import { track } from "../../../Utils/track"
import MarketDataSummary, {
  MarketDataSummaryContainer,
} from "../../Artist/MarketDataSummary/MarketDataSummary"
import FollowArtistButton from "../../FollowButton/FollowArtistButton"
import { FollowTrackingData } from "../../FollowButton/Typings"
import { ToolTipDescription } from "./Components/Description"
import { NewFeature } from "./Components/NewFeature"

export interface ArtistToolTipProps {
  showMarketData?: boolean
  artist: ArtistToolTip_artist
  tracking?: any
}

export class ArtistToolTip extends React.Component<ArtistToolTipProps> {
  static contextTypes = {
    tooltipsData: PropTypes.object,
    onOpenAuthModal: PropTypes.func,
  }

  trackClick = () => {
    const { tracking } = this.props
    const { href } = this.props.artist

    tracking.trackEvent({
      action: "Click",
      flow: "tooltip",
      type: "artist stub",
      context_module: "intext tooltip",
      destination_path: href,
    })
  }

  renderArtistGenes = () => {
    const { genes } = this.props.artist

    if (genes.length) {
      return map(genes, "name").join(", ")
    }
  }

  render() {
    const { showMarketData, artist } = this.props
    const {
      blurb,
      carousel,
      formatted_nationality_and_birthday,
      href,
      id,
      _id,
      name,
    } = artist
    const {
      tooltipsData: { artists },
      onOpenAuthModal,
    } = this.context
    const displayImages = map(carousel.images.slice(0, 2), "resized")

    const images = fillwidthDimensions(displayImages, 320, 15, 150)

    const trackingData: FollowTrackingData = {
      context_module: "intext tooltip",
      entity_id: _id,
      entity_slug: id,
      entity_type: "artist",
    }

    return (
      <Wrapper>
        <ArtistContainer>
          {images && (
            <Images href={href} onClick={this.trackClick}>
              {images.map((img, i) => (
                <div key={i}>
                  <img src={img.__id} />
                </div>
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
              onOpenAuthModal={onOpenAuthModal}
            />
          </Header>

          <a href={href} target="_blank" onClick={this.trackClick}>
            {showMarketData ? (
              <MarketDataSummary
                artist={artists[id] as any}
                onEmptyText={this.renderArtistGenes()}
              />
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
  ${MarketDataSummaryContainer} {
    ${unica("s12")};
    padding-bottom: 10px;
  }
`

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 10px;
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
  div:first-child {
    margin-right: 15px;
  }
  img {
    width: 100%;
    height: auto;
  }
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
        genes {
          name
        }
      }
    `
  )
)
