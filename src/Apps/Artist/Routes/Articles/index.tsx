import { Articles_artist } from "__generated__/Articles_artist.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArticlesRefetchContainer as Articles } from "./ArticlesRefetchContainer"

export interface ArticlesRouteProps {
  artist: Articles_artist
}

export const ArticlesRoute: React.SFC<ArticlesRouteProps> = props => {
  return <Articles artist={props.artist as any} />
}

export const ArticlesRouteFragmentContainer = createFragmentContainer(
  ArticlesRoute,
  graphql`
    fragment Articles_artist on Artist {
      ...ArticlesRefetchContainer_artist
    }
  `
)
