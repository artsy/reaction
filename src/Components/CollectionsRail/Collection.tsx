import { Box, color, Sans, Serif } from "@artsy/palette"
import React, { SFC } from "react"
import styled from "styled-components"
import { resize } from "Utils/resizer"

export interface CollectionProps {
  headerImage?: string
  price_guidance?: number
  slug: string
  title?: string
}

const Background = styled(Box)<{ collectionImage: string }>`
  height: 175px;
  width: 100%;
  // min-width: 545px;
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

export const CollectionEntity: SFC<CollectionProps> = props => {
  return (
    <Box mb={3} width="100%">
      <Background
        collectionImage={resize(props.headerImage, {
          width: 820,
          height: 240,
          quality: 80,
        })}
      />
      <CollectionTitle size="4">{props.title}</CollectionTitle>
      <Sans size="2">Works from ${props.price_guidance}</Sans>
    </Box>
  )
}
