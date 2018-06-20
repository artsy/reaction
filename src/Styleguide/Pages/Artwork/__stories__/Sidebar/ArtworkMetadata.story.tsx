import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { ArtworkMetadata } from "Styleguide/Pages/Artwork/Sidebar/ArtworkMetadata"
import {
  EmptyMetadataMultipleEditionSets,
  EmptyMetadataNoEditions,
  EmptyMetadataOneEditionSet,
  FilledOutMetadataMultipleEditionSets,
  FilledOutMetadataNoEditions,
  FilledOutMetadataOneEditionSet,
} from "Styleguide/Pages/Fixtures/Artwork/Sidebar/ArtworkMetadata"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Styleguide/Artwork/Sidebar", module).add("ArtworkMetadata", () => {
  return (
    <React.Fragment>
      <Section title="Filled out metadata no editions">
        <ArtworkMetadata artwork={FilledOutMetadataNoEditions} />
      </Section>
      <Section title="Filled out metadata one edition set">
        <ArtworkMetadata artwork={FilledOutMetadataOneEditionSet} />
      </Section>
      <Section title="Filled out metadata multiple edition sets">
        <ArtworkMetadata artwork={FilledOutMetadataMultipleEditionSets} />
      </Section>
      <Section title="Empty metadata no editions">
        <ArtworkMetadata artwork={EmptyMetadataNoEditions} />
      </Section>
      <Section title="Empty metadata one edition set">
        <ArtworkMetadata artwork={EmptyMetadataOneEditionSet} />
      </Section>
      <Section title="Empty metadata multiple edition sets">
        <ArtworkMetadata artwork={EmptyMetadataMultipleEditionSets} />
      </Section>
    </React.Fragment>
  )
})
