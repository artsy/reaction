import { Box, color, Flex, Sans, StackableBorderBox } from "@artsy/palette"
import { Checkmark } from "Assets/Checkmark"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

import { ArtworkDetailsChecklist_artwork } from "__generated__/ArtworkDetailsChecklist_artwork.graphql"

export interface ArtworkDetailsChecklistProps {
  artwork: ArtworkDetailsChecklist_artwork
}

export class ArtworkDetailsChecklist extends React.Component<
  ArtworkDetailsChecklistProps
> {
  renderRow(label: string, details: string) {
    if (!label && !details) {
      return null
    }
    return (
      <Flex flexDirection="row">
        <Box display="inline" mr={1}>
          <Checkmark stroke={color("black100")} />
        </Box>
        <Box>
          <Sans size="2" weight="medium" display="inline" mr={1}>
            {label}
          </Sans>
          <Sans size="2" display="inline" color="black60">
            {details}
          </Sans>
        </Box>
      </Flex>
    )
  }

  render() {
    const {
      certificateOfAuthenticity,
      conditionDescription,
      framed,
      signatureInfo,
    } = this.props.artwork
    if (
      !certificateOfAuthenticity &&
      !conditionDescription &&
      !framed &&
      !signatureInfo
    ) {
      return null
    }
    return (
      <StackableBorderBox p={2}>
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

export const ArtworkDetailsChecklistFragmentContainer = createFragmentContainer(
  ArtworkDetailsChecklist,
  graphql`
    fragment ArtworkDetailsChecklist_artwork on Artwork {
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
