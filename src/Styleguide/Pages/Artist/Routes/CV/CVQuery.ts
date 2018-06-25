import { graphql } from "react-relay"

export const CVQuery = graphql`
  query CVQuery(
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
`
