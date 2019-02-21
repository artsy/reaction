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

const OverflowEllipsis = styled(Serif)`
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
    <Flex mr={2} mb={2}>
      <Link href={artwork.href} noUnderline>
        <Box width="40px" height="40px" mr={2}>
          {imageUrl && (
            <Image
              mr={2}
              src={imageUrl}
              alt={`${artwork.title} by ${artwork.artist_names}`}
            />
          )}
        </Box>
      </Link>
      <Link href={artwork.href} noUnderline>
        <Box>
          <OverflowEllipsis size="2" italic>
            {artwork.title}, {artwork.date}
          </OverflowEllipsis>
          <OverflowEllipsis
            size="2"
            weight={emphasizeArtist ? "semibold" : "regular"}
          >
            {artwork.artist_names}
          </OverflowEllipsis>
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
