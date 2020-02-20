import loadable from "@loadable/component"
import { graphql } from "react-relay"

// @ts-ignore
import { RouteConfig } from "found"

export const conversationRoutes: RouteConfig[] = [
  {
    path: "/user/conversations",
    getComponent: () => loadable(() => import("./ConversationApp")),
    query: graphql`
      query routes_ConversationQuery {
        me {
          ...ConversationApp_me
        }
      }
    `,
    prepareVariables: (params, props) => {
      return {
        first: 30,
      }
    },
    cacheConfig: {
      force: true,
    },
  },
  {
    path: "/user/conversations/:conversationID",
    getComponent: () => loadable(() => import("./Routes/Conversation")),
    prepareVariables: (params, _props) => {
      return {
        conversationID: params.conversationID,
      }
    },
    query: graphql`
      query routes_DetailQuery($conversationID: String!) {
        me {
          ...Conversation_me @arguments(conversationID: $conversationID)
        }
      }
    `,
    cacheConfig: {
      force: true,
    },
  },
]
