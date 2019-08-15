import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { ImageLink } from "../ImageLink"

const imageSamples = {
  contemporaryArt:
    "https://d32dm0rphc51dk.cloudfront.net/f_WVnADS9HIc5dQ-sIcejA/thumb.jpg",
  impressionistAndModernArt:
    "https://d32dm0rphc51dk.cloudfront.net/Y2fVKtk64zRDfoGWgYSkJA/thumb.jpg",
  photography:
    "https://d32dm0rphc51dk.cloudfront.net/Cy1tDMUKkF_H-QN4BIDlDA/thumb.jpg",
  streetArt:
    "https://d32dm0rphc51dk.cloudfront.net/Tk7srLDTS-0Y60mbN7gWew/thumb.jpg",
}

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
    >
      Contemporary Art
    </ImageLink>
  ))
  .add("with responsive text", () => (
    <ImageLink
      href="http://example.com"
      imageUrl={imageSamples.streetArt}
      fontSize={["4t", "5t"]}
    >
      Street Art
    </ImageLink>
  ))
  .add("with a long text", () => (
    <ImageLink
      href="http://example.com"
      imageUrl={imageSamples.impressionistAndModernArt}
    >
      Impressionist and Modern Art
    </ImageLink>
  ))
