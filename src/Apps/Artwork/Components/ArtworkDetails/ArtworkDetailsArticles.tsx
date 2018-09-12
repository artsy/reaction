import { Box } from "@artsy/palette"
import React from "react"

interface ArtworkDetailsArticlesArtwork {
  readonly articles: ReadonlyArray<{
    readonly title?: string
    readonly href?: string
    readonly thumbnail?: {
      readonly image?: {
        readonly width: number
        readonly height: number
        readonly url: string
      }
    }
    readonly author?: {
      readonly name: string
    }
  }>
}
interface ArtworkDetailsArticlesProps {
  artwork: ArtworkDetailsArticlesArtwork
}

export class ArtworkDetailsArticles extends React.Component<
  ArtworkDetailsArticlesProps
> {
  render() {
    const { articles } = this.props.artwork
    if (!articles || articles.length < 1) {
      return null
    }
    return <Box>{articles.length}</Box>
  }
}
