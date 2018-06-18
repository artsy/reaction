import React from "react"
import { graphql, QueryRenderer } from "react-relay"
import { ContextProps, ContextConsumer } from "../../../../../Components/Artsy"

import Container from "./AuctionResults"

interface Props extends ContextProps {
  artistID: string
}

class ArtistFilter extends React.Component<Props, null> {
  render() {
    const { artistID, relayEnvironment } = this.props

    return (
      <QueryRenderer
        environment={relayEnvironment}
        query={graphql`
          query AuctionResultsIndexQuery($artistID: String!, $first: Int!) {
            artist(id: $artistID) {
              ...AuctionResults_artist @arguments(first: $first)
            }
          }
        `}
        variables={{ artistID, first: 20 }}
        render={({ props }) => {
          if (props) {
            return <Container artist={props.artist} />
          } else {
            return null
          }
        }}
      />
    )
  }
}

export const Browser = ContextConsumer(ArtistFilter)
