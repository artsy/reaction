import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"

import {
  CurrentEvent,
  LargeCurrentEvent,
} from "Styleguide/Pages/Artist/Routes/Overview/Components/CurrentEvent"

const props = {
  artist: {
    currentEvent: {
      image: { resized: { url: "https://picsum.photos/300/200/?random" } },
      name: "Brancusi: Pioneer of American Minimalism",
      headline: "Currently on view",
      subHeadline: "Paul Kasmin Gallery" + "\n" + "Miami, May 3 - 21, 2018",
    },
  },
}

storiesOf("Styleguide/Artist/CurrentEvent", module).add("Current Event", () => {
  return (
    <React.Fragment>
      <Section title="Responsive Current Event">
        <CurrentEvent {...props} />
      </Section>
      <Section title="Large Current Event">
        <LargeCurrentEvent {...props} />
      </Section>
      <Section title="Small Current Event">Hidden</Section>
    </React.Fragment>
  )
})
