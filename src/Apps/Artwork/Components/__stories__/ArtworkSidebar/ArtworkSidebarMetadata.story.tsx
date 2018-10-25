import {
  EmptyMetadataMultipleEditionSets,
  EmptyMetadataNoEditions,
  EmptyMetadataOneEditionSet,
  FilledOutMetadataMultipleEditionSets,
  FilledOutMetadataNoEditions,
  FilledOutMetadataOneEditionSet,
  MetadataForAuctionWork,
} from "Apps/__test__/Fixtures/Artwork/ArtworkSidebar/ArtworkSidebarMetadata"
import { ArtworkSidebarMetadata as Metadata } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarMetadata"
import { RelayStubProvider } from "DevTools/RelayStubProvider"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Styleguide/Artwork/Sidebar", module)
  .addDecorator(story => <RelayStubProvider>{story()}</RelayStubProvider>)
  .add("Metadata", () => {
    return (
      <React.Fragment>
        <Section title="Filled out metadata no editions">
          <Metadata artwork={FilledOutMetadataNoEditions as any} />
        </Section>
        <Section title="Filled out metadata one edition set">
          <Metadata artwork={FilledOutMetadataOneEditionSet as any} />
        </Section>
        <Section title="Filled out metadata multiple edition sets">
          <Metadata artwork={FilledOutMetadataMultipleEditionSets as any} />
        </Section>
        <Section title="Empty metadata no editions">
          <Metadata artwork={EmptyMetadataNoEditions as any} />
        </Section>
        <Section title="Empty metadata one edition set">
          <Metadata artwork={EmptyMetadataOneEditionSet as any} />
        </Section>
        <Section title="Empty metadata multiple edition sets">
          <Metadata artwork={EmptyMetadataMultipleEditionSets as any} />
        </Section>
        <Section title="Artwork in an auction">
          <Metadata artwork={MetadataForAuctionWork as any} />
        </Section>
      </React.Fragment>
    )
  })
