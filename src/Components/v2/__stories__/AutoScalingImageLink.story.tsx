import { Box } from "@artsy/palette"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { AutoScalingImageLink } from "../AutoScalingImageLink"

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

storiesOf("Components/AutoScalingImageLink", module)
  .add("with specific dimensions", () => (
    <Box width={300}>
      <AutoScalingImageLink
        href="http://example.com"
        imageUrl={imageSamples.photography}
        {...imageSize}
      >
        Photography
      </AutoScalingImageLink>
    </Box>
  ))
  .add("with responsive dimensions", () => (
    <Box width={[200, 300, 400]}>
      <AutoScalingImageLink
        href="http://example.com"
        imageUrl={imageSamples.streetArt}
        fontSize={["4t", "5t"]}
        {...imageSize}
      >
        Street Art
      </AutoScalingImageLink>
    </Box>
  ))
  .add("with variable dimensions", () => (
    <Box width="30%">
      <AutoScalingImageLink
        href="http://example.com"
        imageUrl={imageSamples.streetArt}
        fontSize={["4t", "5t"]}
        {...imageSize}
      >
        Street Art
      </AutoScalingImageLink>
    </Box>
  ))
  .add("with a long text", () => (
    <Box width={imageSize.maxWidth}>
      <AutoScalingImageLink
        href="http://example.com"
        imageUrl={imageSamples.impressionistAndModernArt}
        {...imageSize}
      >
        Impressionist and Modern Art
      </AutoScalingImageLink>
    </Box>
  ))
