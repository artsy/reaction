import React from "react"
import { storiesOf } from "storybook/storiesOf"
import {
  SelectedExhibitions,
  SelectedExhibitionsContainer,
} from "../SelectedExhibitions"
import { Section } from "../../Utils/Section"

const exhibitions = [
  {
    year: "2018",
    show: "Some show this year 1",
    gallery: "Some gallery",
  },
  {
    year: "2018",
    show: "Some show this year 2",
    gallery: "Some gallery",
  },
  {
    year: "2017",
    show: "Blaahhhhh",
    gallery: "You don't know me 123",
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
