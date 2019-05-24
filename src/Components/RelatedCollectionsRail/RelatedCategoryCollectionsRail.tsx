import { RelatedCollectionsRailQuery } from "__generated__/RelatedCollectionsRailQuery.graphql"
import { SystemContextConsumer } from "Artsy"
import React from "react"
import { graphql, QueryRenderer } from "react-relay"
import { RelatedCollectionsRailFragmentContainer as RelatedCollectionsRail } from "./RelatedCollectionsRail"

interface Props {
  artistID: string
  isFeaturedArtistContent?: boolean
}

export const RelatedCollectionsRailContent: React.SFC<Props> = passedProps => {
  return (
    <SystemContextConsumer>
      {({ relayEnvironment }) => {
        return (
          <QueryRenderer<RelatedCollectionsRailQuery>
            environment={relayEnvironment}
            variables={{
              isFeaturedArtistContent: true,
              size: 8,
              artistID: passedProps.artistID,
            }}
            query={graphql`
              query RelatedCollectionsRailQuery(
                $isFeaturedArtistContent: Boolean
                $size: Int
                $artistID: String
              ) {
                collections: marketingCollections(
                  isFeaturedArtistContent: $isFeaturedArtistContent
                  size: $size
                  artistID: $artistID
                ) {
                  ...RelatedCollectionsRail_collections
                }
              }
            `}
            render={({ props }) => {
              if (props) {
                return <RelatedCollectionsRail {...props} />
              } else {
                return null
              }
            }}
            cacheConfig={{ force: true }}
          />
        )
      }}
    </SystemContextConsumer>
  )
}
