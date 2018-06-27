import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { SizeInfo } from "Styleguide/Pages/Artwork/Components/Sidebar/SizeInfo"
import {
  ArtworkWithEditionOfOnly,
  ArtworkWithSizeAndEditionOf,
  ArtworkWithSizeOnly,
} from "Styleguide/Pages/Fixtures/Artwork/Sidebar/SizeInfo"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Styleguide/Artwork/Sidebar", module).add("SizeInfo", () => {
  return (
    <React.Fragment>
      <Section title="Artwork with Size and Edition of presentt">
        <SizeInfo piece={ArtworkWithSizeAndEditionOf} />
      </Section>
      <Section title="Artwork with Size only">
        <SizeInfo piece={ArtworkWithSizeOnly} />
      </Section>
      <Section title="Artwork with Edition of only">
        <SizeInfo piece={ArtworkWithEditionOfOnly} />
      </Section>
    </React.Fragment>
  )
})
