import React, { useContext } from "react"
import { graphql, QueryRenderer } from "react-relay"

import { CollectionsRailQuery } from "__generated__/CollectionsRailQuery.graphql"
import { SystemContext } from "Artsy"
import { CollectionsRailFragmentContainer as CollectionsRail } from "./CollectionsRail"

interface Props {
  articleId?: string
  showOnEditorial?: boolean
}

export const CollectionsRailContent: React.FC<Props> = passedProps => {
  const { relayEnvironment } = useContext(SystemContext)
  return (
    <QueryRenderer<CollectionsRailQuery>
      environment={relayEnvironment}
      variables={{
        showOnEditorial: true,
        size: 4,
        randomizationSeed: passedProps.articleId,
      }}
      query={graphql`
        query CollectionsRailQuery(
          $showOnEditorial: Boolean
          $size: Int
          $randomizationSeed: String
        ) {
          collections: marketingCollections(
            showOnEditorial: $showOnEditorial
            size: $size
            randomizationSeed: $randomizationSeed
          ) {
            ...CollectionsRail_collections
          }
        }
      `}
      render={({ props }) => {
        if (props) {
          return <CollectionsRail {...props} />
        } else {
          return null
        }
      }}
      cacheConfig={{ force: true }}
    />
  )
}
