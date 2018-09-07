import React from "react"
import { QueryRenderer } from "react-relay"
import { Environment, RecordSource, Store } from "relay-runtime"
import { createMockNetworkLayer } from "../../Relay/createMockNetworkLayer"

export const StorybookRelay = ({
  Component,
  query,
  mockResolvers,
}: {
  Component: React.ComponentClass | React.SFC
  query: any
  mockResolvers: { [typeName: string]: () => any }
}) => {
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
      // tslint:disable-next-line
      query={query}
      environment={environment}
      variables={{}}
      render={({ error, props, retry }) => {
        return error || !props ? <div>{error}</div> : <Component {...props} />
      }}
    />
  )
}
