import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { exhibitions } from "Styleguide/Pages/Fixtures/SelectedExhibitions"
import { Section } from "Styleguide/Utils/Section"
import {
  SelectedExhibitions,
  SelectedExhibitionsContainer,
} from "../SelectedExhibitions"

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
