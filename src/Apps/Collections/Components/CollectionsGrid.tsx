import { Box, Flex, Sans, Separator, Spacer } from "@artsy/palette"
import React, { Component } from "react"
import { EntityHeader } from "Styleguide/Components/EntityHeader"
import { slugify } from "underscore.string"
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
      <Box pb={80} id={slugify(name)}>
        <Sans size="3" weight="medium" pb={15}>
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

                <EntityHeader
                  py={2}
                  href={`/collection/${collection.slug}`}
                  imageUrl={imageUrl}
                  name={collection.title}
                />
                <Separator />
              </Flex>
            )
          })}

          {hasShortRow && (
            <Media greaterThan="xs">
              {(_, renderChildren) =>
                renderChildren && <Spacer width={["100%", "30%"]} />
              }
            </Media>
          )}
        </Flex>
      </Box>
    )
  }
}
