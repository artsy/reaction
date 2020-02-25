import { ErrorPage } from "Components/ErrorPage"
import { RouteConfig } from "found"
import React from "react"
import { graphql } from "react-relay"
// import createLogger from "Utils/logger"
import { CollectorVerificationApp } from "./CollectorVerificationApp"

// const logger = createLogger("Apps/CollectorVerification/routes")

export const routes: RouteConfig[] = [
  {
    path: "/identity-verification/:id",
    Component: CollectorVerificationApp,
    query: graphql`
      query routes_CollectorVerificationAppQuery($id: String!) {
        me {
          ...CollectorVerificationApp_me @arguments(id: $id)
          internalID
          identityVerification(id: $id) {
            userID
          }
        }
      }
    `,
  },
]
