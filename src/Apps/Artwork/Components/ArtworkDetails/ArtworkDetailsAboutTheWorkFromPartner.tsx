import { Avatar, Box, Flex, Serif, StackableBorderBox } from "@artsy/palette"
import { filterLocations } from "Apps/Artwork/Utils/filterLocations"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ReadMore } from "Styleguide/Components"

import { ArtworkDetailsAboutTheWorkFromPartner_artwork } from "__generated__/ArtworkDetailsAboutTheWorkFromPartner_artwork.graphql"

export interface ArtworkDetailsAboutTheWorkFromPartnerProps {
  artwork: ArtworkDetailsAboutTheWorkFromPartner_artwork
}

export const ArtworkDetailsAboutTheWorkFromPartner: React.SFC<
  ArtworkDetailsAboutTheWorkFromPartnerProps
> = props => {
  const { additional_information, partner } = props.artwork
  if (!additional_information) {
    return null
  }
  const locationNames =
    partner &&
    partner.locations &&
    partner.locations.length > 0 &&
    filterLocations(partner.locations)
  return (
    <StackableBorderBox>
      <Box>
        <Flex flexDirection="row" mb={1}>
          {partner &&
            partner.profile &&
            partner.profile.image && (
              <Avatar size="small" src={partner.profile.image.url} mr={1} />
            )}
          <Flex flexDirection="column">
            <Serif size="3t" weight="semibold">
              {partner.name}
            </Serif>
            {locationNames &&
              locationNames.length > 0 && (
                <Serif size="3" color="black60">
                  {locationNames.join(", ")}
                </Serif>
              )}
          </Flex>
        </Flex>

        <Serif size="3">
          <ReadMore maxChars={300} content={additional_information} />
        </Serif>
      </Box>
    </StackableBorderBox>
  )
}

export const ArtworkDetailsAboutTheWorkFromPartnerFragmentContainer = createFragmentContainer(
  ArtworkDetailsAboutTheWorkFromPartner,
  graphql`
    fragment ArtworkDetailsAboutTheWorkFromPartner_artwork on Artwork {
      additional_information
      partner {
        name
        locations {
          city
        }
        profile {
          image {
            url
          }
        }
      }
    }
  `
)
