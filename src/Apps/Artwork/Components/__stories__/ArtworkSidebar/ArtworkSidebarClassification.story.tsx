import {
  ArtworkWithClassification,
  ArtworkWithoutClassification,
} from "Apps/__test__/Fixtures/Artwork/Sidebar/Classification"
import { ArtworkSidebarClassification as Classification } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarClassification"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"

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
