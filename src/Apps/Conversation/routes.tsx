import { graphql } from "react-relay"

// @ts-ignore
import { RouteConfig } from "found"
import { ConversationAppFragmentContainer as ConversationApp } from "./ConversationApp"
import { DetailFragmentContainer as DetailRoute } from "./Routes/Detail"

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
  {
    path: "/user/conversations/:conversationID",
    Component: DetailRoute,
    prepareVariables: (params, _props) => {
      return {
        conversationID: params.conversationID,
      }
    },
    query: graphql`
      query routes_DetailQuery {
        me {
          ...Detail_me
        }
      }
    `,
    cacheConfig: {
      force: true,
    },
  },
]
