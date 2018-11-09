import { Box } from "@artsy/palette"
import { artworkBricks } from "Apps/__tests__/Fixtures/Carousel"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { RecentlyViewed } from "Styleguide/Components"
import { Section } from "Styleguide/Utils/Section"

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
            useRelay={false}
          />
        </Box>
      </Section>
    </React.Fragment>
  )
})
