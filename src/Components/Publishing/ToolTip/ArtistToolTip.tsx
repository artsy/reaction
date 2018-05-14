import styled from "styled-components"
import PropTypes from "prop-types"
import React from "react"
import { map } from "lodash"
import { createFragmentContainer, graphql } from "react-relay"
import fillwidthDimensions from "../../../Utils/fillwidth"
import { garamond, unica } from "Assets/Fonts"
import { ArtistMarketData } from "./Components/ArtistMarketData"
import { ArtistToolTip_artist } from "../../../__generated__/ArtistToolTip_artist.graphql"
import { NewFeature } from "./Components/NewFeature"
import { ToolTipDescription } from "./Components/Description"
import FollowArtistButton from "../../FollowButton/FollowArtistButton"

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
          <TitleDate href={href}>
            <Title>{name}</Title>
            {formatted_nationality_and_birthday && (
              <Date>{formatted_nationality_and_birthday}</Date>
            )}
          </TitleDate>
          <FollowArtistButton artist={artists[id] as any} />
        </Header>

        <a href={href}>
          {showMarketData ? (
            <ArtistMarketData artist={props.artist} />
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

ArtistToolTip.contextTypes = {
  tooltipsData: PropTypes.object,
}
