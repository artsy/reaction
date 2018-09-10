import { createMockNetworkLayer } from "Artsy/Relay/createMockNetworkLayer"
import { IResolvers } from "graphql-tools/dist/Interfaces"
import React from "react"
import { QueryRenderer } from "react-relay"
import {
  Environment,
  GraphQLTaggedNode,
  RecordSource,
  Store,
} from "relay-runtime"

export interface MockRelayRendererProps {
  Component: React.ComponentType
  query: GraphQLTaggedNode
  mockResolvers: IResolvers
}

export const MockRelayRenderer = ({
  Component,
  query,
  mockResolvers,
}: MockRelayRendererProps) => {
  const network = createMockNetworkLayer({
    Query: () => ({}),
    ...mockResolvers,
  })
  const source = new RecordSource()
  const store = new Store(source)
  const environment = new Environment({
    network,
    store,
  })

  return (
    <QueryRenderer
      // tslint:disable-next-line relay-operation-generics
      query={query}
      environment={environment}
      variables={{}}
      render={({ error, props, retry }) => {
        return error || !props ? <div>{error}</div> : <Component {...props} />
      }}
    />
  )
}
