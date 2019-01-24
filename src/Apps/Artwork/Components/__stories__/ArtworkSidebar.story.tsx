import { ArtworkSidebar } from "Apps/Artwork/Components/ArtworkSidebar"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Utils/Section"

import {
  ClosedAuctionArtwork,
  CollecingInstitutionArtwork,
  LiveAuctionArtwork,
  MultipleArtistsArtwork,
  OpenAuctionArtwork,
  RegularArtworkWithOneEdition,
  RegularArtworkWithTwoEditions,
  RegularNonEditionedArtwork,
  VideoArtwork,
} from "Apps/__tests__/Fixtures/Artworks"
import { RelayStubProvider } from "DevTools/RelayStubProvider"

storiesOf("Apps/Artwork Page/Components", module)
  .addDecorator(story => <RelayStubProvider>{story()}</RelayStubProvider>)
  .add("Sidebar", () => {
    return (
      <React.Fragment>
        <Section title="Artwork with collectiing_institution attribute set">
          <ArtworkSidebar artwork={CollecingInstitutionArtwork as any} />
        </Section>
        <Section title="Multiple artists artwork">
          <ArtworkSidebar artwork={MultipleArtistsArtwork as any} />
        </Section>
        <Section title="Regular non editioned artwork">
          <ArtworkSidebar artwork={RegularNonEditionedArtwork as any} />
        </Section>
        <Section title="Regular artwork with 1 edition set">
          <ArtworkSidebar artwork={RegularArtworkWithOneEdition as any} />
        </Section>
        <Section title="Regular artwork with 2 editions">
          <ArtworkSidebar artwork={RegularArtworkWithTwoEditions as any} />
        </Section>
        <Section title="Video artwork">
          <ArtworkSidebar artwork={VideoArtwork as any} />
        </Section>
        <Section title="Current auction artwork with bidding allowed">
          <ArtworkSidebar artwork={OpenAuctionArtwork as any} />
        </Section>
        <Section title="Live auction artwork">
          <ArtworkSidebar artwork={LiveAuctionArtwork as any} />
        </Section>
        <Section title="Closed auction artwork">
          <ArtworkSidebar artwork={ClosedAuctionArtwork as any} />
        </Section>
      </React.Fragment>
    )
  })
