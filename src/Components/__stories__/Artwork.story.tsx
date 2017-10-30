import { storiesOf } from "@storybook/react"
import * as React from "react"
import { injectNetworkLayer, Store } from "react-relay/classic"
import { graphql, QueryRenderer } from "react-relay/compat"

import Artwork from "../Artwork"

import { artsyNetworkLayer } from "../../Relay/config"

function ArtworkExample(props: { artworkID: string }) {
  injectNetworkLayer(artsyNetworkLayer())
  return (
    <QueryRenderer
      environment={Store as any}
      query={graphql`
        query ArtworkQuery($artworkID: String!) {
          artwork(id: $artworkID) {
            ...Artwork_artwork
          }
        }
      `}
      variables={{ artworkID: props.artworkID }}
      render={readyState => readyState.props && <Artwork {...readyState.props as any} />}
    />
  )
}

storiesOf("Components/Artwork/Singular", module)
  .add("A square artwork", () => <ArtworkExample artworkID="christopher-burkett-coastal-storm-oregon" />)
  .add("A landscape artwork", () => <ArtworkExample artworkID="andrew-moore-puente-de-bacunayagua-via-blanca" />)
  .add("A landscape artwork (extra wide)", () => <ArtworkExample artworkID="brian-kosoff-bay-of-islands" />)
  .add("A portrait artwork", () => <ArtworkExample artworkID="ester-curini-my-eyes-my-soul" />)
  .add("A portrait artwork (extra tall)", () => <ArtworkExample artworkID="snik-untitled-vertical" />)
