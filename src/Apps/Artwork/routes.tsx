import loadable from "@loadable/component"
import { graphql } from "react-relay"

export const routes = [
  {
    path: "/artwork/:artworkID/(confirm-bid)?",
    getComponent: () => loadable(() => import("./ArtworkApp")),
    query: graphql`
      query routes_ArtworkQuery($artworkID: String!) {
        artwork(id: $artworkID) @principalField {
          ...ArtworkApp_artwork
        }
      }
    `,
    cacheConfig: {
      force: true,
    },
  },
]
