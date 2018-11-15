import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Col } from "Styleguide/Elements/Grid"
import { Section } from "Styleguide/Utils/Section"
import { ArtworkImagesQueryRenderer } from "../ArtworkImages"

storiesOf("Styleguide/Artwork", module).add("ArtworkImage", () => {
  return (
    <>
      <Section title="Multiple images">
        <Col sm="8">
          <ArtworkImagesQueryRenderer artworkID="andy-warhol-lenin-fs-ii-dot-402-1" />
        </Col>
      </Section>
      <Section title="Single image">
        <Col sm="8">
          <ArtworkImagesQueryRenderer artworkID="pablo-picasso-david-et-bethsabee" />
        </Col>
      </Section>
    </>
  )
})
