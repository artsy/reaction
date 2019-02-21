import React from "react"
import { graphql, QueryRenderer } from "react-relay"

import { CollectionsRailQuery } from "__generated__/CollectionsRailQuery.graphql"
import { ContextConsumer } from "Artsy"
import { CollectionsRailFragmentContainer as CollectionsRail } from "./CollectionsRail"

interface Props {
  showOnEditorial?: boolean
}

export class CollectionsRailContent extends React.Component<Props, null> {
  render() {
    return (
      <ContextConsumer>
        {({ relayEnvironment }) => {
          return (
            <QueryRenderer<CollectionsRailQuery>
              environment={relayEnvironment}
              variables={{
                showOnEditorial: true,
                size: 4,
              }}
              query={graphql`
                query CollectionsRailQuery {
                  collections: marketingCollections(
                    showOnEditorial: true
                    size: 4
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
        }}
      </ContextConsumer>
    )
  }
}
