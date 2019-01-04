import {
  MultipleArtists,
  SingleFollowedArtist,
  SingleNonFollowedArtist,
} from "Apps/__tests__/Fixtures/Artwork/ArtworkSidebar/ArtworkSidebarArtists"
import { ArtworkSidebarArtists as Artists } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarArtists"
import { RelayStubProvider } from "DevTools/RelayStubProvider"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Apps/Artwork Page/Components/Sidebar", module)
  .addDecorator(story => <RelayStubProvider>{story()}</RelayStubProvider>)
  .add("Artists", () => {
    return (
      <React.Fragment>
        <Section title="Single Followed Artist">
          <Artists artwork={SingleFollowedArtist as any} />
        </Section>
        <Section title="Single Not Followed Artist">
          <Artists artwork={SingleNonFollowedArtist as any} />
        </Section>
        <Section title="Multipe Artists">
          <Artists artwork={MultipleArtists as any} />
        </Section>
      </React.Fragment>
    )
  })
