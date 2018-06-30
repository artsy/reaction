import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Slider } from "Styleguide/Components/LightboxSlider"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Styleguide/Components", module).add("LightboxSlider", () => {
  return (
    <React.Fragment>
      <Section title="Lightbox Slider">
        <Slider
          min={0}
          max={100}
          step={1}
          value={50}
          onChange={event => console.log(event.target.value)}
          onZoomInClicked={() => console.log("zoom in")}
          onZoomOutClicked={() => console.log("zoom out")}
        />
      </Section>
    </React.Fragment>
  )
})
