import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"
import { Artists } from "Styleguide/Pages/Artwork/Sidebar/Artists"
import {
  SingleFollowedArtist,
  SingleNonFollowedArtist,
  MultipleArtists,
} from "Styleguide/Pages/Fixtures/Artwork/Sidebar/Artists"

storiesOf("Styleguide/Artwork/Sidebar", module).add("Artists", () => {
  return (
    <React.Fragment>
      <Section title="Single Followed Artist">
        <Artists artists={SingleFollowedArtist} />
      </Section>
      <Section title="Single Not Followed Artist">
        <Artists artists={SingleNonFollowedArtist} />
      </Section>
      <Section title="Multipe Artists">
        <Artists artists={MultipleArtists} />
      </Section>
    </React.Fragment>
  )
})
