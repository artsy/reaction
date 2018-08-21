import React from "react"
import { graphql, QueryRenderer } from "react-relay"

import { ContextConsumer, ContextProps } from "Components/Artsy"
import WorksForYouArtist from "./WorksForYouArtist"
import WorksForYouContent from "./WorksForYouContents"

export interface Props extends ContextProps {
  artistID?: string
}

class WorksForYou extends React.Component<Props> {
  render() {
    const { relayEnvironment, artistID } = this.props
    return (
      <QueryRenderer
        environment={relayEnvironment}
        query={graphql`
          query WorksForYouQuery(
            $includeSelectedArtist: Boolean!
            $artistID: String!
          ) {
            viewer {
              ...WorksForYouContents_viewer @skip(if: $includeSelectedArtist)
              ...WorksForYouArtist_viewer
                @include(if: $includeSelectedArtist)
                @arguments(artistID: $artistID)
            }
          }
        `}
        variables={{ artistID, includeSelectedArtist: !!artistID }}
        render={({ props }) => {
          const includeSelectedArtist = !!this.props.artistID
          if (props) {
            if (includeSelectedArtist) {
              return (
                <WorksForYouArtist
                  artistID={this.props.artistID}
                  viewer={props.viewer}
                />
              )
            } else {
              return <WorksForYouContent viewer={props.viewer} />
            }
          } else {
            return null
          }
        }}
      />
    )
  }
}

export const Contents = ContextConsumer(WorksForYou)
