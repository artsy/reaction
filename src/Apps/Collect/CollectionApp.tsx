import { Box } from "@artsy/palette"
import { CollectionApp_collection } from "__generated__/CollectionApp_collection.graphql"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { CollectFrame } from "./CollectFrame"
import { CollectArtworkGridRefreshContainer as ArtworkGrid } from "./Components/ArtworkGrid/CollectArtworkGrid"
import { CollectionHeader } from "./Components/Header"

type CollectionAppProps = CollectionApp_collection

export class CollectionApp extends Component<CollectionAppProps> {
  render() {
    return (
      <CollectFrame>
        <CollectionHeader
          description={this.props.description}
          // image={this.props.headerImage.large }
          image="https://artsy-vanity-files-production.s3.amazonaws.com/images/kaws2.png"
          // image_caption={this.props.image_caption}
          slug={this.props.slug}
          title={this.props.title}
        />
        <Box>
          <ArtworkGrid
            filtered_artworks={this.props.artworks as any}
            columnCount={3}
          />
        </Box>
      </CollectFrame>
    )
  }
}

export const CollectionAppFragmentContainer = createFragmentContainer(
  CollectionApp,
  graphql`
    fragment CollectionApp_collection on MarketingCollection {
      id
      slug
      title
      description
      headerImage {
        large
      }
      query {
        artist_ids
        artist_id
        gene_id
      }
      artworks {
        ...CollectArtworkGrid_filtered_artworks
      }
    }
  `
)
