import { Box, color, Flex, Link, Sans, Serif } from "@artsy/palette"
import { ArtistSeriesEntity_member } from "__generated__/ArtistSeriesEntity_member.graphql"
import currency from "currency.js"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import styled from "styled-components"
import { get } from "Utils/get"

export interface ArtistSeriesEntityProps {
  member: ArtistSeriesEntity_member
}

export const ArtistSeriesEntity: React.FC<ArtistSeriesEntityProps> = ({
  member,
}) => {
  const {
    headerImage,
    artworks: { hits },
    price_guidance,
    slug,
    title,
  } = member
  const bgImages = hits.map(hit => hit.image.url)
  const imageSize =
    bgImages.length === 1 ? 265 : bgImages.length === 2 ? 131 : 85
  return (
    <Container p={0.5} m={0.5}>
      <StyledLink href={`${sd.APP_URL}/collection/${slug}`}>
        <ImgWrapper pb={1}>
          {bgImages.length ? (
            bgImages.map((url, i) => {
              const artistName = get(hits[i].artist, a => a.name)
              const alt = `${artistName ? artistName + ", " : ""}${
                hits[i].title
              }`
              return (
                <SingleImgContainer key={i}>
                  <ImgOverlay width={imageSize} />
                  <ArtworkImage key={i} src={url} width={imageSize} alt={alt} />
                </SingleImgContainer>
              )
            })
          ) : (
            <ArtworkImage src={headerImage} width={265} />
          )}
        </ImgWrapper>
        {<CollectionTitle size="3">{title}</CollectionTitle>}
        {price_guidance && (
          <Sans size="2" color="black60">
            From $
            {currency(price_guidance, {
              separator: ",",
              precision: 0,
            }).format()}
          </Sans>
        )}
      </StyledLink>
    </Container>
  )
}

export const ArtworkImage = styled.img<{ width: number }>`
  width: ${({ width }) => width}px;
  height: 125px;
  background-color: ${color("black10")};
  object-fit: cover;
  object-position: center;
  opacity: 0.9;
`

const ImgOverlay = styled(Box)<{ width: number }>`
  height: 125px;
  background-color: ${color("black30")};
  opacity: 0.1;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 7;
`

const Container = styled(Box)`
  border: 1px solid ${color("black10")};
`

const SingleImgContainer = styled(Box)`
  position: relative;
  margin-right: 2px;

  &:last-child {
    margin-right: 0;
  }
`

const CollectionTitle = styled(Serif)`
  width: max-content;
`

export const ImgWrapper = styled(Flex)`
  width: 265px;
`

export const StyledLink = styled(Link)`
  text-decoration: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  &:hover {
    text-decoration: none;

    ${CollectionTitle} {
      text-decoration: underline;
    }
  }
`

export const ArtistSeriesRailContainer = createFragmentContainer(
  ArtistSeriesEntity,
  {
    member: graphql`
      fragment ArtistSeriesEntity_member on MarketingCollection {
        slug
        headerImage
        thumbnail
        title
        price_guidance
        artworks(size: 3, sort: "-decayed_merch") {
          hits {
            artist {
              name
            }
            title
            image {
              url(version: "small")
            }
          }
        }
      }
    `,
  }
)
