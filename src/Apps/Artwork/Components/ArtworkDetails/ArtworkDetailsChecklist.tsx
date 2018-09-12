import { Box, Sans, StackableBorderBox } from "@artsy/palette"
import { Checkmark } from "Assets/Checkmark"
import colors from "Assets/Colors"
import React from "react"

interface ArtworkDetailsChecklistArtwork {
  readonly framed?: {
    readonly label: string
    readonly details?: string
  }
  readonly signatureInfo?: {
    readonly label: string
    readonly details?: string
  }
  readonly conditionDescription?: {
    readonly label: string
    readonly details?: string
  }
  readonly certificateOfAuthenticity?: {
    readonly label: string
    readonly details?: string
  }
}

interface ArtworkDetailsChecklistProps {
  artwork: ArtworkDetailsChecklistArtwork
}

export class ArtworkDetailsChecklist extends React.Component<
  ArtworkDetailsChecklistProps
> {
  renderRow(label: string, details: string) {
    if (!label && !details) {
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
    const {
      framed,
      signatureInfo,
      conditionDescription,
      certificateOfAuthenticity,
    } = this.props.artwork
    if (
      !framed &&
      !signatureInfo &&
      !conditionDescription &&
      !certificateOfAuthenticity
    ) {
      return null
    }
    return (
      <StackableBorderBox pb={3}>
        <Box>
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
