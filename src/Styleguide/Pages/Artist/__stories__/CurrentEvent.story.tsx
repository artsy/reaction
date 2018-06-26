import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"

import {
  CurrentEvent,
  LargeCurrentEvent,
} from "Styleguide/Pages/Artist/Routes/Overview/Components/CurrentEvent"

storiesOf("Styleguide/Artist/CurrentEvent", module).add("Current Event", () => {
  return (
    <React.Fragment>
      <Section title="Responsive Current Event">
        <CurrentEvent
          src="https://picsum.photos/300/200/?random"
          label="Currently on view"
          title="Brancusi: Pioneer of American Minimalism"
          gallery="Paul Kasmin Gallery"
          location="Miami"
          date="May 3 – 21, 2018"
        />
      </Section>
      <Section title="Large Current Event">
        <LargeCurrentEvent
          src="https://picsum.photos/300/200/?random"
          label="Currently on view"
          title="Brancusi: Pioneer of American Minimalism"
          gallery="Paul Kasmin Gallery"
          location="Miami"
          date="May 3 – 21, 2018"
        />
      </Section>
      <Section title="Small Current Event">Hidden</Section>
    </React.Fragment>
  )
})
