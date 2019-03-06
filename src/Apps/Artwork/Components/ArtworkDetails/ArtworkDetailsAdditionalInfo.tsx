import { Box, Sans, StackableBorderBox } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

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
    const {
      series,
      publisher,
      manufacturer,
      image_rights,
      framed,
      signatureInfo,
      conditionDescription,
      certificateOfAuthenticity,
    } = this.props.artwork

    if (
      !series &&
      !publisher &&
      !manufacturer &&
      !image_rights &&
      !framed &&
      !signatureInfo &&
      !conditionDescription &&
      !certificateOfAuthenticity
    ) {
      return null
    }

    return (
      <StackableBorderBox p={2}>
        <Box>
          {series && this.renderRow("Series", series)}
          {publisher && this.renderRow("Publisher", publisher)}
          {manufacturer && this.renderRow("Manufacturer", manufacturer)}
          {image_rights && this.renderRow("Image rights", image_rights)}
          {framed && this.renderRow(framed.label, framed.details)}
          {signatureInfo &&
            this.renderRow(signatureInfo.label, signatureInfo.details)}
          {conditionDescription &&
            this.renderRow(
              conditionDescription.label,
              conditionDescription.details
            )}
          {certificateOfAuthenticity &&
            this.renderRow(
              certificateOfAuthenticity.label,
              certificateOfAuthenticity.details
            )}
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
      image_rights
      framed {
        label
        details
      }
      signatureInfo {
        label
        details
      }
      conditionDescription {
        label
        details
      }
      certificateOfAuthenticity {
        label
        details
      }
    }
  `
)
