import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"
import { SizeInfo } from "../../Sidebar/SizeInfo"
import {
  ArtworkWithSizeAndEditionOf,
  ArtworkWithSizeOnly,
  ArtworkWithEditionOfOnly,
} from "Styleguide/Pages/Fixtures/Artwork/Sidebar/SizeInfo"

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
