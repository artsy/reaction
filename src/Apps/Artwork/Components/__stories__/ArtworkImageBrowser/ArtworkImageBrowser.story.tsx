import { Box } from "@artsy/palette"
import { ArtworkImageBrowserQueryRenderer } from "Apps/Artwork/Components/ArtworkImageBrowser"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Col } from "Styleguide/Elements/Grid"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Apps/Artwork Page/Components/ArtworkImageBrowser", module).add(
  "ArtworkBrowser",
  () => {
    return (
      <>
        <Section title="Multiple images (responsive)">
          <Box width={"100%"}>
            <ArtworkImageBrowserQueryRenderer artworkID="andy-warhol-lenin-fs-ii-dot-402-1" />
          </Box>
        </Section>
        <Section title="Single image">
          <Col sm="8">
            <ArtworkImageBrowserQueryRenderer artworkID="pablo-picasso-david-et-bethsabee" />
          </Col>
        </Section>
      </>
    )
  }
)
