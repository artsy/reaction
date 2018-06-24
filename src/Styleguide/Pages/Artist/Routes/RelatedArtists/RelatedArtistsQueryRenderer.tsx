import { ContextConsumer, ContextProps } from "Components/Artsy"
import React from "react"
import { QueryRenderer } from "react-relay"
import { RelatedArtistsQuery } from "./RelatedArtistsQuery"

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
          query={RelatedArtistsQuery}
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
