import { ContextConsumer, ContextProps } from "Components/Artsy"
import React from "react"
import { graphql, QueryRenderer } from "react-relay"
import { Subscribe } from "unstated"
import { AuctionResultsRefetchContainer } from "./AuctionResultsRefetchContainer"
import { FilterState } from "./state"

const PAGE_SIZE = 10

interface Props extends ContextProps {
  artistID: string
}

export const AuctionResultsQueryRenderer = ContextConsumer(
  class extends React.Component<Props> {
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
                  query AuctionResultsQueryRendererQuery(
                    $artistID: String!
                    $first: Int!
                    $sort: AuctionResultSorts
                  ) {
                    artist(id: $artistID) {
                      ...AuctionResultsRefetchContainer_artist
                        @arguments(first: $first, sort: $sort)
                    }
                  }
                `}
                variables={{
                  artistID,
                  first: PAGE_SIZE,
                  sort,
                }}
                render={({ props }) => {
                  if (props) {
                    return (
                      <AuctionResultsRefetchContainer artist={props.artist} />
                    )
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
)
