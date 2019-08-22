import { Box, Separator, Serif } from "@artsy/palette"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import {
  CollectionsHubsNavItem,
  IL2SubTitle,
  IL2Title,
  ImageLink,
  ImageLink2,
} from "../CollectionsHubsNavItem"

const imageSample =
  "https://d7hftxdivxxvm.cloudfront.net/?resize_to=fill&width=357&height=175&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FeF_qAORql7lSnD2BwbFOYg%2Flarge.jpg"

storiesOf("Components/CollectionsHubsNavItem", module)
  .add("with specific dimensions", () => (
    <Box width={300}>
      <CollectionsHubsNavItem href="http://example.com" imageUrl={imageSample}>
        Photography
      </CollectionsHubsNavItem>
    </Box>
  ))
  .add("with variable dimensions", () => (
    <Box width="30%">
      <CollectionsHubsNavItem href="http://example.com" imageUrl={imageSample}>
        Street Art
      </CollectionsHubsNavItem>
    </Box>
  ))
  .add("with a long text", () => (
    <Box width={300}>
      <CollectionsHubsNavItem href="http://example.com" imageUrl={imageSample}>
        Impressionist and Modern Art and Other Things People Like
      </CollectionsHubsNavItem>
    </Box>
  ))
  .add("ImageLink", () => (
    <>
      <Box width={300}>
        <Serif element="h2" size="6" p="2">
          Method 1: pass title and subtitle as props
        </Serif>
        <ImageLink
          href="google.com"
          src="http://placekitten.com/300/200"
          alt="kitty kitty meow meow"
          title={
            <Serif size="5" element="h4">
              I miss my little kitty kat
            </Serif>
          }
          subtitle={<Serif size="3">And his little baby fur feet</Serif>}
        />
      </Box>
      <Separator />
      <Box width={300}>
        <Serif element="h2" size="6" p="2">
          Method 2: pass title and subtitle as children
        </Serif>
        <ImageLink2
          href="google.com"
          src="http://placekitten.com/300/200"
          alt="kitty kitty meow meow"
        >
          <IL2Title>I miss my little kitty kat</IL2Title>
          <IL2SubTitle size="5">And his little baby fur feet</IL2SubTitle>
        </ImageLink2>
      </Box>
    </>
  ))
