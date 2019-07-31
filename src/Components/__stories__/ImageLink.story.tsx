import React from "react"
import { storiesOf } from "storybook/storiesOf"
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

const imageSamples = {
  contemporaryArt:
    "https://d32dm0rphc51dk.cloudfront.net/f_WVnADS9HIc5dQ-sIcejA/thumb.jpg",
  postWarArt:
    "https://d32dm0rphc51dk.cloudfront.net/dtSncXEq-KNTWbWNG_xMTA/thumb.jpg",
  impressionistAndModernArt:
    "https://d32dm0rphc51dk.cloudfront.net/Y2fVKtk64zRDfoGWgYSkJA/thumb.jpg",
  preTwentiethCentury:
    "https://d32dm0rphc51dk.cloudfront.net/adz_7LkzkU5A_ucVjQLMtQ/thumb.jpg",
  photography:
    "https://d32dm0rphc51dk.cloudfront.net/Cy1tDMUKkF_H-QN4BIDlDA/thumb.jpg",
  streetArt:
    "https://d32dm0rphc51dk.cloudfront.net/Tk7srLDTS-0Y60mbN7gWew/thumb.jpg",
}
