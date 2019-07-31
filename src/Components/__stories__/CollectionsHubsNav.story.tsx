import { Theme } from "@artsy/palette"
import { MockRelayRenderer } from "DevTools"
import React from "react"
import { graphql } from "react-relay"
import { storiesOf } from "storybook/storiesOf"
import { CollectionsHubsNavFragmentContainer } from "../CollectionsHubsNav"
import { imageSamples } from "./ImageLink.story"

storiesOf("Components/CollectionsHubsNav", module).add("default", () => (
  <Theme>{render()}</Theme>
))

const hubsQuery = graphql`
  query CollectionsHubsNavStoryQuery {
    marketingHubCollections {
      ...CollectionsHubsNav_marketingHubCollections
    }
  }
`

const marketingHubCollections = [
  {
    slug: "street-art  ",
    title: "Street Art  ",
    thumbnail: imageSamples.streetArt,
  },
  {
    slug: "pre-twentieth-century",
    title: "Pre-20th",
    thumbnail: imageSamples.preTwentiethCentury,
  },
  {
    slug: "post-war-art",
    title: "Post-War",
    thumbnail: imageSamples.postWarArt,
  },
  {
    slug: "contemporary-art",
    title: "Contemporary",
    thumbnail: imageSamples.contemporaryArt,
  },
  {
    slug: "impressionist-and-modern-art",
    title: "Impressionist & Modern",
    thumbnail: imageSamples.impressionistAndModernArt,
  },
  {
    slug: "photography",
    title: "Photography",
    thumbnail: imageSamples.photography,
  },
]

const render = () => {
  return (
    <MockRelayRenderer
      Component={CollectionsHubsNavFragmentContainer}
      mockData={{ marketingHubCollections }}
      query={hubsQuery}
    />
  )
}
