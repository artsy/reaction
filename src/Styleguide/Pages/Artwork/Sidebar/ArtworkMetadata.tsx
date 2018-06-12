import React from "react"
import styled from "styled-components"
import { space, SpaceProps } from "styled-system"
import { TitleInfo } from "./TitleInfo"
import { SizeInfo } from "./SizeInfo"
import { Classification } from "./Classification"

interface ArtworkMetadataProps {
  artwork: {
    readonly title: string
    readonly date: string
    readonly medium: string
    readonly dimensions: {
      in: string
      cm: string
    }
    readonly edition_of: string
    readonly attribution_class: {
      short_description: string
    }
    readonly edition_sets: Array<{
      id: string
    }>
  }
}

const ArtworkMetadataContainer = styled.div.attrs<SpaceProps>({})`
  ${space};
`

export class ArtworkMetadata extends React.Component<ArtworkMetadataProps> {
  render() {
    const { artwork } = this.props
    return (
      <ArtworkMetadataContainer pb={4}>
        <TitleInfo artwork={artwork} />
        {artwork.edition_sets.length > 1 ? "" : <SizeInfo artwork={artwork} />}
        <Classification artwork={artwork} />
      </ArtworkMetadataContainer>
    )
  }
}
