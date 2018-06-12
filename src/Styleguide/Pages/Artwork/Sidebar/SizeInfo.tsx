import React from "react"
import styled from "styled-components"
import { Serif } from "@artsy/palette"
import { themeGet } from "styled-system"

interface SizeInfoProps {
  artwork: {
    readonly dimensions?: {
      readonly in: string
      readonly cm: string
    }
    readonly edition_of?: string
  }
}

const SizeInfoContainer = styled.div`
  color: ${themeGet("colors.black60")};
  text-align: left;
`

export class SizeInfo extends React.Component<SizeInfoProps> {
  render() {
    const { artwork } = this.props
    return (
      <SizeInfoContainer>
        <Serif size="2">
          {artwork.dimensions
            ? [artwork.dimensions.in, artwork.dimensions.cm].join("; ")
            : ""}
        </Serif>
        {artwork.edition_of ? <Serif size="2">{artwork.edition_of}</Serif> : ""}
      </SizeInfoContainer>
    )
  }
}
