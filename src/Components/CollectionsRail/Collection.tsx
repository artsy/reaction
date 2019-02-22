import { Box, color, Link, Sans, Serif } from "@artsy/palette"
import { CollectionEntity_collection } from "__generated__/CollectionEntity_collection.graphql"
import currency from "currency.js"
import React, { SFC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
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

const StyledLink = styled(Link)`
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
`

export const CollectionEntity: SFC<CollectionProps> = ({ collection }) => {
  return (
    <Box mb={3} width="100%">
      <StyledLink href={`${sd.APP_URL}/collection/${collection.slug}`}>
        <Background
          collectionImage={resize(collection.headerImage, {
            width: 645,
            height: 275,
            quality: 80,
          })}
        />
        <CollectionTitle size="4">{collection.title}</CollectionTitle>
        <Sans size="2">
          Works from ${currency(collection.price_guidance, {
            separator: ",",
            precision: 0,
          }).format()}
        </Sans>
      </StyledLink>
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
