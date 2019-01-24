import { Box } from "@artsy/palette"
import { artworkBricks } from "Apps/__tests__/Fixtures/Carousel"
import { RecentlyViewed } from "Components/v2"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Utils/Section"

storiesOf("Styleguide/Components", module).add("Recently Viewed", () => {
  return (
    <React.Fragment>
      <Section title="Recently Viewed">
        <Box width="70%">
          <RecentlyViewed
            me={
              {
                recentlyViewedArtworks: {
                  edges: artworkBricks,
                },
              } as any
            }
          />
        </Box>
      </Section>
    </React.Fragment>
  )
})
