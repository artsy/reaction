import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { RouteConfig } from "found"

const ViewingRoomApp = loadable(() => import("./ViewingRoomApp"))
const StatementRoute = loadable(() =>
  import("./Routes/Statement/ViewingRoomStatementRoute")
)
const WorksRoute = loadable(() =>
  import("./Routes/Works/ViewingRoomWorksRoute")
)

export const routes: RouteConfig[] = [
  {
    path: "/viewing-room/:slug",
    getComponent: () => ViewingRoomApp,
    prepare: () => {
      ViewingRoomApp.preload()
      StatementRoute.preload()
      WorksRoute.preload()
    },
    query: graphql`
      query routes_ViewingRoomQuery($slug: ID!) {
        viewingRoom(id: $slug) {
          ...ViewingRoomApp_viewingRoom
        }
      }
    `,
    children: [
      {
        path: "/",
        Component: StatementRoute,

        query: graphql`
          query routes_ViewingRoomStatementRouteQuery($slug: ID!) {
            viewingRoom(id: $slug) {
              ...ViewingRoomStatementRoute_viewingRoom
            }
          }
        `,
      },
      {
        path: "/works",
        Component: WorksRoute,
        query: graphql`
          query routes_ViewingRoomWorksRouteQuery($slug: ID!) {
            viewingRoom(id: $slug) {
              ...ViewingRoomWorksRoute_viewingRoom
            }
          }
        `,
      },
    ],
  },
]
