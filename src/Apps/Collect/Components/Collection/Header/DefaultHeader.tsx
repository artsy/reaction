import { Box, Flex, Image } from "@artsy/palette"
import { DefaultHeader_headerArtworks } from "__generated__/DefaultHeader_headerArtworks.graphql"
import React, { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { resize } from "Utils/resizer"
// import { getViewportWidth } from "Utils/viewport"

interface Props {
  headerArtworks: DefaultHeader_headerArtworks
  defaultHeaderImageHeight: number
}
export const CollectionDefaultHeader: FC<Props> = ({
  headerArtworks,
  defaultHeaderImageHeight,
}) => {
  const { hits: artworks } = headerArtworks
  console.log("TCL: artworks", artworks)

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
        className="deafult-header-artwork"
      >
        <Flex
          flexDirection="row"
          flexGrow={1}
          justifyContent="space-between"
          alignContent="center"
        >
          {artworks.map((artwork, i) => {
            const resizedImageUrl = resize(artwork.imageUrl, {
              width: artwork.image.width,
              height: defaultHeaderImageHeight,
            })

            return (
              <a href={artwork.href} key={i}>
                <Image
                  mx={0.5}
                  height={defaultHeaderImageHeight}
                  src={resizedImageUrl}
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
