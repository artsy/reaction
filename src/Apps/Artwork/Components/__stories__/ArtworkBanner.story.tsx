import { AllAdditionalDetailsPresent } from "Apps/__tests__/Fixtures/Artworks"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"
import { ArtworkBanner, ArtworkBannerQueryRenderer } from "../ArtworkBanner"

import {
  ArtworkAuctionBannerFixture,
  ArtworkCurrentShowBannerFixture,
  ArtworkFairBannerFixture,
  ArtworkPastShowBannerFixture,
  ArtworkUpcomingShowBannerFixture,
} from "Apps/__tests__/Fixtures/Artwork/ArtworkBanner"

storiesOf("Apps/Artwork Page/Components", module).add("ArtworkBanner", () => {
  return (
    <React.Fragment>
      <Section title="ArtworkBannerQueryRenderer artwork with no banner">
        <ArtworkBannerQueryRenderer artworkID="pablo-picasso-david-et-bethsabee" />
      </Section>
      <Section title="Fixture artwork with banner">
        <ArtworkBanner artwork={AllAdditionalDetailsPresent as any} />
      </Section>
      <Section title="Fixture artwork with auction banner">
        <ArtworkBanner artwork={ArtworkAuctionBannerFixture as any} />
      </Section>
      <Section title="Fixture artwork with fair banner">
        <ArtworkBanner artwork={ArtworkFairBannerFixture as any} />
      </Section>
      <Section title="Fixture artwork with upcoming show banner">
        <ArtworkBanner artwork={ArtworkUpcomingShowBannerFixture as any} />
      </Section>
      <Section title="Fixture artwork with current show banner">
        <ArtworkBanner artwork={ArtworkCurrentShowBannerFixture as any} />
      </Section>
      <Section title="Fixture artwork with past show banner">
        <ArtworkBanner artwork={ArtworkPastShowBannerFixture as any} />
      </Section>
    </React.Fragment>
  )
})
