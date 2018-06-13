import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "../../../../Utils/Section"
import { ArtworkMetadata } from "../../Sidebar/ArtworkMetadata"

const FilledOutMetadataNoEditions = {
  title: "Full metadata / No editions",
  date: "2016-2017",
  medium:
    "Hand selected materials to print this piece were sourced from the old villages on magic lands",
  dimensions: {
    in: "48 2/5 in diameter",
    cm: "123 cm diameter",
  },
  edition_of: null,
  attribution_class: {
    short_description: "This is a made-to-order piece",
  },
  edition_sets: [],
}

const FilledOutMetadataOneEditionSet = {
  title: "Full metadata / One Edition Set",
  date: "2016-2017",
  medium:
    "Hand selected materials to print this piece were sourced from the old villages on magic lands",
  dimensions: { in: "4 3/10 × 8 7/10 × 13 in", cm: "11 × 22 × 33 cm" },
  edition_of: "Edition of 21",
  attribution_class: { short_description: "This is a made-to-order piece" },
  edition_sets: [{ id: "5b1ffd455405ff0020d933bb" }],
}

const FilledOutMetadataMultipleEditionSets = {
  title: "Full metadata / Multiple edition sets",
  date: "2016-2017",
  medium:
    "Hand selected materials to print this piece were sourced from the old villages on magic lands",
  dimensions: {
    in: "22 × 33 × 11 in",
    cm: "55.9 × 83.8 × 27.9 cm",
  },
  edition_of: null,
  attribution_class: {
    short_description: "This is a made-to-order piece",
  },
  edition_sets: [
    { id: "5b1ffd455405ff0020d933bb" },
    { id: "5b1ffdb20923cc00205152d3" },
  ],
}

const EmptyMetadataNoEditions = {
  title: "Empty metadata / No editions",
  date: " ",
  medium: "",
  dimensions: {
    in: null,
    cm: null,
  },
  edition_of: null,
  attribution_class: null,
  edition_sets: [],
}

const EmptyMetadataOneEditionSet = {
  title: "Empty metadata / One edition set",
  date: " ",
  medium: "",
  dimensions: {
    in: null,
    cm: null,
  },
  edition_of: "",
  attribution_class: null,
  edition_sets: [
    {
      id: "5b1fff790923cc00205152fe",
    },
  ],
}

const EmptyMetadataMultipleEditionSets = {
  title: "Empty metadata / Multiple edition Sets",
  date: " ",
  medium: "",
  dimensions: { in: null, cm: null },
  edition_of: "",
  attribution_class: null,
  edition_sets: [
    { id: "5b1ffd455405ff0020d933bb" },
    { id: "5b1ffdb20923cc00205152d3" },
  ],
}

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
