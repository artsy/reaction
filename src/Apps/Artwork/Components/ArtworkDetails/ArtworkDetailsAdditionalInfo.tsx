import { Box, Sans, StackableBorderBox } from "@artsy/palette"
import React from "react"

interface ArtworkDetailsAdditionalInfoArtwork {
  readonly series?: string
  readonly publisher?: string
  readonly manufacturer?: string
  readonly provenance?: string
  readonly image_rights?: string
}

interface ArtworkDetailsAdditionalInfoProps {
  artwork: ArtworkDetailsAdditionalInfoArtwork
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
      provenance,
      image_rights,
    } = this.props.artwork
    if (
      !series &&
      !publisher &&
      !manufacturer &&
      !provenance &&
      !image_rights
    ) {
      return null
    }
    return (
      <StackableBorderBox pb={3}>
        <Box>
          <Box>
            <Sans size="2" weight="medium">
              Additional info
            </Sans>
          </Box>
          {series && this.renderRow("Series", series)}
          {publisher && this.renderRow("Publisher", publisher)}
          {manufacturer && this.renderRow("Manufacturer", manufacturer)}
          {provenance && this.renderRow("Provenance", provenance)}
          {image_rights && this.renderRow("Image rights", image_rights)}
        </Box>
      </StackableBorderBox>
    )
  }
}
