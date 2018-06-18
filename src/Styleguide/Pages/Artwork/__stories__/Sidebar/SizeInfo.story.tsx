import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"
import { SizeInfo } from "../../Sidebar/SizeInfo"

const ArtworkWithSizeAndEditionOf = {
  dimensions: { in: "10 1/4 × 8 7/8 in", cm: "26 × 22.5 cm" },
  edition_of: "Edition of 20",
}

const ArtworkWithSizeOnly = {
  dimensions: { in: "10 1/4 × 8 7/8 in", cm: "26 × 22.5 cm" },
}

const ArtworkWithEditionOfOnly = {
  dimensions: { in: null, cm: null },
  edition_of: "Edition of 20",
}

storiesOf("Styleguide/Artwork/Sidebar", module).add("SizeInfo", () => {
  return (
    <React.Fragment>
      <Section title="Artwork with Size and Edition of presentt">
        <SizeInfo artwork={ArtworkWithSizeAndEditionOf} />
      </Section>
      <Section title="Artwork with Size only">
        <SizeInfo artwork={ArtworkWithSizeOnly} />
      </Section>
      <Section title="Artwork with Edition of only">
        <SizeInfo artwork={ArtworkWithEditionOfOnly} />
      </Section>
    </React.Fragment>
  )
})
