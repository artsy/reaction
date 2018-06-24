import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { LargeSlider, Slider, SmallSlider } from "Styleguide/Components/Slider"
import { Box } from "Styleguide/Elements/Box"
import { images } from "Styleguide/Pages/Fixtures/Slider"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Styleguide/Components", module).add("Slider", () => {
  return (
    <React.Fragment>
      <Section title="Responsive Slider">
        <Box width="70%">
          <Slider images={images} />
        </Box>
      </Section>
      <Section title="Small Slider">
        <Box width="50%">
          <SmallSlider images={images} />
        </Box>
      </Section>
      <Section title="Large Slider">
        <Box width="70%">
          <LargeSlider images={images} />
        </Box>
      </Section>
    </React.Fragment>
  )
})
