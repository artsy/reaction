import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"
import { ExtraLinks } from "../../Sidebar/ExtraLinks"
import {
  ArtworkNotForSaleWithNoConsignableArtists,
  ForSaleArtworkWithNoConsignableArtists,
  ForSaleArtworkWithOneConsignableArtist,
  ForSaleArtworkWithMultipleConsignableArtists,
  ArtworkNotForSaleWithOneConsignableArtist,
  ArtworkNotForSaleWithMultipleConsignableArtist,
} from "Styleguide/Pages/Fixtures/Artwork/Sidebar/ExtraLinks"

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
    </React.Fragment>
  )
})
