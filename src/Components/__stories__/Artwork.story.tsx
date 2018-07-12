import { storiesOf } from "@storybook/react"
import React from "react"
import { graphql } from "react-relay"

import { RootQueryRenderer } from "../../Relay/RootQueryRenderer"
import RelayArtwork, { Artwork } from "../Artwork"

function ArtworkExample(props: { artworkID: string }) {
  return (
    <RootQueryRenderer
      query={graphql`
        query ArtworkQuery($artworkID: String!) {
          artwork(id: $artworkID) {
            ...Artwork_artwork
          }
        }
      `}
      variables={{ artworkID: props.artworkID }}
      render={readyState =>
        readyState.props && <RelayArtwork {...readyState.props as any} />}
    />
  )
}

storiesOf("Legacy/Components/Artwork/Singular", module)
  .add("A square artwork", () => (
    <ArtworkExample artworkID="christopher-burkett-coastal-storm-oregon" />
  ))
  .add("A landscape artwork", () => (
    <ArtworkExample artworkID="andrew-moore-puente-de-bacunayagua-via-blanca" />
  ))
  .add("A landscape artwork (extra wide)", () => (
    <ArtworkExample artworkID="brian-kosoff-bay-of-islands" />
  ))
  .add("A portrait artwork", () => (
    <ArtworkExample artworkID="helen-frankenthaler-madame-de-pompadour-2" />
  ))
  .add("A portrait artwork (extra tall)", () => (
    <ArtworkExample artworkID="snik-untitled-vertical" />
  ))
  .add("Without Relay", () => {
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

    return <Artwork artwork={artwork as any} useRelay={false} />
  })
