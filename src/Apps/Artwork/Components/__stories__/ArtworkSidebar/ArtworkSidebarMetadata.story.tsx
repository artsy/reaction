import {
  EmptyMetadataMultipleEditionSets,
  EmptyMetadataNoEditions,
  EmptyMetadataOneEditionSet,
  FilledOutMetadataMultipleEditionSets,
  FilledOutMetadataNoEditions,
  FilledOutMetadataOneEditionSet,
} from "Apps/__test__/Fixtures/Artwork/Sidebar/ArtworkMetadata"
import { ArtworkSidebarMetadata as Metadata } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarMetadata"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"
import { RelayStubProvider } from "Utils/RelayStubProvider"

storiesOf("Legacy/Styleguide/Artwork/Sidebar", module)
  .addDecorator(story => <RelayStubProvider>{story()}</RelayStubProvider>)
  .add("Metadata", () => {
    return (
      <React.Fragment>
        <Section title="Filled out metadata no editions">
          <Metadata artwork={FilledOutMetadataNoEditions} />
        </Section>
        <Section title="Filled out metadata one edition set">
          <Metadata artwork={FilledOutMetadataOneEditionSet} />
        </Section>
        <Section title="Filled out metadata multiple edition sets">
          <Metadata artwork={FilledOutMetadataMultipleEditionSets} />
        </Section>
        <Section title="Empty metadata no editions">
          <Metadata artwork={EmptyMetadataNoEditions} />
        </Section>
        <Section title="Empty metadata one edition set">
          <Metadata artwork={EmptyMetadataOneEditionSet} />
        </Section>
        <Section title="Empty metadata multiple edition sets">
          <Metadata artwork={EmptyMetadataMultipleEditionSets} />
        </Section>
      </React.Fragment>
    )
  })
