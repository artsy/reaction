import React from "react"
import { storiesOf } from "storybook/storiesOf"
import {
  SelectedExhibitions,
  SelectedExhibitionsContainer,
} from "../SelectedExhibitions"
import { Section } from "Styleguide/Utils/Section"

export const exhibitions = [
  {
    year: "2018",
    show: "Adman: Warhol Before Pop",
    gallery: "Andy Warhol Museum",
  },
  {
    year: "2018",
    show: "Brancusi: Pioneer of American Minimalism",
    gallery: "Paul Kasmin Gallery",
  },
  {
    year: "2017",
    show: "Sculpture on the Move 1946–2016",
    gallery: "Kunstmuseum Basel",
  },
]

storiesOf("Styleguide/Components", module).add("SelectedExhibitions", () => {
  return (
    <React.Fragment>
      <Section title="3 exhibitions responsive">
        <SelectedExhibitions exhibitions={exhibitions} />
      </Section>
      <Section title="2 exhibitions responsive">
        <SelectedExhibitions exhibitions={exhibitions.slice(1)} />
      </Section>
      <Section title="3 exhibitions full">
        <SelectedExhibitionsContainer exhibitions={exhibitions} />
      </Section>
      <Section title="2 exhibitions full">
        <SelectedExhibitionsContainer exhibitions={exhibitions.slice(1)} />
      </Section>
      <Section title="3 exhibitions collapsed (xs)">
        <SelectedExhibitionsContainer collapsible exhibitions={exhibitions} />
      </Section>
      <Section title="2 exhibitions collapsed (xs)">
        <SelectedExhibitionsContainer
          collapsible
          exhibitions={exhibitions.slice(1)}
        />
      </Section>
      <Section title="1 exhibition">
        <SelectedExhibitions exhibitions={exhibitions.slice(2)} />
      </Section>
    </React.Fragment>
  )
})
