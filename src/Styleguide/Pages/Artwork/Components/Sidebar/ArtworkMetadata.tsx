import React from "react"
import { Box } from "Styleguide/Elements/Box"
import { Classification } from "./Classification"
import { SizeInfo } from "./SizeInfo"
import { TitleInfo } from "./TitleInfo"

export interface ArtworkMetadataProps {
  artwork: {
    readonly __id: string
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
      readonly __id: string
    }>
  }
}

const ArtworkMetadataContainer = Box

export class ArtworkMetadata extends React.Component<ArtworkMetadataProps> {
  render() {
    const { artwork } = this.props
    return (
      <ArtworkMetadataContainer pb={3}>
        <TitleInfo artwork={artwork} />
        {artwork.edition_sets.length < 2 && <SizeInfo artwork={artwork} />}
        <Classification artwork={artwork} />
      </ArtworkMetadataContainer>
    )
  }
}
