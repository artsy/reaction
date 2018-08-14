import { storiesOf } from "@storybook/react"
import * as React from "react"
import { graphql } from "react-relay"

import { RootQueryRenderer } from "../../Relay/RootQueryRenderer"
import RelayMetadata, { Metadata } from "../Artwork/Metadata"

function ArtworkExample(props: { artworkID: string }) {
  return (
    <RootQueryRenderer
      query={graphql`
        query ArtworkMetadataQuery($artworkID: String!) {
          artwork(id: $artworkID) {
            ...Metadata_artwork
          }
        }
      `}
      variables={{ artworkID: props.artworkID }}
      render={readyState =>
        readyState.props && <RelayMetadata {...readyState.props as any} />
      }
    />
  )
}

storiesOf("Components/Artwork/Metadata", module)
  .add("A not-for-sale artwork", () => (
    <ArtworkExample artworkID="andy-warhol-skull" />
  ))
  .add("A for-sale artwork with exact price", () => (
    <ArtworkExample artworkID="stephen-berkman-a-history-of-dread" />
  ))
  .add("Without Relay", () => (
    <Metadata artwork={artwork as any} useRelay={false} />
  ))

const artwork = {
  id: "mikael-olson-some-kind-of-dinosaur",
  title: "Some Kind of Dinosaur",
  date: "2015",
  sale_message: "$875",
  is_in_auction: false,
  image: {
    url:
      "https://d32dm0rphc51dk.cloudfront.net/WhROiQBIHoXNIBr2zW3RUw/larger.jpg",
    aspect_ratio: 0.74,
    placeholder: "134.6445824706694%",
  },
  artists: [
    {
      __id: "mikael-olson",
      name: "Mikael Olson",
    },
  ],
  partner: {
    name: "Gallery 1261",
  },
  href: "/artwork/mikael-olson-some-kind-of-dinosaur",
}
