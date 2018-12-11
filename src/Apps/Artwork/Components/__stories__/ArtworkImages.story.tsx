import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Col } from "Styleguide/Elements/Grid"
import { Section } from "Styleguide/Utils/Section"
import { ImageBrowserQueryRenderer } from "../ImageBrowser"

storiesOf("Styleguide/Artwork", module).add("ImageBrowser", () => {
  return (
    <>
      <Section title="Multiple images">
        <Col sm="8">
          <ImageBrowserQueryRenderer artworkID="andy-warhol-lenin-fs-ii-dot-402-1" />
        </Col>
      </Section>
      <Section title="Single image">
        <Col sm="8">
          <ImageBrowserQueryRenderer artworkID="pablo-picasso-david-et-bethsabee" />
        </Col>
      </Section>
    </>
  )
})
