import { ContextConsumer, ContextProps } from "Components/Artsy"
import React from "react"
import { graphql, QueryRenderer } from "react-relay"
import { CVPaginationContainer, PAGE_SIZE } from "./CVPaginationContainer"

interface ShowFilter {
  at_a_fair: boolean
  solo_show?: boolean
  sort: string
  is_reference?: boolean
  visible_to_public?: boolean
}

interface Props extends ContextProps {
  artistID: string
  filters: ShowFilter
  category: string
}

export const CVQueryRenderer = ContextConsumer(
  class extends React.Component<Props> {
    render() {
      const { artistID, relayEnvironment, filters, category } = this.props
      return (
        <QueryRenderer
          environment={relayEnvironment}
          query={graphql`
            query CVQueryRendererQuery(
              $artistID: String!
              $first: Int!
              $sort: PartnerShowSorts
              $at_a_fair: Boolean
              $solo_show: Boolean
              $is_reference: Boolean
              $visible_to_public: Boolean
            ) {
              artist(id: $artistID) {
                ...CVPaginationContainer_artist
                  @arguments(
                    sort: $sort

                    first: $first
                    at_a_fair: $at_a_fair
                    solo_show: $solo_show
                    is_reference: $is_reference
                    visible_to_public: $visible_to_public
                  )
              }
            }
          `}
          variables={{ artistID, first: PAGE_SIZE, ...filters }}
          render={({ props }) => {
            if (props) {
              return (
                <CVPaginationContainer
                  category={category}
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
