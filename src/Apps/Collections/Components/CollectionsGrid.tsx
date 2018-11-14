import { Box, Flex, Sans, Separator } from "@artsy/palette"
import React, { Component } from "react"
import { EntityHeader } from "Styleguide/Components/EntityHeader"
import { crop } from "Utils/resizer"
import { Media } from "Utils/Responsive"

export interface CollectionEntity {
  title: string
  headerImage?: string
  slug: string
}

interface CollectionsGridProps {
  collections: CollectionEntity[]
  name?: string
}

export class CollectionsGrid extends Component<CollectionsGridProps> {
  render() {
    const { collections, name } = this.props
    const hasShortRow = collections.length % 3 !== 0 // Preserve left align

    return (
      <Box pb={80}>
        <Sans size="3" weight="medium">
          {name}
        </Sans>

        <Flex flexWrap="wrap" justifyContent="space-between">
          {collections.map((collection, index) => {
            const imageUrl =
              collection.headerImage &&
              crop(collection.headerImage, {
                width: 50,
                height: 50,
              })

            return (
              <Flex width={["100%", "30%"]} flexDirection="column" key={index}>
                <Media at="xs">{index === 0 && <Separator />}</Media>
                <Media greaterThan="xs">{index < 3 && <Separator />}</Media>

                <Box py={2}>
                  <EntityHeader
                    href={`/collection/${collection.slug}`}
                    imageUrl={imageUrl}
                    name={collection.title}
                  />
                </Box>
                <Separator />
              </Flex>
            )
          })}

          <Media greaterThan="xs">
            {hasShortRow && <Box width={["100%", "30%"]} />}
          </Media>
        </Flex>
      </Box>
    )
  }
}
