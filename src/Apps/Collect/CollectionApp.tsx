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
        <CollectionHeader collection={collection} />
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
      headerImage
      category
      credit
      query {
        artist_ids
        artist_id
        gene_id
      }
      ...CollectionFilterContainer_collection
    }
  `
)
