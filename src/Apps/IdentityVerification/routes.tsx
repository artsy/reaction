import loadable from "@loadable/component"
import { RouteConfig } from "found"
import { graphql } from "react-relay"

const Processing = loadable(() => import("./Processing"))

export const routes: RouteConfig[] = [
  {
    path: "/identity-verification/processing",
    getComponent: () => Processing,
  },
  {
    path: "/identity-verification/:id",
    getComponent: () => loadable(() => import("./IdentityVerificationApp")),
    prepare: () => {
      Processing.preload()
    },
    query: graphql`
      query routes_IdentityVerificationAppQuery($id: String!)
        @raw_response_type {
        me {
          ...IdentityVerificationApp_me @arguments(id: $id)
        }
      }
    `,
  },
]
