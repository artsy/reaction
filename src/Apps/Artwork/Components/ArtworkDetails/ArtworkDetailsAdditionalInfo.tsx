import { Sans } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Box, StackableBorderBox } from "Styleguide/Elements/Box"

import { ArtworkDetailsAdditionalInfo_artwork } from "__generated__/ArtworkDetailsAdditionalInfo_artwork.graphql"

export interface ArtworkDetailsAdditionalInfoProps {
  artwork: ArtworkDetailsAdditionalInfo_artwork
}

export class ArtworkDetailsAdditionalInfo extends React.Component<
  ArtworkDetailsAdditionalInfoProps
> {
  renderRow(label: string, details: string) {
    if (!label && !details) {
      return null
    }
    return (
      <Box>
        <Sans size="2" weight="medium" display="inline" mr={1}>
          {label}
        </Sans>
        <Sans size="2" display="inline" color="black60">
          {details}
        </Sans>
      </Box>
    )
  }

  render() {
    const { artwork } = this.props
    if (
      !artwork.series &&
      !artwork.publisher &&
      !artwork.manufacturer &&
      !artwork.provenance &&
      !artwork.image_rights
    ) {
      return null
    }
    return (
      <StackableBorderBox pb={3}>
        <Box>
          {artwork.series && this.renderRow("Series", artwork.series)}
          {artwork.publisher && this.renderRow("Publisher", artwork.publisher)}
          {artwork.manufacturer &&
            this.renderRow("Manufacturer", artwork.manufacturer)}
          {artwork.provenance &&
            this.renderRow("Provenance", artwork.provenance)}
          {artwork.image_rights &&
            this.renderRow("Image rights", artwork.image_rights)}
        </Box>
      </StackableBorderBox>
    )
  }
}

export const ArtworkDetailsAdditionalInfoFragmentContainer = createFragmentContainer(
  ArtworkDetailsAdditionalInfo,
  graphql`
    fragment ArtworkDetailsAdditionalInfo_artwork on Artwork {
      series
      publisher
      manufacturer
      provenance
      image_rights
    }
  `
)
