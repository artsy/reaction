import React from "react"
import { Serif } from "@artsy/palette"
import styled from "styled-components"
import { space, SpaceProps } from "styled-system"
import { Flex } from "Styleguide/Elements/Flex"
import { Location } from "../../../../Assets/Icons/Location"

export interface PartnerInfoProps {
  artwork?: {
    readonly collecting_institution?: string
  }
  partner: {
    readonly __id: string
    readonly name: string
    readonly href?: string
    readonly locations: Array<{
      readonly city: string
    }>
  }
}

const PartnerInfoContainer = styled.div.attrs<SpaceProps>({})`
  ${space};
`
const LocationsContainer = styled.div``

export class PartnerInfo extends React.Component<PartnerInfoProps> {
  renderPartnerName(partner) {
    return partner.href ? (
      <Serif size="5t" display="inline-block">
        <a href={partner.href}>{partner.name}</a>
      </Serif>
    ) : (
      <Serif size="5t" display="inline-block">
        {partner.name}
      </Serif>
    )
  }
  renderCollectingInstitution(artwork) {
    return <Serif size="3">{artwork.collecting_institution}</Serif>
  }
  renderLocations(locations) {
    const locationCities = locations.map((location, index) => {
      return location.city
    })
    const filteredForDuplicates = locationCities.filter((city, pos) => {
      return locationCities.indexOf(city) === pos
    })
    return (
      <Serif size="2" display="inline-block" pl={1} pt={0.3}>
        {filteredForDuplicates.join(", ")}
      </Serif>
    )
  }

  render() {
    const { artwork, partner } = this.props
    return (
      <PartnerInfoContainer pb={2}>
        {artwork && artwork.collecting_institution
          ? this.renderCollectingInstitution(artwork)
          : this.renderPartnerName(partner)}
        {partner.locations.length > 0 && (
          <LocationsContainer>
            <Flex width="100%" pt={1}>
              <Flex flexDirection="column">
                <Location />
              </Flex>
              <Flex flexDirection="column">
                {this.renderLocations(partner.locations)}
              </Flex>
            </Flex>
          </LocationsContainer>
        )}
      </PartnerInfoContainer>
    )
  }
}
