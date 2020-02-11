import { graphql } from "react-relay"

// @ts-ignore
import { RouteConfig } from "found"
import { ConversationApp } from "./ConversationApp"

export const routes: RouteConfig[] = [
  {
    path: "/user/conversations",
    Component: ConversationApp,
    query: graphql`
      query routes_ConversationQuery {
        me {
          ...ConversationApp_me
        }
      }
    `,
    prepareVariables: (params, props) => {
      return {
        first: 10,
      }
    },
    cacheConfig: {
      force: true,
    },
  },
]
