import { Box, color, Flex, Image } from "@artsy/palette"
import { DefaultHeader_headerArtworks } from "__generated__/DefaultHeader_headerArtworks.graphql"
import React, { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { useWindowSize } from "Utils/Hooks/useWindowSize"
import { getViewportWidth } from "Utils/viewport"

interface Props {
  headerArtworks: DefaultHeader_headerArtworks
  defaultHeaderImageHeight: number
}

const IMAGE_MARGIN_X = 10
const LARGE_VIEWPORT_WIDTH = 880

export const CollectionDefaultHeader: FC<Props> = ({
  headerArtworks,
  defaultHeaderImageHeight,
}) => {
  useWindowSize()
  const { hits: artworks } = headerArtworks

  if (!artworks) {
    return null
  }

  const { width: viewportWidth } = getViewportWidth()
  const smallViewport = viewportWidth < LARGE_VIEWPORT_WIDTH
  const duplicatedArtworks = artworks.slice(0)
  const artworksToRender = getHeaderArtworks(
    duplicatedArtworks,
    viewportWidth,
    smallViewport
  )

  return (
    <header>
      <DefaultHeaderContainer
        position={["relative", "absolute"]}
        left={["auto", 0]}
        width={["auto", 1]}
        height={[160, 160, 250]}
      >
        <HeaderArtworks>
          {artworksToRender.map((artwork, i) => {
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
        </HeaderArtworks>
      </DefaultHeaderContainer>
    </header>
  )
}

export const getHeaderArtworks = (
  originalArtworksArray: any[],
  headerWidth: number,
  isSmallViewport: boolean
) => {
  // let artworkWidthsInOriginalArray = 0
  let artworkWidths = 0
  // let artworkWidthsInRepeatingArray
  const headerArtworks = []
  console.log("TCL: headerWidth", headerWidth)

  while (artworkWidths <= headerWidth) {
    console.log("TCL: artworkWidths", artworkWidths)
    originalArtworksArray.forEach((artwork, i) => {
      console.log("TCL: originalArtworksArray", originalArtworksArray)

      headerArtworks.push(artwork)
      originalArtworksArray.push(artwork)

      isSmallViewport
        ? (artworkWidths += artwork.image.small.width + IMAGE_MARGIN_X)
        : (artworkWidths += artwork.image.large.width + IMAGE_MARGIN_X)
    })
  }
  console.log("TCL: headerArtworks", headerArtworks)

  return headerArtworks

  // originalArtworksArray.forEach(artwork => {
  //   isSmallViewport
  //     ? (artworkWidthsInOriginalArray +=
  //         artwork.image.small.width + IMAGE_MARGIN_X)
  //     : (artworkWidthsInOriginalArray +=
  //         artwork.image.large.width + IMAGE_MARGIN_X)
  //   repeatedArtworksArray.push(artwork)
  // })

  // artworkWidthsInRepeatingArray = artworkWidthsInOriginalArray

  // /**
  //  * If the summed widths of the artworks returned is larger than the width
  //  * of the viewport then there's no need to duplicate/repeat the header's artworks
  //  */
  // if (artworkWidthsInOriginalArray >= headerWidth) {
  //   return originalArtworksArray
  // } else {
  //   /**
  //    * Otherwise, duplicate the original array of artworks and add a new artwork to the array
  //    * until the summed widths of the artworks is greater than the viewport width
  //    */
  //   while (artworkWidthsInRepeatingArray <= headerWidth) {
  //     originalArtworksArray.forEach((artwork, i) => {
  //       repeatedArtworksArray.push(artwork)

  //       isSmallViewport
  //         ? (artworkWidthsInRepeatingArray +=
  //             artwork.image.small.width + IMAGE_MARGIN_X)
  //         : (artworkWidthsInRepeatingArray +=
  //             artwork.image.large.width + IMAGE_MARGIN_X)
  //     })
  //   }

  //   return repeatedArtworksArray
  // }
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
  background-color: ${color("black5")};
`
const HeaderArtworks = styled(Flex)`
  flex-direction: row;
  position: absolute;
  bottom: 0;
`
