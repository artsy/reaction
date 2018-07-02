import {
  ArtworkWithTitlAndDate,
  ArtworkWithTitleAndMedium,
  ArtworkWithTitleDateAndMedium,
  ArtworkWithTitleOnly,
} from "Apps/__test__/Fixtures/Artwork/Sidebar/TitleInfo"
import { ArtworkSidebarTitleInfo as TitleInfo } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarTitleInfo"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Styleguide/Artwork/Sidebar", module).add("TitleInfo", () => {
  return (
    <React.Fragment>
      <Section title="Artwork with Title Date and Medium present">
        <TitleInfo artwork={ArtworkWithTitleDateAndMedium} />
      </Section>
      <Section title="Artwork with Title only">
        <TitleInfo artwork={ArtworkWithTitleOnly} />
      </Section>
      <Section title="Artwork with Title and Date">
        <TitleInfo artwork={ArtworkWithTitlAndDate} />
      </Section>
      <Section title="Artwork with Title and Medium">
        <TitleInfo artwork={ArtworkWithTitleAndMedium} />
      </Section>
    </React.Fragment>
  )
})
