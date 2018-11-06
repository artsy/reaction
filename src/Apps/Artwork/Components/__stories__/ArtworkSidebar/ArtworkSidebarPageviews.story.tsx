import { Box } from "@artsy/palette"
import {
  ArtworkSidebarPageviews,
  ArtworkSidebarPageviewsQueryRenderer,
} from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarPageviews"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Styleguide/Artwork/Sidebar", module).add("Pageviews", () => {
  return (
    <React.Fragment>
      <Section title="Artwork with > 10 views">
        <Box width="100%">
          <ArtworkSidebarPageviewsQueryRenderer artworkID="andy-warhol-skull" />
        </Box>
      </Section>
      <Section title="Artwork with < 10 views">
        <Box width="100%">
          <ArtworkSidebarPageviews
            artwork={{ id: "blah", pageviews: null } as any}
          />
        </Box>
      </Section>
    </React.Fragment>
  )
})
