import { Box, Flex, Image } from "@artsy/palette"
import { DefaultHeader_headerArtworks } from "__generated__/DefaultHeader_headerArtworks.graphql"
import React, { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { resize } from "Utils/resizer"
import { getViewportWidth } from "Utils/viewport"

interface Props {
  headerArtworks: DefaultHeader_headerArtworks
  defaultHeaderImageHeight: number
}
export const BOB = (artworks, headerWidth) => {
  // const getCenteredHeaderImage
  // const getAllHeaderArtworks
  // const headerWidth = getViewportWidth()
  let artworkWidths = 0

  artworks.forEach((artwork, i) => {
    artworkWidths += artwork.image.width + 10
  })
  console.log("TCL: artworkWidths", artworkWidths)

  if (artworkWidths <= headerWidth) {
    return artworks
  }

  return []
}
export const CollectionDefaultHeader: FC<Props> = ({
  headerArtworks,
  defaultHeaderImageHeight,
}) => {
  const { hits: artworks } = headerArtworks
  console.log("TCL: getViewportWidth()", getViewportWidth())
  const resizedImageUrl = artwork =>
    resize(artwork.imageUrl, {
      width: artwork.image.width,
      height: defaultHeaderImageHeight,
    })
  const headerWidth = getViewportWidth()
  BOB(artworks, headerWidth)
  /**
   * 1) Get header width
   * 2) Calc quant of imgs that should render based on width
   * 3) Manip artwork array accordingly
   * 4) Center the img
   */
  return (
    <header>
      <DefaultHeaderContainer
        position={["relative", "absolute"]}
        left={["auto", 0]}
        width={["auto", 1]}
        p={2}
        mt={0}
        mb={3}
        height={[160, 250]}
      >
        <Flex
          flexDirection="row"
          flexGrow={1}
          justifyContent="space-between"
          alignContent="center"
        >
          {artworks.map((artwork, i) => {
            const headerWidth = getViewportWidth()

            return (
              <a href={artwork.href} key={i}>
                <Image
                  mx={0.5}
                  height={defaultHeaderImageHeight}
                  src={resizedImageUrl(artwork)}
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
          imageUrl
          image {
            width
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
