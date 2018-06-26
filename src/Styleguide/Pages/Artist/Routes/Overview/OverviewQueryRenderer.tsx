import { ContextConsumer, ContextProps } from "Components/Artsy"
import React from "react"
import { graphql, QueryRenderer } from "react-relay"

import { ArtistBioFragmentContainer } from "Styleguide/Components/ArtistBio"

interface Props extends ContextProps {
  artistID: string
}

export const OverviewQueryRenderer = ContextConsumer(
  class extends React.Component<Props> {
    render() {
      const { artistID, relayEnvironment } = this.props
      return (
        <QueryRenderer
          environment={relayEnvironment}
          query={graphql`
            query OverviewQueryRendererQuery($artistID: String!) {
              artist(id: $artistID) {
                ...ArtistBio_bio
              }
            }
          `}
          variables={{ artistID }}
          render={({ props }) => {
            if (props) {
              return <ArtistBioFragmentContainer bio={props.artist as any} />
            } else {
              return null
            }
          }}
        />
      )
    }
  }
)
