import { Serif } from "@artsy/palette"
import React from "react"
import { Box } from "Styleguide/Elements/Box"

export interface SizeInfoProps {
  artwork: {
    readonly dimensions?: {
      readonly in: string
      readonly cm: string
    }
    readonly edition_of?: string
  }
}

const SizeInfoContainer = Box

export class SizeInfo extends React.Component<SizeInfoProps> {
  render() {
    const { artwork } = this.props
    return (
      <SizeInfoContainer color="black60" align="left">
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
