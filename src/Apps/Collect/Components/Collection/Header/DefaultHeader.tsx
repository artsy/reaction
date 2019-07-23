import { Box, color, Image } from "@artsy/palette"
import { DefaultHeader_headerArtworks } from "__generated__/DefaultHeader_headerArtworks.graphql"
import React, { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"

interface Props {
  headerArtworks: DefaultHeader_headerArtworks
}
export const CollectionDefaultHeader: FC<Props> = ({ headerArtworks }) => {
  const { hits: artworks } = headerArtworks

  if (!artworks) {
    return null
  }

  return (
    <header>
      <DefaultBanner>
        {artworks.map((artwork, i) => {
          return <Image width="153px" height="220px" src={artwork.imageUrl} />
        })}
      </DefaultBanner>
      <DefaultBannerOverlay />
    </header>
  )
}

export const CollectionDefaultHeaderFragmentContainer = createFragmentContainer(
  CollectionDefaultHeader,
  {
    headerArtworks: graphql`
      fragment DefaultHeader_headerArtworks on FilterArtworks {
        hits {
          id
          imageUrl
        }
      }
    `,
  }
)

const DefaultBanner = styled(Box)`
  height: 250px;
  width: 100vw;
  margin-left: -50vw;
  margin-right: -50vw;
  left: 50%;
  right: 50%;
  position: relative;
`

const DefaultBannerOverlay = styled(Box)`
  color: ${color("black100")};
  height: 250px;
  width: 100vw;
  margin-left: -50vw;
  margin-right: -50vw;
  left: 50%;
  right: 50%;
  position: relative;
  z-index: 1;
`
