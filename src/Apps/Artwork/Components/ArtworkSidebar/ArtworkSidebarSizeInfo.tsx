import { Box, Serif } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

import { ArtworkSidebarSizeInfo_piece } from "__generated__/ArtworkSidebarSizeInfo_piece.graphql"

export interface ArtworkSidebarSizeInfoProps {
  piece: ArtworkSidebarSizeInfo_piece
}

export class ArtworkSidebarSizeInfo extends React.Component<
  ArtworkSidebarSizeInfoProps
> {
  render() {
    const {
      piece: { dimensions, edition_of },
    } = this.props
    if (
      !(edition_of && edition_of.length) &&
      !(dimensions && (dimensions.in || dimensions.cm))
    ) {
      return null
    }
    return (
      <Box color="black60">
        <Serif size="2">
          {dimensions &&
            (dimensions.in || dimensions.cm) &&
            [dimensions.in, dimensions.cm].join("; ")}
        </Serif>
        {edition_of && <Serif size="2">{edition_of}</Serif>}
      </Box>
    )
  }
}

export const ArtworkSidebarSizeInfoFragmentContainer = createFragmentContainer(
  ArtworkSidebarSizeInfo,
  graphql`
    fragment ArtworkSidebarSizeInfo_piece on Sellable {
      dimensions {
        in
        cm
      }
      edition_of
    }
  `
)
