import {
  Avatar,
  Box,
  Flex,
  Link,
  Sans,
  Separator,
  Serif,
  Spacer,
} from "@artsy/palette"
import React, { Component } from "react"
import styled from "styled-components"
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

                <LinkWithoutBorder
                  noUnderline
                  color="black100"
                  href={`/collection/${collection.slug}`}
                >
                  <Flex py={2} alignItems="center">
                    <Avatar size="xs" src={imageUrl} />

                    <Serif ml={1} size="4t">
                      {collection.title}
                    </Serif>
                  </Flex>
                </LinkWithoutBorder>
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

const LinkWithoutBorder = styled(Link)`
  &:focus {
    border: none;
  }
`
