import loadable from "@loadable/component"
import { RouteConfig } from "found"
import { graphql } from "react-relay"

export const routes: RouteConfig[] = [
  {
    path: "/campaign/art-keeps-going",
    getComponent: () => loadable(() => import("./FeatureApp")),
    query: graphql`
      query routes_FeatureQuery(
        $articleIDs: [String]!
        $selectedWorksSetID: String!
        $collectionRailItemIDs: [String!]
        $auctionRailItemIDs: [String!]
        $fairRailItemIDs: [String!]
      ) {
        viewer {
          ...FeatureApp_viewer
            @arguments(
              articleIDs: $articleIDs
              selectedWorksSetID: $selectedWorksSetID
              collectionRailItemIDs: $collectionRailItemIDs
              auctionRailItemIDs: $auctionRailItemIDs
              fairRailItemIDs: $fairRailItemIDs
            )
        }
      }
    `,
    prepareVariables: (_params, props) => {
      const data = props.context.injectedData

      return {
        articleIDs: data.editorial.article_ids,
        selectedWorksSetID: data.selected_works.set_id,
        collectionRailItemIDs: data.browse.collections_rail.items.map(
          item => item.id
        ),
        auctionRailItemIDs: data.browse.auctions_rail.items.map(
          item => item.id
        ),
        fairRailItemIDs: data.browse.fairs_rail.items.map(item => item.id),
      }
    },
    cacheConfig: {
      force: true,
    },
  },
]
