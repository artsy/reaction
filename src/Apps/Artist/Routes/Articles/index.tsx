import { Articles_artist } from "__generated__/Articles_artist.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistArticlesRefetchContainer as Articles } from "./ArtistArticles"

export interface ArticlesRouteProps {
  artist: Articles_artist
}

export const ArticlesRoute: React.SFC<ArticlesRouteProps> = props => {
  return <Articles artist={props.artist} />
}

export const ArticlesRouteFragmentContainer = createFragmentContainer(
  ArticlesRoute,
  {
    artist: graphql`
      fragment Articles_artist on Artist {
        ...ArtistArticles_artist
      }
    `,
  }
)
