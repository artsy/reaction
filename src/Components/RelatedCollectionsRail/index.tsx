// import { ArtistCollectionsRailQuery } from "__generated__/ArtistCollectionsRailQuery.graphql"
import { RelatedCollectionsRailQuery } from "__generated__/RelatedCollectionsRailQuery.graphql"
import { SystemContextConsumer } from "Artsy"
import React from "react"
import { graphql, QueryRenderer } from "react-relay"
import { RelatedCollectionsRailFragmentContainer as RelatedCollectionsRail } from "./RelatedCollectionsRail"

interface Props {
  category: string
  showOnEditorial?: boolean
}

export const RelatedCollectionsRailContent: React.SFC<Props> = passedProps => {
  return (
    <SystemContextConsumer>
      {({ relayEnvironment }) => {
        return (
          <QueryRenderer<RelatedCollectionsRailQuery>
            environment={relayEnvironment}
            variables={{
              showOnEditorial: true,
              size: 8,
              category: passedProps.category,
            }}
            query={graphql`
              query RelatedCollectionsRailQuery(
                $showOnEditorial: Boolean
                $size: Int
                $category: String
              ) {
                collections: marketingCollections(
                  showOnEditorial: $showOnEditorial
                  size: $size
                  category: $category
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
