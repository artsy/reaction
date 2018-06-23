import { graphql } from "react-relay"

export const RelatedArtistsQuery = graphql`
  query RelatedArtistsQueryRendererQuery(
    $artistID: String!
    $first: Int!
    $kind: RelatedArtistsKind!
  ) {
    artist(id: $artistID) {
      ...RelatedArtistsRefetchContainer_artist
        @arguments(kind: $kind, first: $first)
    }
  }
`
