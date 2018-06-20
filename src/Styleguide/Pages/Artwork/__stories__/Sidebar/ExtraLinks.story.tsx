import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { ExtraLinks } from "Styleguide/Pages/Artwork/Sidebar/ExtraLinks"
import {
  ArtworkFromLiveAuction,
  ArtworkNotForSaleWithMultipleConsignableArtist,
  ArtworkNotForSaleWithNoConsignableArtists,
  ArtworkNotForSaleWithOneConsignableArtist,
  ForSaleArtworkWithMultipleConsignableArtists,
  ForSaleArtworkWithNoConsignableArtists,
  ForSaleArtworkWithOneConsignableArtist,
} from "Styleguide/Pages/Fixtures/Artwork/Sidebar/ExtraLinks"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Styleguide/Artwork/Sidebar", module).add("ExtraLinks", () => {
  return (
    <React.Fragment>
      <Section title="Not for sale artwork with no consignable artists">
        <ExtraLinks artwork={ArtworkNotForSaleWithNoConsignableArtists} />
      </Section>
      <Section title="For sale artwork with no consignable artists">
        <ExtraLinks artwork={ForSaleArtworkWithNoConsignableArtists} />
      </Section>
      <Section title="For sale artwork with one consignable artist">
        <ExtraLinks artwork={ForSaleArtworkWithOneConsignableArtist} />
      </Section>
      <Section title="For sale artwork with multiple consignable artists">
        <ExtraLinks artwork={ForSaleArtworkWithMultipleConsignableArtists} />
      </Section>
      <Section title="Not for sale artwork with one consignable artist">
        <ExtraLinks artwork={ArtworkNotForSaleWithOneConsignableArtist} />
      </Section>
      <Section title="Not for sale artwork with multiple consignable artists">
        <ExtraLinks artwork={ArtworkNotForSaleWithMultipleConsignableArtist} />
      </Section>
      <Section title="Artwork from live auction">
        <ExtraLinks artwork={ArtworkFromLiveAuction} />
      </Section>
    </React.Fragment>
  )
})
