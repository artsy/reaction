import { Box } from "@artsy/palette"
import { CollectionApp_collection } from "__generated__/CollectionApp_collection.graphql"
import { HttpError } from "found"
import React, { Component } from "react"
import { Meta, Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import { CollectFrame } from "./CollectFrame"
import { CollectionFilterFragmentContainer as CollectionFilterContainer } from "./Components/Collection/CollectionFilterContainer"
import { CollectionHeader } from "./Components/Collection/Header"

interface CollectionAppProps {
  collection: CollectionApp_collection
}

export class CollectionApp extends Component<CollectionAppProps> {
  collectionNotFound = collection => {
    if (!collection) {
      throw new HttpError(404)
    }
  }

  render() {
    const { collection } = this.props
    this.collectionNotFound(collection)
    const { title, slug, headerImage } = collection

    return (
      <CollectFrame>
        <Title>{title} | Collect on Artsy</Title>
        <Meta property="og:url" content={`${sd.APP_URL}/collection/${slug}`} />
        <Meta property="og:image" content={headerImage} />

        <CollectionHeader collection={collection} />
        <Box>
          <CollectionFilterContainer collection={collection} />
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
