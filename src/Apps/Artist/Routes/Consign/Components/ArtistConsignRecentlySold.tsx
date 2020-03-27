import { Box, Flex, Sans, Spacer } from "@artsy/palette"
import { shuffle } from "lodash"
import React from "react"

import { Consign_artworksByInternalID } from "__generated__/Consign_artworksByInternalID.graphql"

import FillwidthItem from "Components/Artwork/FillwidthItem"
import { ArtistConsignment } from "../Utils/getConsignmentData"
import { SectionContainer } from "./SectionContainer"
import { Subheader } from "./Subheader"

interface ArtistConsignRecentlySoldProps {
  artistConsignment: ArtistConsignment
  artistName: string
  artworksByInternalID: Consign_artworksByInternalID
}

export const ArtistConsignRecentlySold: React.FC<ArtistConsignRecentlySoldProps> = ({
  artistConsignment,
  artistName,
  artworksByInternalID,
}) => {
  return (
    <SectionContainer>
      <Box textAlign="center">
        <Box>
          <Subheader>Works by {artistName} recently sold on Artsy</Subheader>

          <Spacer my={4} />

          <Flex
            justifyContent={["center", "center"]}
            flexWrap="wrap"
            alignItems="center"
          >
            {shuffle(artworksByInternalID).map((artwork, key) => {
              const artworkData = artistConsignment.artworks.find(
                consignmentArtwork => {
                  return consignmentArtwork.internalID === artwork.internalID
                }
              )
              return (
                <Box p={2} key={key} textAlign="left">
                  <FillwidthItem
                    artwork={artwork}
                    targetHeight={150}
                    imageHeight={150}
                    showExtended={false}
                    width={150 * artwork.image.aspectRatio}
                  />
                  <Sans size="2" weight="medium">
                    Sold for {artworkData.realizedPrice}
                  </Sans>
                </Box>
              )
            })}
          </Flex>
        </Box>
      </Box>
    </SectionContainer>
  )
}
