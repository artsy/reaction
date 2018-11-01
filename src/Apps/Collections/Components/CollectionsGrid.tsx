import { Box, Sans } from "@artsy/palette"
import { CollectionsApp_collections } from "__generated__/CollectionsApp_collections.graphql"
import React, { Component } from "react"
import styled from "styled-components"
import { EntityHeader } from "Styleguide/Components/EntityHeader"

interface CollectionsGridProps {
  collections: CollectionsApp_collections
  categoryName?: string
}

export class CollectionsGrid extends Component<CollectionsGridProps> {
  render() {
    const { collections, categoryName } = this.props

    return (
      <Box>
        <Sans size="3" weight="medium">
          {categoryName}
        </Sans>

        <CollectionsContainer>
          {collections.map(collection => (
            <EntityHeader
              href={collection.slug}
              imageUrl={collection.headerImage}
              key={collection.slug}
              name={collection.title}
            />
          ))}
        </CollectionsContainer>
      </Box>
    )
  }
}

const CollectionsContainer = styled.div``
