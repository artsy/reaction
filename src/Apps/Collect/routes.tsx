import React from "react"
import { graphql } from "react-relay"
import { CollectAppFragmentContainer as CollectApp } from "./CollectApp"

export const routes = [
  {
    path: "/collect",
    Component: CollectApp,
    query: graphql`
      query routes_CollectAppQuery {
        ...CollectApp_query
      }
    `,
    render: ({ props, Component }) => {
      if (!props) {
        return null
      }

      const { __fragments, __id, ...remainingProps } = props
      return <Component {...remainingProps} query={{ __id, __fragments }} />
    },
  },
]
