import React from "react"
import { graphql, QueryRenderer } from "react-relay"
import { ContextProps, ContextConsumer } from "../Artsy"
import { Subscribe } from "unstated"

import { FilterState } from "./state"
import FilterContainer from "./Filter"

interface Props extends ContextProps {
  artistID: string
}

class ArtistFilter extends React.Component<Props, null> {
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
                query ArtistFilterArtworksQuery(
                  $artistID: String!
                  $medium: String
                  $major_periods: [String]
                  $partner_id: ID
                  $for_sale: Boolean
                ) {
                  artist(id: $artistID) {
                    ...Filter_artist
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
                  return <FilterContainer artist={props.artist} />
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

export const Browser = ContextConsumer(ArtistFilter)
