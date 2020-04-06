import loadable from "@loadable/component"
import { RouteConfig } from "found"
import { graphql } from "react-relay"

const FeatureApp = loadable(() => import("./FeatureApp"))

export const routes: RouteConfig[] = [
  {
    path: "/campaign/art-keeps-going",
    getComponent: () => FeatureApp,
    prepare: () => {
      FeatureApp.preload()
    },
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
      const collectionIDs = data?.browse?.collections_rail?.items ?? []
      const fairIDs = data?.browse?.fairs_rail?.items ?? []
      const auctionIDs = data?.browse?.auctions_rail?.items ?? []

      return {
        articleIDs: data?.editorial?.article_ids,
        selectedWorksSetID: data?.selected_works?.set_id,
        collectionRailItemIDs:
          collectionIDs.length && collectionIDs.map(item => item.id),
        auctionRailItemIDs:
          auctionIDs.length && auctionIDs.map(item => item.id),
        fairRailItemIDs: fairIDs.length && fairIDs.map(item => item.id),
      }
    },
  },
]
