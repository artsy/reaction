import { Serif } from "@artsy/palette"
import React from "react"
import { Box } from "Styleguide/Elements/Box"

export interface TitleInfoProps {
  artwork: {
    readonly title: string
    readonly date?: string
    readonly medium?: string
  }
}

const TitleInfoContainer = Box

export class TitleInfo extends React.Component<TitleInfoProps> {
  render() {
    const { artwork } = this.props
    return (
      <TitleInfoContainer color="black60" align="left">
        <Serif size="2">
          <Serif size="2" display="inline-block" italic>
            {artwork.title}
          </Serif>
          {artwork.date &&
            artwork.date.replace(/\s+/g, "").length > 0 &&
            ", " + artwork.date}
        </Serif>
        {artwork.medium && <Serif size="2">{artwork.medium}</Serif>}
      </TitleInfoContainer>
    )
  }
}
