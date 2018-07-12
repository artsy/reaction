import {
  ArtworkWithEditionOfOnly,
  ArtworkWithSizeAndEditionOf,
  ArtworkWithSizeOnly,
} from "Apps/__test__/Fixtures/Artwork/Sidebar/SizeInfo"
import { ArtworkSidebarSizeInfo as SizeInfo } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarSizeInfo"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Legacy/Styleguide/Artwork/Sidebar", module).add("SizeInfo", () => {
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
