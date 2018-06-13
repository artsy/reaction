import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "../../../../Utils/Section"
import { Classification } from "../../Sidebar/Classification"

export const ArtworkWithClassification = {
  attribution_class: { short_description: "This is a unique work" },
}

export const ArtworkWithoutClassification = { attribution_class: null }

storiesOf("Styleguide/Artwork/Sidebar", module).add("Classification", () => {
  return (
    <React.Fragment>
      <Section title="Artwork with Classification">
        <Classification artwork={ArtworkWithClassification} />
      </Section>
      <Section title="Artwork without Classification">
        <Classification artwork={ArtworkWithoutClassification} />
      </Section>
    </React.Fragment>
  )
})
