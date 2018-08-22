import React from "react"
import { graphql, QueryRenderer } from "react-relay"

import { ContextConsumer, ContextProps } from "Components/Artsy"
import WorksForYouArtist from "./WorksForYouArtist"
import WorksForYouContent from "./WorksForYouContents"

export interface Props extends ContextProps {
  artistID?: string
  forSale?: boolean
}

class WorksForYou extends React.Component<Props> {
  static defaultProps = {
    forSale: true,
  }
  render() {
    const { relayEnvironment, artistID, forSale } = this.props
    const includeSelectedArtist = !!artistID
    const filter = forSale ? ["IS_FOR_SALE"] : null
    return (
      <QueryRenderer
        environment={relayEnvironment}
        query={graphql`
          query WorksForYouQuery(
            $includeSelectedArtist: Boolean!
            $artistID: String!
            $forSale: Boolean
            $filter: [ArtistArtworksFilters]
          ) {
            viewer {
              ...WorksForYouContents_viewer
                @skip(if: $includeSelectedArtist)
                @arguments(for_sale: $forSale)
              ...WorksForYouArtist_viewer
                @include(if: $includeSelectedArtist)
                @arguments(artistID: $artistID, filter: $filter)
            }
          }
        `}
        variables={{ artistID, includeSelectedArtist, forSale, filter }}
        render={({ props }) => {
          if (props) {
            if (includeSelectedArtist) {
              return (
                <WorksForYouArtist
                  artistID={this.props.artistID}
                  viewer={props.viewer}
                  forSale={forSale}
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
