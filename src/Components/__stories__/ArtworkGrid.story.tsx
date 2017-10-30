import { storiesOf } from "@storybook/react"
import * as React from "react"
import { injectNetworkLayer, Store } from "react-relay/classic"
import { graphql, QueryRenderer } from "react-relay/compat"

import ArtworkGrid from "../ArtworkGrid"

import { artsyNetworkLayer } from "../../Relay/config"
import * as Artsy from "../Artsy"

function GridExample(props: { artistID: string }) {
  injectNetworkLayer(artsyNetworkLayer())
  return (
    <QueryRenderer
      environment={Store as any}
      query={graphql`
        query ArtworkGridQuery($artistID: String!) {
          artist(id: $artistID) {
            artworks: artworks_connection(first: 10) {
              ...ArtworkGrid_artworks
            }
          }
        }
      `}
      variables={{ artistID: props.artistID }}
      render={readyState => {
        return readyState.props && <ArtworkGrid {...readyState.props.artist as any} />
      }}
    />
  )
}

storiesOf("Components/Artworks/ArtworkGrid", module).add("A typical grid", () => {
  const user = {
    id: "some-id",
    accessToken: "some-token",
  } as User
  return (
    <Artsy.ContextProvider currentUser={user}>
      <GridExample artistID="banksy" />
    </Artsy.ContextProvider>
  )
})
