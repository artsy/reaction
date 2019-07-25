import { Box, Flex, Image } from "@artsy/palette"
import { DefaultHeader_headerArtworks } from "__generated__/DefaultHeader_headerArtworks.graphql"
import React, { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { getViewportWidth } from "Utils/viewport"

interface Props {
  headerArtworks: DefaultHeader_headerArtworks
  defaultHeaderImageHeight: number
}

export const getAllHeaderArtworks = (
  allArtworks: any[],
  headerWidth: number,
  isSmallViewport: boolean
) => {
  let artworkWidthsInOriginalArray = 0
  let artworkWidthsInRepeatedArray = artworkWidthsInOriginalArray
  const repeatedArtworksArray = []

  allArtworks.forEach(artwork => {
    isSmallViewport
      ? (artworkWidthsInOriginalArray += artwork.image.small.width + 10)
      : (artworkWidthsInOriginalArray += artwork.image.large.width + 10)
    repeatedArtworksArray.push(artwork)
  })

  artworkWidthsInRepeatedArray = artworkWidthsInOriginalArray

  if (artworkWidthsInOriginalArray >= headerWidth) {
    return allArtworks
  } else {
    /** while the widths of the artworks in repeatedArtworksArray is less than the header width:
   loop through the original artwork array, pushing new artworks on repeatedArtworksArray until the widths
   of the artworks in the array are greater/equal to the header width
   */

    while (artworkWidthsInRepeatedArray <= headerWidth) {
      allArtworks.forEach((artwork, i) => {
        repeatedArtworksArray.push(artwork)

        isSmallViewport
          ? (artworkWidthsInRepeatedArray += artwork.image.small.width + 10)
          : (artworkWidthsInRepeatedArray += artwork.image.large.width + 10)
      })
    }

    return repeatedArtworksArray
  }
}

export const CollectionDefaultHeader: FC<Props> = ({
  headerArtworks,
  defaultHeaderImageHeight,
}) => {
  const { hits: artworks } = headerArtworks
  const viewportWidth = getViewportWidth()
  const smallViewport = viewportWidth < 1024
  const duplicatedArtworks = artworks.slice(0)

  return (
    <header>
      <DefaultHeaderContainer
        position={["relative", "absolute"]}
        left={["auto", 0]}
        width={["auto", 1]}
        py={2}
        pr={2}
        pl={0}
        mt={0}
        mb={3}
        height={[160, 250]}
      >
        <Flex flexDirection="row" alignContent="center">
          {getAllHeaderArtworks(
            duplicatedArtworks,
            viewportWidth,
            smallViewport
          ).map((artwork, i) => {
            return (
              <a href={artwork.href} key={i}>
                <Image
                  mx={0.5}
                  height={defaultHeaderImageHeight}
                  src={
                    smallViewport
                      ? artwork.image.small.url
                      : artwork.image.large.url
                  }
                  preventRightClick
                />
              </a>
            )
          })}
        </Flex>
      </DefaultHeaderContainer>
    </header>
  )
}

export const CollectionDefaultHeaderFragmentContainer = createFragmentContainer(
  CollectionDefaultHeader,
  {
    headerArtworks: graphql`
      fragment DefaultHeader_headerArtworks on FilterArtworks {
        hits {
          href
          id
          image {
            small: resized(height: 160) {
              url
              width
              height
            }
            large: resized(height: 220) {
              url
              width
              height
            }
          }
        }
      }
    `,
  }
)

const DefaultHeaderContainer = styled(Box)`
  background-color: rgba(255, 255, 255, 0.8);
  overflow-x: hidden;
`
