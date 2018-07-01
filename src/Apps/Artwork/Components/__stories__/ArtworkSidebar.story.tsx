import { ArtworkSidebar } from "Apps/Artwork/Components/ArtworkSidebar"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"

import {
  ClosedAuctionArtwork,
  CollecingInstitutionArtwork,
  LiveAuctionArtwork,
  MultipleArtistsArtwork,
  OpenAuctionArtwork,
  RegularArtwork2Editions,
  RegularArtworkWithOneEdition,
  RegularNonEditionedArtwork,
  VideoArtwork,
} from "Apps/__test__/Fixtures/Artworks"
import { RelayStubProvider } from "Utils/RelayStubProvider"

storiesOf("Styleguide/Artwork/", module)
  .addDecorator(story => <RelayStubProvider>{story()}</RelayStubProvider>)
  .add("Sidebar", () => {
    return (
      <React.Fragment>
        <Section title="Artwork with collectiing_institution attribute set">
          <ArtworkSidebar artwork={CollecingInstitutionArtwork} />
        </Section>
        <Section title="Multiple artists artwork">
          <ArtworkSidebar artwork={MultipleArtistsArtwork} />
        </Section>
        <Section title="Regular non editioned artwork">
          <ArtworkSidebar artwork={RegularNonEditionedArtwork} />
        </Section>
        <Section title="Regular artwork with 1 edition set">
          <ArtworkSidebar artwork={RegularArtworkWithOneEdition} />
        </Section>
        <Section title="Regular artwork with 2 editions">
          <ArtworkSidebar artwork={RegularArtwork2Editions} />
        </Section>
        <Section title="Video artwork">
          <ArtworkSidebar artwork={VideoArtwork} />
        </Section>
        <Section title="Current auction artwork with bidding allowed">
          <ArtworkSidebar artwork={OpenAuctionArtwork} />
        </Section>
        <Section title="Live auction artwork">
          <ArtworkSidebar artwork={LiveAuctionArtwork} />
        </Section>
        <Section title="Closed auction artwork">
          <ArtworkSidebar artwork={ClosedAuctionArtwork} />
        </Section>
      </React.Fragment>
    )
  })
