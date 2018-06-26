import { Serif } from "@artsy/palette"
import { Location } from "Assets/Icons/Location"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Box } from "Styleguide/Elements/Box"
import { Flex } from "Styleguide/Elements/Flex"

import { PartnerInfo_artwork } from "__generated__/PartnerInfo_artwork.graphql"

export interface PartnerInfoProps {
  artwork: PartnerInfo_artwork
}

const PartnerInfoContainer = Box
const LocationsContainer = Box

export class PartnerInfo extends React.Component<PartnerInfoProps> {
  renderPartnerName() {
    const partner = this.props.artwork.partner
    return partner.href ? (
      <Serif size="5t" display="inline-block" weight="semibold">
        <a href={partner.href}>{partner.name}</a>
      </Serif>
    ) : (
      <Serif size="5t" display="inline-block" weight="semibold">
        {partner.name}
      </Serif>
    )
  }
  renderCollectingInstitution() {
    return (
      <Serif size="3" pt={1}>
        {this.props.artwork.collecting_institution}
      </Serif>
    )
  }
  renderLocations(locationNames) {
    return (
      <Serif size="2" display="inline-block" pl={1} pt={0.3}>
        {locationNames.join(", ")}
      </Serif>
    )
  }

  render() {
    const { artwork } = this.props
    const locationCities = artwork.partner.locations.map((location, index) => {
      return location.city
    })
    const filteredForDuplicatesAndBlanks = locationCities.filter(
      (city, pos) => {
        return city && locationCities.indexOf(city) === pos && city.length > 0
      }
    )

    return (
      <PartnerInfoContainer pb={3}>
        {artwork && artwork.collecting_institution ? (
          this.renderCollectingInstitution()
        ) : (
          <React.Fragment>
            {this.renderPartnerName()}
            {filteredForDuplicatesAndBlanks.length > 0 && (
              <LocationsContainer>
                <Flex width="100%" pt={1}>
                  <Flex flexDirection="column">
                    <Location />
                  </Flex>
                  <Flex flexDirection="column">
                    {this.renderLocations(filteredForDuplicatesAndBlanks)}
                  </Flex>
                </Flex>
              </LocationsContainer>
            )}
          </React.Fragment>
        )}
      </PartnerInfoContainer>
    )
  }
}

export const PartnerInfoFragmentContainer = createFragmentContainer(
  PartnerInfo,
  graphql`
    fragment PartnerInfo_artwork on Artwork {
      collecting_institution
      partner {
        __id
        name
        href
        locations {
          city
        }
      }
    }
  `
)
