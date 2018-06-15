import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"
import { TitleInfo } from "../../Sidebar/TitleInfo"

const ArtworkWithTitleDateAndMedium = {
  title: "The Fox and the Hound",
  date: "2018",
  medium: "Oil on canvas",
}

const ArtworkWithTitleOnly = {
  title: "The Fox and the Hound",
}

const ArtworkWithTitlAndDate = {
  title: "The Fox and the Hound",
  date: " 2013 - 2012 ",
}
const ArtworkWithTitleAndMedium = {
  title: "The Fox and the Hound",
  date: null,
  medium:
    "Hand selected materials to paint this piece were sourced from the old villages on magic lands.",
}

storiesOf("Styleguide/Artwork/Sidebar", module).add("TitleInfo", () => {
  return (
    <React.Fragment>
      <Section title="Artwork with Title Date and Medium present">
        <TitleInfo artwork={ArtworkWithTitleDateAndMedium} />
      </Section>
      <Section title="Artwork with Title onlyt">
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
