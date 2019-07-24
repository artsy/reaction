import { Box, Flex, Image } from "@artsy/palette"
import { DefaultHeader_headerArtworks } from "__generated__/DefaultHeader_headerArtworks.graphql"
import React, { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { resize } from "Utils/resizer"

interface Props {
  headerArtworks: DefaultHeader_headerArtworks
  defaultHeaderImageHeight: number
}
export const CollectionDefaultHeader: FC<Props> = ({
  headerArtworks,
  defaultHeaderImageHeight,
}) => {
  const { hits: artworks } = headerArtworks
  if (!artworks) {
    return null
  }

  return (
    <header>
      <HeaderWrapper
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
            const resizedImageUrl = resize(artwork.imageUrl, {
              width: artwork.image.width,
              height: defaultHeaderImageHeight,
            })

            return (
              <Image
                key={i}
                width={artwork.image.width}
                height={defaultHeaderImageHeight}
                mx={15}
                src={resizedImageUrl}
                preventRightClick
              />
            )
          })}
        </Flex>
      </HeaderWrapper>
    </header>
  )
}

export const CollectionDefaultHeaderFragmentContainer = createFragmentContainer(
  CollectionDefaultHeader,
  {
    headerArtworks: graphql`
      fragment DefaultHeader_headerArtworks on FilterArtworks {
        hits {
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

const DefaultBanner = styled(Box)`
  height: 250px;
`

const HeaderWrapper = styled(Box)`
  background-color: rgba(255, 255, 255, 0.8);
`
