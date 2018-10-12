import { Box } from "@artsy/palette"
// import { CollectionApp_collection } from "__generated__/CollectionApp_collection.graphql"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { CollectFrame } from "./CollectFrame"
// import { ArtworkGridFragmentContainer as ArtworkGrid } from "./Components/ArtworkGrid"
import { CollectionHeader } from "./Components/Header"

import { ArtworkGridExample as ArtworkGrid } from "Styleguide/Components"

export interface CollectionAppProps {
  description: string
  // filter_artworks?: CollectionApp_filter_artworks
  image: string
  image_caption: string
  slug: string
  title: string
}

export class CollectionApp extends Component<CollectionAppProps> {
  render() {
    return (
      <CollectFrame>
        <CollectionHeader
          description={this.props.description}
          image={this.props.image}
          image_caption={this.props.image_caption}
          slug={this.props.slug}
          title={this.props.title}
        />
        <Box>
          <ArtworkGrid filter_artworks={this.props.collection.artworks} />
        </Box>
      </CollectFrame>
    )
  }
}

export const CollectionAppFragmentContainer = createFragmentContainer(
  CollectionApp,
  graphql`
    fragment CollectionApp_collection on Collection {
      @argumentDefinitions(id: { type: "String" }) {
      collection(id: $id) {
        id
        description
        image
        image_caption
        title
        artworks
      }
    }
    # fragment CollectionApp_collection on Collection
    #   @argumentDefinitions(slug: { type: "String" }) {
    #   ...ArtworkGrid_viewer @arguments(slug: $slug)
    # }
  `
)
