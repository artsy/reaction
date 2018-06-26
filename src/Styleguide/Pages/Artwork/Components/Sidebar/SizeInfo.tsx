import { Serif } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Box } from "Styleguide/Elements/Box"

import { SizeInfo_artwork } from "__generated__/SizeInfo_artwork.graphql"

export interface SizeInfoProps {
  artwork: SizeInfo_artwork
}

const SizeInfoContainer = Box

export class SizeInfo extends React.Component<SizeInfoProps> {
  render() {
    const { artwork } = this.props
    return (
      <SizeInfoContainer color="black60" textAlign="left">
        <Serif size="2">
          {artwork.dimensions &&
            (artwork.dimensions.in || artwork.dimensions.cm) &&
            [artwork.dimensions.in, artwork.dimensions.cm].join("; ")}
        </Serif>
        {artwork.edition_of && <Serif size="2">{artwork.edition_of}</Serif>}
      </SizeInfoContainer>
    )
  }
}

export const SizeInfoFragmentContainer = createFragmentContainer(
  SizeInfo,
  graphql`
    fragment SizeInfo_artwork on Artwork {
      dimensions {
        in
        cm
      }
      edition_of
    }
  `
)
