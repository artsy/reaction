import loadable from "@loadable/component"
import { RouteConfig } from "found"
import { graphql } from "react-relay"

export const routes: RouteConfig[] = [
  {
    path: "/identity-verification/:id",
    getComponent: () => loadable(() => import("./IdentityVerificationPage")),
    query: graphql`
      query routes_IdentityVerificationPageQuery($id: String!) {
        me {
          ...IdentityVerificationPage_me @arguments(id: $id)
        }
      }
    `,
  },
]
