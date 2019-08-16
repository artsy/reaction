import { Box } from "@artsy/palette"
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

const imageSize = {
  maxWidth: 346,
  maxHeight: 216,
}

storiesOf("Components/ImageLink", module)
  .add("with specific dimensions", () => (
    <Box width={300}>
      <ImageLink
        href="http://example.com"
        imageUrl={imageSamples.photography}
        {...imageSize}
      >
        Photography
      </ImageLink>
    </Box>
  ))
  .add("with responsive dimensions", () => (
    <Box width={[200, 300, 400]}>
      <ImageLink
        href="http://example.com"
        imageUrl={imageSamples.streetArt}
        fontSize={["4t", "5t"]}
        {...imageSize}
      >
        Street Art
      </ImageLink>
    </Box>
  ))
  .add("with variable dimensions", () => (
    <Box width="30%">
      <ImageLink
        href="http://example.com"
        imageUrl={imageSamples.streetArt}
        fontSize={["4t", "5t"]}
        {...imageSize}
      >
        Street Art
      </ImageLink>
    </Box>
  ))
  .add("with a long text", () => (
    <Box width={imageSize.maxWidth}>
      <ImageLink
        href="http://example.com"
        imageUrl={imageSamples.impressionistAndModernArt}
        {...imageSize}
      >
        Impressionist and Modern Art
      </ImageLink>
    </Box>
  ))
