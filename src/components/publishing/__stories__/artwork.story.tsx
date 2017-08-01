import { storiesOf } from "@storybook/react"
import * as React from "react"

import Artwork from "../sections/artwork"

import { Artworks } from "../__test__/fixtures/components"

storiesOf("Publishing/Artwork", module).add("Artwork", () => {
  return (
    <div>
      <div style={{ width: 800 }}>
        <Artwork artwork={Artworks[0]} />
      </div>
      <hr />
      <p>Multiple Artists: </p>
      <div style={{ width: 800 }}>
        <Artwork artwork={Artworks[1]} />
      </div>
      <hr />
      <p>Unlinked: </p>
      <div style={{ width: 800 }}>
        <Artwork linked={false} artwork={Artworks[1]} />
      </div>
      <hr />
      <p>Missing info: </p>
      <div style={{ width: 800 }}>
        <Artwork artwork={Artworks[2]} />
      </div>
      <hr />
      <p>Small: </p>
      <div style={{ width: 400 }}>
        <Artwork artwork={Artworks[1]} />
      </div>
      <hr />
      <p>Classic: </p>
      <div style={{ width: 800 }}>
        <Artwork artwork={Artworks[0]} layout="classic" />
      </div>
    </div>
  )
})
