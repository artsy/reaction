import { Serif } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Box } from "Styleguide/Elements/Box"

import { SizeInfo_piece } from "__generated__/SizeInfo_piece.graphql"

export interface SizeInfoProps {
  piece: SizeInfo_piece
}

const SizeInfoContainer = Box

export class SizeInfo extends React.Component<SizeInfoProps> {
  render() {
    const {
      piece: { dimensions, edition_of },
    } = this.props
    return (
      <SizeInfoContainer color="black60" textAlign="left">
        <Serif size="2">
          {dimensions &&
            (dimensions.in || dimensions.cm) &&
            [dimensions.in, dimensions.cm].join("; ")}
        </Serif>
        {edition_of && <Serif size="2">{edition_of}</Serif>}
      </SizeInfoContainer>
    )
  }
}

export const SizeInfoFragmentContainer = createFragmentContainer(
  SizeInfo,
  graphql`
    fragment SizeInfo_piece on Saleable {
      dimensions {
        in
        cm
      }
      edition_of
    }
  `
)
