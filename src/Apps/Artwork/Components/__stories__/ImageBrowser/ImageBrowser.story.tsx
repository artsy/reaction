import { Box } from "@artsy/palette"
import { ImageBrowserQueryRenderer } from "Apps/Artwork/Components/ImageBrowser"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Col } from "Styleguide/Elements/Grid"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Styleguide/Artwork/ImageBrowser", module).add("ImageBrowser", () => {
  return (
    <>
      <Section title="Multiple images (responsive)">
        <Box width={"100%"}>
          <ImageBrowserQueryRenderer artworkID="andy-warhol-lenin-fs-ii-dot-402-1" />
        </Box>
      </Section>
      <Section title="Single image">
        <Col sm="8">
          <ImageBrowserQueryRenderer artworkID="pablo-picasso-david-et-bethsabee" />
        </Col>
      </Section>
    </>
  )
})
