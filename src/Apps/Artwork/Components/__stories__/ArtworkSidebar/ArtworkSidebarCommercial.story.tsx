import {
  ArtworkBuyNow,
  ArtworkBuyNowMakeOffer,
  ArtworkMakeOffer,
  ArtworkSold,
  ContactForPriceWork,
  FoSaleArtworkNoEditions,
  FoSaleArtworkWithMultipleEditions,
  FoSaleArtworkWithOneEdition,
} from "Apps/__tests__/Fixtures/Artwork/ArtworkSidebar/ArtworkSidebarCommercial"
import { ArtworkSidebarCommercial as Commercial } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarCommercial"
import { RelayStubProvider } from "DevTools/RelayStubProvider"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Styleguide/Artwork/Sidebar", module)
  .addDecorator(story => <RelayStubProvider>{story()}</RelayStubProvider>)
  .add("Commercial", () => {
    return (
      <>
        <Section title="For sale artwork with no editions">
          <Commercial artwork={FoSaleArtworkNoEditions as any} />
        </Section>
        <Section title="For sale artwork with one edition set">
          <Commercial artwork={FoSaleArtworkWithOneEdition as any} />
        </Section>
        <Section title="For sale artwork with multiple edition sets">
          <Commercial artwork={FoSaleArtworkWithMultipleEditions as any} />
        </Section>
        <Section title="Contact for price work">
          <Commercial artwork={ContactForPriceWork as any} />
        </Section>
        <Section title="Buy Now / Work available for sale">
          <Commercial artwork={ArtworkBuyNow as any} />
        </Section>
        <Section title="Buy Now / Work sold">
          <Commercial artwork={ArtworkSold as any} />
        </Section>
        <Section title="Make Offer / Work available for sale">
          <Commercial artwork={ArtworkMakeOffer as any} />
        </Section>
        <Section title="Buy Now &amp; Make Offer / Work available for sale">
          <Commercial artwork={ArtworkBuyNowMakeOffer as any} />
        </Section>
      </>
    )
  })
