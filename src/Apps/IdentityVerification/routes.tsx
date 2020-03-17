import loadable from "@loadable/component"
import { RouteConfig } from "found"
import { graphql } from "react-relay"

export const routes: RouteConfig[] = [
  {
    path: "/identity-verification/processing",
    getComponent: () => loadable(() => import("./Processing")),
  },
  {
    path: "/identity-verification/:id",
    getComponent: () => loadable(() => import("./IdentityVerificationApp")),
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
