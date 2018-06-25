import { graphql } from "react-relay"

export const ShowsQuery = graphql`
  query ShowsQueryRendererQuery(
    $artistID: String!
    $first: Int!
    $sort: PartnerShowSorts
    $status: String!
  ) {
    artist(id: $artistID) {
      ...ShowsRefetchContainer_artist
        @arguments(sort: $sort, status: $status, first: $first)
    }
  }
`
