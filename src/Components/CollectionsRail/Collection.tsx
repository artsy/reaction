import { Box, color, Sans, Serif } from "@artsy/palette"
import { CollectionEntity_collection } from "__generated__/CollectionEntity_collection.graphql"
import React, { SFC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { resize } from "Utils/resizer"

export interface CollectionProps {
  collection: CollectionEntity_collection
}

const Background = styled(Box)<{ collectionImage: string }>`
  height: 175px;
  width: 100%;
  background: ${color("black30")};
  background-image: url(${props => props.collectionImage});
  display: inline-flex;
  position: relative;
  background-size: cover;
  background-position: center;
`

const CollectionTitle = styled(Serif)`
  width: max-content;
`

export const CollectionEntity: SFC<CollectionProps> = ({ collection }) => {
  return (
    <Box mb={3} width="100%">
      <Background
        collectionImage={resize(collection.headerImage, {
          width: 645,
          height: 275,
          quality: 80,
        })}
      />
      <CollectionTitle size="4">{collection.title}</CollectionTitle>
      <Sans size="2">Works from ${collection.price_guidance}</Sans>
    </Box>
  )
}

export const CollectionEntityFragmentContainer = createFragmentContainer(
  CollectionEntity,
  graphql`
    fragment CollectionEntity_collection on MarketingCollection {
      slug
      headerImage
      title
      price_guidance
      show_on_editorial
    }
  `
)
