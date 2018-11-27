import React from "react"

import { BorderBox, Flex, Serif } from "@artsy/palette"
import { ItemReview_artwork } from "__generated__/ItemReview_artwork.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"

interface ItemReviewProps {
  artwork: ItemReview_artwork
}

const ImageBox = styled.div`
  flex: 0 1 auto;

  img {
    max-width: 185px;
    max-height: 375px;
    display: block;
    margin: 0;
  }
`

export const ItemReview: React.SFC<ItemReviewProps> = ({
  artwork: {
    artist_names,
    title,
    date,
    medium,
    dimensions,
    attribution_class,
    image: {
      resized: { url },
    },
  },
}) => (
  <BorderBox p={[2, 3]}>
    <Flex flexGrow={1} flexDirection="column">
      <Serif size="2" weight="semibold" color="black60">
        {artist_names}
      </Serif>
      <Serif italic size="2" color="black60">
        {title}
        {date && `, (${date})`}
      </Serif>
      {medium && (
        <Serif size="2" color="black60">
          {medium}
        </Serif>
      )}
      {dimensions && (
        <Serif size="2" color="black60">
          {dimensions.in} ({dimensions.cm})
        </Serif>
      )}
      {attribution_class && (
        <Serif size="2" color="black60">
          {attribution_class.short_description}
        </Serif>
      )}
    </Flex>
    <ImageBox>
      <img alt={`${title} by ${artist_names}`} src={url} />
    </ImageBox>
  </BorderBox>
)

export const ItemReviewFragmentContainer = createFragmentContainer(
  ItemReview,
  graphql`
    fragment ItemReview_artwork on Artwork {
      artist_names
      title
      date
      medium
      dimensions {
        in
        cm
      }
      attribution_class {
        short_description
      }
      image {
        resized(width: 185) {
          url
        }
      }
    }
  `
)
