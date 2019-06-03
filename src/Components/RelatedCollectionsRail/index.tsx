import { RelatedCollectionsRailQuery } from "__generated__/RelatedCollectionsRailQuery.graphql"
import { SystemContext } from "Artsy"
import React, { useContext } from "react"
import { graphql, QueryRenderer } from "react-relay"
import { RelatedCollectionsRailFragmentContainer as RelatedCollectionsRail } from "./RelatedCollectionsRail"

interface Props {
  category: string
}

export const RelatedCollectionsRailContent: React.SFC<Props> = ({
  category,
}) => {
  const { relayEnvironment } = useContext(SystemContext)

  return (
    <QueryRenderer<RelatedCollectionsRailQuery>
      environment={relayEnvironment}
      variables={{
        showOnEditorial: true,
        size: 8,
        category,
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
}
