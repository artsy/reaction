import { Sans } from "@artsy/palette"
import { Checkmark } from "Assets/Checkmark"
import colors from "Assets/Colors"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Box } from "Styleguide/Elements/Box"

import { ArtworkDetailsConditionInfo_artwork } from "__generated__/ArtworkDetailsConditionInfo_artwork.graphql"

export interface ArtworkDetailsConditionInfoProps {
  artwork: ArtworkDetailsConditionInfo_artwork
}

export class ArtworkDetailsConditionInfo extends React.Component<
  ArtworkDetailsConditionInfoProps
> {
  renderRow(label: string, details: string) {
    if ((!label || label.length < 1) && (!details || details.length < 1)) {
      return null
    }
    return (
      <Box>
        <Box display="inline" mr={1}>
          <Checkmark stroke={colors.black} />
        </Box>
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
      !artwork.framed &&
      !artwork.signatureInfo &&
      !artwork.conditionDescription &&
      !artwork.certificateOfAuthenticity
    ) {
      return null
    }
    return (
      <Box pb={3}>
        {artwork.framed &&
          this.renderRow(artwork.framed.label, artwork.framed.details)}
        {artwork.signatureInfo &&
          this.renderRow(
            artwork.signatureInfo.label,
            artwork.signatureInfo.details
          )}
        {artwork.conditionDescription &&
          this.renderRow(
            artwork.conditionDescription.label,
            artwork.conditionDescription.details
          )}
        {artwork.certificateOfAuthenticity &&
          this.renderRow(
            artwork.certificateOfAuthenticity.label,
            artwork.certificateOfAuthenticity.details
          )}
      </Box>
    )
  }
}

export const ArtworkDetailsConditionInfoFragmentContainer = createFragmentContainer(
  ArtworkDetailsConditionInfo,
  graphql`
    fragment ArtworkDetailsConditionInfo_artwork on Artwork {
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
