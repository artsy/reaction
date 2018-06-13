import React from "react"
import styled from "styled-components"
import { Serif } from "@artsy/palette"
import { themeGet } from "styled-system"

interface TitleInfoProps {
  artwork: {
    readonly title: string
    readonly date?: string
    readonly medium?: string
  }
}

const TitleInfoContainer = styled.div`
  color: ${themeGet("colors.black60")};
  text-align: left;
`

export class TitleInfo extends React.Component<TitleInfoProps> {
  render() {
    const { artwork } = this.props
    return (
      <TitleInfoContainer>
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
