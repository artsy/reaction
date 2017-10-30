import { storiesOf } from "@storybook/react"
import * as React from "react"
import { injectNetworkLayer, Store } from "react-relay/classic"
import { graphql, QueryRenderer } from "react-relay/compat"

import InquiryArtwork from "../InquiryArtwork"

import { artsyNetworkLayer } from "../../Relay/config"

function ArtworkExample(props: { artworkID: string }) {
  injectNetworkLayer(artsyNetworkLayer())
  return (
    <QueryRenderer
      environment={Store as any}
      query={graphql`
        query InquiryArtworkQuery($artworkID: String!) {
          artwork(id: $artworkID) {
            ...InquiryArtwork_artwork
          }
        }
      `}
      variables={{ artworkID: props.artworkID }}
      render={readyState => readyState.props && <InquiryArtwork {...readyState.props as any} />}
    />
  )
}

storiesOf("Components/Inquiry Artwork", module)
  .add("A square artwork", () => <ArtworkExample artworkID="christopher-burkett-coastal-storm-oregon" />)
  .add("A landscape artwork", () => <ArtworkExample artworkID="andrew-moore-puente-de-bacunayagua-via-blanca" />)
  .add("A landscape artwork (extra wide)", () => <ArtworkExample artworkID="brian-kosoff-bay-of-islands" />)
  .add("A portrait artwork", () => (
    <ArtworkExample artworkID="damien-hirst-methylamine-13c-19?auction_id=heather-james-fine-art-curators-choice" />
  ))
  .add("A portrait artwork (extra tall)", () => <ArtworkExample artworkID="snik-untitled-vertical" />)
  .add("Artwork with two artists", () => (
    <ArtworkExample artworkID="/william-kentridge-self-portrait-as-a-coffee-pot-iii" />
  ))
