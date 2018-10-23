import {
  ArtworkFromLiveAuction,
  ArtworkNotForSaleWithMultipleConsignableArtist,
  ArtworkNotForSaleWithNoConsignableArtists,
  ArtworkNotForSaleWithOneConsignableArtist,
  ForSaleArtworkWithMultipleConsignableArtists,
  ForSaleArtworkWithNoConsignableArtists,
  ForSaleArtworkWithOneConsignableArtist,
} from "Apps/__test__/Fixtures/Artwork/ArtworkSidebar/ArtworkSidebarExtraLinks"
import { ArtworkSidebarExtraLinks as ExtraLinks } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarExtraLinks"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Styleguide/Artwork/Sidebar", module).add("ExtraLinks", () => {
  return (
    <React.Fragment>
      <Section title="Not for sale artwork with no consignable artists">
        <ExtraLinks
          artwork={ArtworkNotForSaleWithNoConsignableArtists as any}
        />
      </Section>
      <Section title="For sale artwork with no consignable artists">
        <ExtraLinks artwork={ForSaleArtworkWithNoConsignableArtists as any} />
      </Section>
      <Section title="For sale artwork with one consignable artist">
        <ExtraLinks artwork={ForSaleArtworkWithOneConsignableArtist as any} />
      </Section>
      <Section title="For sale artwork with multiple consignable artists">
        <ExtraLinks
          artwork={ForSaleArtworkWithMultipleConsignableArtists as any}
        />
      </Section>
      <Section title="Not for sale artwork with one consignable artist">
        <ExtraLinks
          artwork={ArtworkNotForSaleWithOneConsignableArtist as any}
        />
      </Section>
      <Section title="Not for sale artwork with multiple consignable artists">
        <ExtraLinks
          artwork={ArtworkNotForSaleWithMultipleConsignableArtist as any}
        />
      </Section>
      <Section title="Artwork from live auction">
        <ExtraLinks artwork={ArtworkFromLiveAuction as any} />
      </Section>
    </React.Fragment>
  )
})
