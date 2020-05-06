import loadable from "@loadable/component"
import { graphql } from "react-relay"

const ViewingRoomApp = loadable(() => import("./ViewingRoomApp"))

export const routes = [
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
  },
]
