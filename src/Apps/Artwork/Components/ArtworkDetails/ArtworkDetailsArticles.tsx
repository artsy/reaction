import { Box } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

import { ArtworkDetailsArticles_artwork } from "__generated__/ArtworkDetailsArticles_artwork.graphql"

export interface ArtworkDetailsArticlesProps {
  artwork: ArtworkDetailsArticles_artwork
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

export const ArtworkDetailsArticlesFragmentContainer = createFragmentContainer(
  ArtworkDetailsArticles,
  graphql`
    fragment ArtworkDetailsArticles_artwork on Artwork {
      articles(size: 2) {
        title
        href
        thumbnail: thumbnail_image {
          image: cropped(width: 150, height: 100) {
            width
            height
            url
          }
        }
        author {
          name
        }
      }
    }
  `
)
