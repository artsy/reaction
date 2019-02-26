import { Box, color, Flex, Link, Sans, Serif } from "@artsy/palette"
import currency from "currency.js"
import React, { SFC } from "react"
import { data as sd } from "sharify"
import styled from "styled-components"

export interface CollectionProps {
  collection: any
}

export const ArtistCollectionEntity: SFC<CollectionProps> = ({
  collection,
}) => {
  const { price_guidance, slug, title, headerImage } = collection
  const formattedTitle = title.split(": ")[1] || title

  return (
    <Box width="100%" pr={2}>
      <StyledLink href={`${sd.APP_URL}/collection/${slug}`}>
        <ImgWrapper pb={1}>
          <ImgPlaceholder headerImage={headerImage} />
          <ImgPlaceholder headerImage={headerImage} />
          <ImgPlaceholder headerImage={headerImage} />
        </ImgWrapper>

        <CollectionTitle size="3">{formattedTitle}</CollectionTitle>
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

const CollectionTitle = styled(Serif)`
  width: max-content;
`

const StyledLink = styled(Link)`
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`

const ImgPlaceholder = styled.div<{ headerImage: string }>`
  width: 85px;
  height: 125px;
  background: url(${props => props.headerImage});
  background-color: ${color("black10")};
  background-position: center;
  background-size: cover;

  &:last-child {
    padding-right: 0;
  }
`

const ImgWrapper = styled(Flex)`
  width: 265px;
  justify-content: space-between;
`
