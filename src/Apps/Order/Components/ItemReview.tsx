import React from "react"

import { Serif } from "@artsy/palette"
import styled from "styled-components"
import { StackableBorderBox } from "Styleguide/Elements/Box"
import { Flex } from "Styleguide/Elements/Flex"

interface ItemReviewProps {
  artist: string
  title: string
  date?: string
  medium?: string
  dimensions?: {
    in: string
    cm: string
  }
  attributionClassDescription?: string
  imageURL: string
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
  artist,
  title,
  date,
  medium,
  dimensions,
  attributionClassDescription,
  imageURL,
}) => (
  <StackableBorderBox>
    <Flex flexGrow={1} flexDirection="column">
      <Serif size="2" weight="semibold" color="black60">
        {artist}
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
      {attributionClassDescription && (
        <Serif size="2" color="black60">
          {attributionClassDescription}
        </Serif>
      )}
    </Flex>
    <ImageBox>
      <img alt={`${title} by ${artist}`} src={imageURL} />
    </ImageBox>
  </StackableBorderBox>
)
