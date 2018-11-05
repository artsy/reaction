import { Box } from "@artsy/palette"
import { CollectionApp_collection } from "__generated__/CollectionApp_collection.graphql"
import { HttpError } from "found"
import React, { Component } from "react"
import { Meta, Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import truncate from "trunc-html"
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

  componentWillMount() {
    this.collectionNotFound(this.props.collection)
  }

  render() {
    const { collection } = this.props
    const { title, slug, headerImage, description } = collection
    const truncatedDescription = truncate(description, 158).text

    return (
      <CollectFrame>
        <Title>{title} | Collect on Artsy</Title>
        <Meta name="description" content={truncatedDescription} />
        <Meta property="og:url" content={`${sd.APP_URL}/collection/${slug}`} />
        <Meta property="og:image" content={headerImage} />
        <Meta property="og:description" content={truncatedDescription} />
        <Meta property="twitter:description" content={truncatedDescription} />

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
    fragment CollectionApp_collection on MarketingCollection
      @argumentDefinitions(
        medium: { type: "String", defaultValue: "*" }
        major_periods: { type: "[String]" }
        partner_id: { type: "ID" }
        for_sale: { type: "Boolean" }
        at_auction: { type: "Boolean" }
        acquireable: { type: "Boolean" }
        inquireable_only: { type: "Boolean" }
        sort: { type: "String", defaultValue: "-partner_updated_at" }
        price_range: { type: "String" }
      ) {
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
        @arguments(
          medium: $medium
          major_periods: $major_periods
          for_sale: $for_sale
          sort: $sort
          acquireable: $acquireable
          at_auction: $at_auction
          inquireable_only: $inquireable_only
          price_range: $price_range
        )
    }
  `
)
