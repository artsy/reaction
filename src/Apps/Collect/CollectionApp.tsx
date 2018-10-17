import { Box } from "@artsy/palette"
import { CollectionApp_collection } from "__generated__/CollectionApp_collection.graphql"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { CollectFrame } from "./CollectFrame"
import { CollectionFilterFragmentContainer } from "./Components/Collection/CollectionFilterContainer"
import { CollectionHeader } from "./Components/Collection/Header"

interface CollectionAppProps {
  collection: CollectionApp_collection
}

export class CollectionApp extends Component<CollectionAppProps> {
  render() {
    const collection = this.props.collection

    return (
      <CollectFrame>
        <CollectionHeader
          description={
            <div dangerouslySetInnerHTML={{ __html: collection.description }} />
          }
          // image={collection.headerImage.large }
          image="https://artsy-vanity-files-production.s3.amazonaws.com/images/kaws2.png"
          // image_caption={collection.image_caption}
          slug={collection.slug}
          title={collection.title}
        />
        <Box>
          <CollectionFilterFragmentContainer collection={collection} />
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
      ...CollectionFilterContainer_collection
    }
  `
)
