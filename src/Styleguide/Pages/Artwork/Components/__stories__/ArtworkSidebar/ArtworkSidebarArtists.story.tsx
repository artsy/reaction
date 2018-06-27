import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { ArtworkSidebarArtists as Artists } from "Styleguide/Pages/Artwork/Components/ArtworkSidebar/ArtworkSidebarArtists"
import {
  MultipleArtists,
  SingleFollowedArtist,
  SingleNonFollowedArtist,
} from "Styleguide/Pages/Fixtures/Artwork/Sidebar/Artists"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Styleguide/Artwork/Sidebar", module).add("Artists", () => {
  return (
    <React.Fragment>
      <Section title="Single Followed Artist">
        <Artists artwork={{ artists: SingleFollowedArtist }} />
      </Section>
      <Section title="Single Not Followed Artist">
        <Artists artwork={{ artists: SingleNonFollowedArtist }} />
      </Section>
      <Section title="Multipe Artists">
        <Artists artwork={{ artists: MultipleArtists }} />
      </Section>
    </React.Fragment>
  )
})
