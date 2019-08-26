import { Box } from "@artsy/palette"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { CollectionsHubsNavItem } from "../CollectionsHubsNavItem"

const imageSample =
  "https://d7hftxdivxxvm.cloudfront.net/?resize_to=fill&width=357&height=175&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FeF_qAORql7lSnD2BwbFOYg%2Flarge.jpg"

storiesOf("Components/CollectionsHubsNavItem", module)
  .add("with specific dimensions", () => (
    <Box width={300}>
      <CollectionsHubsNavItem
        href="http://example.com"
        imageUrl={imageSample}
        title="Photography"
      />
    </Box>
  ))
  .add("with variable dimensions", () => (
    <Box width="30%">
      <CollectionsHubsNavItem
        href="http://example.com"
        imageUrl={imageSample}
        title="Street Art"
      />
    </Box>
  ))
  .add("with a long text", () => (
    <Box width={300}>
      <CollectionsHubsNavItem
        href="http://example.com"
        imageUrl={imageSample}
        title="Impressionist and Modern Art and Other Things People Like"
      />
    </Box>
  ))
  .add("with specific dimensions", () => (
    <Box width={300}>
      <CollectionsHubsNavItem
        href="http://example.com"
        imageUrl={imageSample}
        title="Photography"
      />
    </Box>
  ))
  .add("with title and subtitle", () => (
    <Box width={300}>
      <CollectionsHubsNavItem
        href="http://example.com"
        imageUrl={imageSample}
        title="Photography"
        subtitle="Today’s leading artists and emerging talents "
      />
    </Box>
  ))
