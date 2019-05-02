import { Image } from "@artsy/palette"
import { Lightbox } from "Components/v2"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Utils/Section"

const image = size =>
  `https://d32dm0rphc51dk.cloudfront.net/88LaQZxzQdksn76f0LGFoQ/${size}.jpg`
const width = 912
const height = 608
const deepZoom = {
  Image: {
    xmlns: "http://schemas.microsoft.com/deepzoom/2008",
    Url:
      "https://d32dm0rphc51dk.cloudfront.net/88LaQZxzQdksn76f0LGFoQ/dztiles/",
    Format: "jpg",
    Overlap: 0,
    TileSize: 512,
    Size: {
      Width: 912,
      Height: 608,
    },
  },
}

storiesOf("Styleguide/Components", module).add("Lightbox", () => {
  return (
    <React.Fragment>
      <Section title="Lightbox">
        <Lightbox title="Untitled" deepZoom={deepZoom}>
          <Image width={width} height={height} src={image("large")} />
        </Lightbox>
      </Section>
      <div id="lightbox-container" />
    </React.Fragment>
  )
})
