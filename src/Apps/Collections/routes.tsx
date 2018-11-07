import { RouteConfig } from "found"
import React from "react"
import { graphql } from "react-relay"
import { CollectionsAppFragmentContainer as CollectionsApp } from "./CollectionsApp"

export const routes: RouteConfig[] = [
  {
    path: "/collections",
    Component: CollectionsApp,
    query: graphql`
      query routes_MarketingCollectionsAppQuery {
        collections: marketingCollections {
          ...CollectionsApp_collections
        }
      }
    `,
    render: ({ props, Component }) => {
      if (!props) {
        return null
      }

      return <Component {...props} />
    },
  },
]
