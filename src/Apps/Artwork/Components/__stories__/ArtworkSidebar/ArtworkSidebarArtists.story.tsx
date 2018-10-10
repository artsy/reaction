import {
  MultipleArtists,
  SingleFollowedArtist,
  SingleNonFollowedArtist,
} from "Apps/__test__/Fixtures/Artwork/Sidebar/Artists"
import { ArtworkSidebarArtists as Artists } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarArtists"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"
import { RelayStubProvider } from "Utils/RelayStubProvider"

storiesOf("Styleguide/Artwork/Sidebar", module)
  .addDecorator(story => <RelayStubProvider>{story()}</RelayStubProvider>)
  .add("Artists", () => {
    return (
      <React.Fragment>
        <Section title="Single Followed Artist">
          <Artists artwork={{ artists: SingleFollowedArtist } as any} />
        </Section>
        <Section title="Single Not Followed Artist">
          <Artists artwork={{ artists: SingleNonFollowedArtist } as any} />
        </Section>
        <Section title="Multipe Artists">
          <Artists artwork={{ artists: MultipleArtists } as any} />
        </Section>
      </React.Fragment>
    )
  })
