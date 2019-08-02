import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { imageSamples } from "../_fixtures_/collectionsHubs"
import { ImageLink } from "../ImageLink"

storiesOf("Components/ImageLink", module)
  .add("with default dimensions", () => (
    <ImageLink href="http://example.com" imageUrl={imageSamples.photography}>
      Photography
    </ImageLink>
  ))
  .add("with explicit dimensions", () => (
    <ImageLink
      href="http://example.com"
      imageUrl={imageSamples.contemporaryArt}
      width={200}
      height={150}
    >
      Contemporary Art
    </ImageLink>
  ))
  .add("with responsive sizing", () => (
    <ImageLink
      href="http://example.com"
      imageUrl={imageSamples.streetArt}
      width={[132, 168]}
      height={[83, 105]}
    >
      Street Art
    </ImageLink>
  ))
  .add("with a long text", () => (
    <ImageLink
      href="http://example.com"
      imageUrl={imageSamples.impressionistAndModernArt}
      width={200}
      height={150}
    >
      Impressionist and Modern Art
    </ImageLink>
  ))
