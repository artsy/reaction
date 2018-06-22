import { ContextConsumer, ContextProps } from "Components/Artsy"
import React from "react"
import { graphql, QueryRenderer } from "react-relay"

import {
  PAGE_SIZE,
  RelatedArtistsRefetchContainer,
} from "./RelatedArtistsRefetchContainer"

interface Props extends ContextProps {
  artistID: string
  kind: string
}

export const RelatedArtistsQueryRenderer = ContextConsumer(
  class extends React.Component<Props> {
    render() {
      const { artistID, relayEnvironment, kind } = this.props
      return (
        <QueryRenderer
          environment={relayEnvironment}
          query={graphql`
            query RelatedArtistsQueryRendererQuery(
              $artistID: String!
              $first: Int!
              $kind: RelatedArtistsKind!
            ) {
              artist(id: $artistID) {
                ...RelatedArtistsRefetchContainer_artist
                  @arguments(kind: $kind, first: $first)
              }
            }
          `}
          variables={{ artistID, first: PAGE_SIZE, kind }}
          render={({ props }) => {
            if (props) {
              return (
                <RelatedArtistsRefetchContainer
                  kind={kind}
                  artist={props.artist}
                />
              )
            } else {
              return null
            }
          }}
        />
      )
    }
  }
)
