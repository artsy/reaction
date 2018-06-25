import { ContextConsumer, ContextProps } from "Components/Artsy"
import React from "react"
import { graphql, QueryRenderer } from "react-relay"
import { Subscribe } from "unstated"

import { ArtworkFilterContainer } from "./ArtworkFilterContainer"
import { FilterState } from "./ArtworkFilterState"

interface Props extends ContextProps {
  artistID: string
}

export const ArtworkFilterQueryRenderer = ContextConsumer(
  class extends React.Component<Props, null> {
    render() {
      const { artistID, relayEnvironment } = this.props

      return (
        <Subscribe to={[FilterState]}>
          {filters => {
            const { page, ...filtersWithoutPage } = filters.state
            return (
              <QueryRenderer
                environment={relayEnvironment}
                query={graphql`
                  query ArtworkFilterQueryRendererQuery(
                    $artistID: String!
                    $medium: String
                    $major_periods: [String]
                    $partner_id: ID
                    $for_sale: Boolean
                  ) {
                    artist(id: $artistID) {
                      ...ArtworkFilterContainer_artist
                        @arguments(
                          medium: $medium
                          major_periods: $major_periods
                          partner_id: $partner_id
                          for_sale: $for_sale
                        )
                    }
                  }
                `}
                variables={{ artistID, ...filtersWithoutPage }}
                render={({ props }) => {
                  if (props) {
                    return (
                      <ArtworkFilterContainer artist={props.artist as any} />
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
