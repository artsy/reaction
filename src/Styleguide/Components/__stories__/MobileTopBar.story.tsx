import { Sans } from "@artsy/palette"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { MobileTopBar } from "Styleguide/Components/MobileTopBar"
import { Box } from "Styleguide/Elements/Box"
import { Button } from "Styleguide/Elements/Button"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Styleguide/Components", module).add("MobileTopBar", () => {
  return (
    <React.Fragment>
      <Section title="Mobile Top Bar">
        <Box width="100%">
          <MobileTopBar>
            <Button variant="noOutline" size="small">
              Reset
            </Button>
            <Sans size="2" weight="medium">
              Filter (2)
            </Sans>
            <Button variant="primaryBlack" size="small">
              Apply
            </Button>
          </MobileTopBar>
        </Box>
      </Section>
    </React.Fragment>
  )
})
