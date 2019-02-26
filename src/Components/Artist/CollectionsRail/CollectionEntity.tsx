import { Box, Link, Sans, Serif } from "@artsy/palette"
import currency from "currency.js"
import React, { SFC } from "react"
import { data as sd } from "sharify"
import styled from "styled-components"

export interface CollectionProps {
  collection: any
}

const CollectionTitle = styled(Serif)`
  width: max-content;
`

const StyledLink = styled(Link)`
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`

export const ArtistCollectionEntity: SFC<CollectionProps> = ({
  collection,
}) => {
  const { price_guidance, slug, title } = collection
  const formattedTitle = title.split(": ")[1] || title

  return (
    <Box mb={3} width="100%">
      <StyledLink href={`${sd.APP_URL}/collection/${slug}`}>
        <CollectionTitle size="4">{formattedTitle}</CollectionTitle>
        {price_guidance && (
          <Sans size="2" color="black60">
            Works from ${currency(price_guidance, {
              separator: ",",
              precision: 0,
            }).format()}
          </Sans>
        )}
      </StyledLink>
    </Box>
  )
}
