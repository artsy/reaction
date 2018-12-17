import {
  ArtworkWithClassification,
  ArtworkWithoutClassification,
} from "Apps/__tests__/Fixtures/Artwork/ArtworkSidebar/ArtworkSidebarClassification"
import { ArtworkSidebarClassification as Classification } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarClassification"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Apps/Artwork Page/Components/Sidebar", module).add(
  "Classification",
  () => {
    return (
      <React.Fragment>
        <Section title="Artwork with Classification">
          <Classification artwork={ArtworkWithClassification as any} />
        </Section>
        <Section title="Artwork without Classification">
          <Classification artwork={ArtworkWithoutClassification as any} />
        </Section>
      </React.Fragment>
    )
  }
)
