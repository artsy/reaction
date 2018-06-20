import { ContextConsumer, ContextProps } from "Components/Artsy"
import React from "react"
import { graphql, QueryRenderer } from "react-relay"
import { Subscribe } from "unstated"

import { FilterState } from "./state"

import Container from "./AuctionResults"

interface Props extends ContextProps {
  artistID: string
}

class AuctionResults extends React.Component<Props> {
  render() {
    const { artistID, relayEnvironment } = this.props

    return (
      <Subscribe to={[FilterState]}>
        {filters => {
          const { sort } = filters.state
          return (
            <QueryRenderer
              environment={relayEnvironment}
              query={graphql`
                query AuctionResultsIndexQuery(
                  $artistID: String!
                  $first: Int!
                  $sort: AuctionResultSorts
                ) {
                  artist(id: $artistID) {
                    ...AuctionResults_artist
                      @arguments(first: $first, sort: $sort)
                  }
                }
              `}
              variables={{ artistID, first: 20, sort }}
              render={({ props }) => {
                if (props) {
                  return <Container artist={props.artist} />
                } else {
                  return null
                }
              }}
            />
          )
        }}
      </Subscribe>
    )
  }
}

export const AuctionResultsContainer = ContextConsumer(AuctionResults)
