import { Box, color, Flex, Sans, Serif } from "@artsy/palette"
import { ArtistSeriesEntity_member } from "__generated__/ArtistSeriesEntity_member.graphql"
import { RouterLink } from "Artsy/Router/RouterLink"
import currency from "currency.js"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
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
    bgImages.length === 1 ? 221 : bgImages.length === 2 ? 109 : 72
  return (
    <Container px={2} pt={2} pb={2} m={1}>
      <StyledLink to={`/collection/${slug}`}>
        <ImgWrapper>
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
            <ArtworkImage src={headerImage} width={221} />
          )}
        </ImgWrapper>
        {
          <CollectionTitle pt={1} pb={0.5} size="3">
            {title}
          </CollectionTitle>
        }
        {price_guidance && (
          <Sans size="2" color="black60" pb={1}>
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

export const Container = styled(Box)`
  border: 1px solid ${color("black10")};
  border-radius: 2px;
  &:hover {
    text-decoration: none;
    border: 1px solid ${color("black60")};
  }
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
  width: 221px;
`

export const StyledLink = styled(RouterLink)`
  text-decoration: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  &:hover {
    text-decoration: none;
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
