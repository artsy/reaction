import { Box, Flex, Sans, Separator } from "@artsy/palette"
import { CollectionsApp_collections } from "__generated__/CollectionsApp_collections.graphql"
import React, { Component } from "react"
import { EntityHeader } from "Styleguide/Components/EntityHeader"
import { Media } from "Utils/Responsive"

interface CollectionsGridProps {
  collections: CollectionsApp_collections
  name?: string
}

export class CollectionsGrid extends Component<CollectionsGridProps> {
  render() {
    const { collections, name } = this.props

    return (
      <Box>
        <Sans size="3" weight="medium">
          {name}
        </Sans>

        <Flex flexWrap="wrap" justifyContent="space-between">
          {collections.map((collection, index) => {
            return (
              <Flex width={["100%", "30%"]} flexDirection="column" key={index}>
                {index === 0 && (
                  <Media at="xs">
                    <Separator />
                  </Media>
                )}
                {index < 3 && (
                  <Media greaterThan="xs">
                    <Separator />
                  </Media>
                )}
                <Box py={2}>
                  <EntityHeader
                    href={`/collection/${collection.slug}`}
                    imageUrl={collection.headerImage}
                    name={collection.title}
                  />
                </Box>
                <Separator />
              </Flex>
            )
          })}
        </Flex>
      </Box>
    )
  }
}
