import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArticlesRefetchContainer as Articles } from "./ArticlesRefetchContainer"

import { Articles_artist } from "__generated__/Articles_artist.graphql"

export interface Props {
  artist: Articles_artist
}

export class ArticlesRoute extends React.Component<Props> {
  render() {
    return <Articles artist={this.props.artist as any} />
  }
}

export const ArticlesRouteFragmentContainer = createFragmentContainer(
  ArticlesRoute,
  graphql`
    fragment Articles_artist on Artist {
      ...ArticlesRefetchContainer_artist
    }
  `
)
