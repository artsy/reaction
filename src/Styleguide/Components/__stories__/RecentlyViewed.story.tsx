import { artworkBricks } from "Apps/__test__/Fixtures/Slider"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { RecentlyViewed } from "Styleguide/Components"
import { Box } from "Styleguide/Elements"
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
