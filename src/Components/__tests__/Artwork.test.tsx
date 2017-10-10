import * as React from "react"
import * as renderer from "react-test-renderer"

import "jest-styled-components"

import Artwork from "../artwork"

describe("Artwork", () => {
  it("renders correctly", () => {
    const artworkProps = {
      id: "mikael-olson-some-kind-of-dinosaur",
      title: "Some Kind of Dinosaur",
      date: "2015",
      sale_message: "$875",
      is_in_auction: false,
      image: {
        placeholder: 200,
        url: "artsy.net/image-url",
        aspect_ratio: 0.74,
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

    const artwork = renderer.create(<Artwork artwork={artworkProps} />).toJSON()
    expect(artwork).toMatchSnapshot()
  })
})
