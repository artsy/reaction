import { Box, Flex, Sans, Spacer } from "@artsy/palette"
import React from "react"

import { ArtistConsignRecentlySold_artist } from "__generated__/ArtistConsignRecentlySold_artist.graphql"

import { ContextModule } from "@artsy/cohesion"
import FillwidthItem from "Components/Artwork/FillwidthItem"
import { createFragmentContainer, graphql } from "react-relay"
import { SectionContainer } from "./SectionContainer"
import { Subheader } from "./Subheader"

interface ArtistConsignRecentlySoldProps {
  artist: ArtistConsignRecentlySold_artist
}

export const ArtistConsignRecentlySold: React.FC<ArtistConsignRecentlySoldProps> = ({
  artist,
}) => {
  if (!artist.targetSupply.microfunnel.artworks) {
    return null
  }

  return (
    <SectionContainer>
      <Box textAlign="center">
        <Box>
          <Subheader>Works by {artist.name} recently sold on Artsy</Subheader>

          <Spacer my={4} />

          <Flex
            justifyContent={["center", "center"]}
            flexWrap="wrap"
            alignItems="center"
          >
            {artist.targetSupply.microfunnel.artworks.map(
              ({ artwork, realizedPrice }, key) => {
                return (
                  <Box p={2} key={key} textAlign="left">
                    <FillwidthItem
                      artwork={artwork}
                      targetHeight={150}
                      imageHeight={150}
                      showExtended={false}
                      width={150 * artwork.image.aspectRatio}
                      contextModule={ContextModule.artistRecentlySold}
                    />
                    <Sans size="2" weight="medium">
                      Sold for {realizedPrice}
                    </Sans>
                  </Box>
                )
              }
            )}
          </Flex>
        </Box>
      </Box>
    </SectionContainer>
  )
}

export const ArtistConsignRecentlySoldFragmentContainer = createFragmentContainer(
  ArtistConsignRecentlySold,
  {
    artist: graphql`
      fragment ArtistConsignRecentlySold_artist on Artist {
        targetSupply {
          microfunnel {
            artworks {
              artwork {
                image {
                  aspectRatio
                  width
                  height
                }
                ...FillwidthItem_artwork
              }
              realizedPrice
            }
          }
        }

        name
      }
    `,
  }
)
