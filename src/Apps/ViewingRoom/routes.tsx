import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { RouteConfig } from "found"

const ViewingRoomApp = loadable(() => import("./ViewingRoomApp"))
const StatementRoute = loadable(() => import("./Routes/Statement"))
const WorksRoute = loadable(() => import("./Routes/Works"))

export const routes: RouteConfig[] = [
  {
    path: "/viewing-room",
    getComponent: () => ViewingRoomApp,
    prepare: () => {
      ViewingRoomApp.preload()
    },
    query: graphql`
      query routes_ViewingRoomQuery {
        artist(id: "pablo-picasso") {
          id
        }
      }
    `,
    children: [
      {
        path: "/(statement)?",
        Component: StatementRoute,
      },
      {
        path: "works",
        Component: WorksRoute,
      },
    ],
  },
]
