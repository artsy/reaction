import React from "react"
import { get } from "Utils/get"

import { Box, Flex, Image, Link, Serif, space } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"

import { PreviewGridItem_artwork } from "__generated__/PreviewGridItem_artwork.graphql"
import styled from "styled-components"

interface PreviewGridItemProps {
  artwork: PreviewGridItem_artwork
  emphasizeArtist?: boolean
}

const Title = styled(Serif).attrs({ size: "2", italic: true })`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: ${space(12)}px;
`

export const PreviewGridItem: React.SFC<PreviewGridItemProps> = ({
  artwork,
  emphasizeArtist,
}) => {
  const imageUrl = get(artwork, x => x.image.cropped.url, "")
  return (
    <Flex mr={`${space(2)}px`} mb={`${space(2)}px`}>
      <Link href={artwork.href} noUnderline>
        <Image
          mr={`${space(2)}px`}
          src={imageUrl}
          alt={`${artwork.title} by ${artwork.artist_names}`}
        />
      </Link>
      <Link href={artwork.href} noUnderline>
        <Box>
          <Title>
            {artwork.title}, {artwork.date}
          </Title>
          <Serif size="2" weight={emphasizeArtist ? "semibold" : "regular"}>
            {artwork.artist_names}
          </Serif>
        </Box>
      </Link>
    </Flex>
  )
}

export const PreviewGridItemFragmentContainer = createFragmentContainer(
  PreviewGridItem,
  graphql`
    fragment PreviewGridItem_artwork on Artwork {
      href
      title
      artist_names
      image {
        cropped(width: 40, height: 40) {
          url
        }
      }
      date
    }
  `
)
