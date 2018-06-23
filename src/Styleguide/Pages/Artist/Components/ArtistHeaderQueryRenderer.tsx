import { ContextConsumer, ContextProps } from "Components/Artsy"
import React from "react"
import { graphql, QueryRenderer } from "react-relay"

import { ArtistHeaderFragmentContainer } from "./ArtistHeader"

interface Props extends ContextProps {
  artistID: string
}

export const ArtistHeaderQueryRenderer = ContextConsumer(
  class extends React.Component<Props> {
    render() {
      const { artistID, relayEnvironment } = this.props
      return (
        <QueryRenderer
          environment={relayEnvironment}
          query={graphql`
            query ArtistHeaderQueryRendererQuery($artistID: String!) {
              artist(id: $artistID) {
                ...ArtistHeader_artist
              }
            }
          `}
          variables={{ artistID }}
          render={({ props }) => {
            if (props) {
              return (
                <ArtistHeaderFragmentContainer artist={props.artist as any} />
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
