import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { SelectedExhibitions } from "../SelectedExhibitions"
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
      <Section title="3 exhibitions">
        <SelectedExhibitions exhibitions={exhibitions} />
      </Section>
    </React.Fragment>
  )
})
