import { Avatar, Box, Flex, Serif, StackableBorderBox } from "@artsy/palette"
import { filterLocations } from "Apps/Artwork/Utils/filterLocations"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ReadMore } from "Styleguide/Components"

import { ArtworkDetailsAboutTheWorkFromPartner_artwork } from "__generated__/ArtworkDetailsAboutTheWorkFromPartner_artwork.graphql"

export interface ArtworkDetailsAboutTheWorkFromPartnerProps {
  artwork: ArtworkDetailsAboutTheWorkFromPartner_artwork
}

export class ArtworkDetailsAboutTheWorkFromPartner extends React.Component<
  ArtworkDetailsAboutTheWorkFromPartnerProps
> {
  renderProfileImage(imageUrl?: string, initials?: string) {
    return <Avatar size="xs" src={imageUrl} initials={initials} mr={1} />
  }

  render() {
    const { additional_information, partner } = this.props.artwork
    if (!additional_information) {
      return null
    }
    const locationNames =
      partner &&
      partner.locations &&
      partner.locations.length > 0 &&
      filterLocations(partner.locations)
    return (
      <StackableBorderBox p={2}>
        <Box>
          <Flex flexDirection="row" mb={1}>
            {partner &&
              this.renderProfileImage(
                partner.profile &&
                  partner.profile.image &&
                  partner.profile.image.url,
                partner.initials
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
}

export const ArtworkDetailsAboutTheWorkFromPartnerFragmentContainer = createFragmentContainer(
  ArtworkDetailsAboutTheWorkFromPartner,
  graphql`
    fragment ArtworkDetailsAboutTheWorkFromPartner_artwork on Artwork {
      additional_information
      partner {
        name
        initials
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
