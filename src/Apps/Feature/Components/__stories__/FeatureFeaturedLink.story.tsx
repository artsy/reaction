import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { FeatureFeaturedLink } from "../FeatureFeaturedLink"
import { FEATURED_LINK } from "../__tests__/fixtures"
import { CSSGrid } from "@artsy/palette"

storiesOf("Apps/Feature", module)
  .add("FeatureFeaturedLink", () => (
    <CSSGrid gridTemplateColumns={`repeat(2, 1fr)`} gridGap={2}>
      <FeatureFeaturedLink featuredLink={FEATURED_LINK} />
      <FeatureFeaturedLink featuredLink={FEATURED_LINK} />
    </CSSGrid>
  ))
  .add("FeatureFeaturedLink (wide)", () => (
    <FeatureFeaturedLink featuredLink={FEATURED_LINK} wide />
  ))
