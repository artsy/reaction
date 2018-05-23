import styled from "styled-components"
import PropTypes from "prop-types"
import React from "react"
import { map } from "lodash"
import { createFragmentContainer, graphql } from "react-relay"
import fillwidthDimensions from "../../../Utils/fillwidth"
import { garamond, unica } from "Assets/Fonts"
import { ArtistToolTip_artist } from "../../../__generated__/ArtistToolTip_artist.graphql"
import { NewFeature } from "./Components/NewFeature"
import { ToolTipDescription } from "./Components/Description"
import FollowArtistButton from "../../FollowButton/FollowArtistButton"
import MarketDataSummary, {
  MarketDataSummaryContainer,
} from "../../Artist/MarketDataSummary/MarketDataSummary"

export interface ArtistToolTipProps {
  showMarketData?: boolean
  artist: ArtistToolTip_artist
}

export const ArtistToolTip: React.SFC<ArtistToolTipProps> = (
  props,
  context
) => {
  const {
    blurb,
    carousel,
    formatted_nationality_and_birthday,
    href,
    id,
    name,
  } = props.artist
  const { showMarketData } = props
  const displayImages = map(carousel.images.slice(0, 2), "resized")
  const images = fillwidthDimensions(displayImages, 320, 15, 150)
  const { artists } = context.tooltipsData
  const { onOpenAuthModal } = context

  return (
    <Wrapper>
      <ArtistContainer>
        {images && (
          <Images href={href}>
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
          <TitleDate href={href} target="_blank">
            <Title>{name}</Title>
            {formatted_nationality_and_birthday && (
              <Date>{formatted_nationality_and_birthday}</Date>
            )}
          </TitleDate>
          <FollowArtistButton
            artist={artists[id] as any}
            onOpenAuthModal={onOpenAuthModal}
          />
        </Header>

        <a href={href} target="_blank">
          {showMarketData ? (
            <MarketDataSummary artist={artists[id] as any} showGenes />
          ) : (
            blurb && <ToolTipDescription text={blurb} />
          )}
        </a>
      </ArtistContainer>

      <NewFeature />
    </Wrapper>
  )
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
    padding: 10px 0;
  }
`

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const TitleDate = styled.a`
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

export const ArtistTooltipContainer = createFragmentContainer(
  ArtistToolTip,
  graphql`
    fragment ArtistToolTip_artist on Artist {
      name
      id
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
    }
  `
)

ArtistToolTip.contextTypes = {
  tooltipsData: PropTypes.object,
  onOpenAuthModal: PropTypes.func,
}
