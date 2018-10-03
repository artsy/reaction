import { Avatar, Box, Serif, Spacer, StackableBorderBox } from "@artsy/palette"
import { filterLocations } from "Apps/Artwork/Utils/filterLocations"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ReadMore } from "Styleguide/Components"
import { EntityHeader } from "Styleguide/Components"
import { get } from "Utils/get"

import { ArtworkDetailsAboutTheWorkFromPartner_artwork } from "__generated__/ArtworkDetailsAboutTheWorkFromPartner_artwork.graphql"
import { Responsive } from "Utils/Responsive"
import { READ_MORE_MAX_CHARS } from "./ArtworkDetailsAboutTheWorkFromArtsy"

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

    const locationNames = get(
      partner,
      p => filterLocations(p.locations),
      []
    ).join(", ")

    const imageUrl = get(partner, p => p.profile.icon.url)

    return (
      <Responsive>
        {({ xs }) => {
          const maxChars = xs
            ? READ_MORE_MAX_CHARS.xs
            : READ_MORE_MAX_CHARS.default

          return (
            <StackableBorderBox p={2}>
              <Box>
                <EntityHeader
                  name={partner.name}
                  meta={locationNames}
                  imageUrl={imageUrl}
                  initials={partner.initials}
                />
                <Spacer mb={1} />
                <Serif size="3">
                  <ReadMore
                    maxChars={maxChars}
                    content={additional_information}
                  />
                </Serif>
              </Box>
            </StackableBorderBox>
          )
        }}
      </Responsive>
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
          icon {
            url
          }
        }
      }
    }
  `
)
