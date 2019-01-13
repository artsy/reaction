import { Slider } from "Components/v2/Lightbox/LightboxSlider"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Utils/Section"

storiesOf("Styleguide/Components", module).add("LightboxSlider", () => {
  return (
    <React.Fragment>
      <Section title="Lightbox Slider">
        <Slider min={0} max={100} step={1} value={50} />
      </Section>
    </React.Fragment>
  )
})
