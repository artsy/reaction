import { Box, Flex, Sans, Separator, Spacer } from "@artsy/palette"
import { CollectionsApp_collections } from "__generated__/CollectionsApp_collections.graphql"
import React, { Component } from "react"
import styled from "styled-components"
import { EntityHeader } from "Styleguide/Components/EntityHeader"
import { Col } from "Styleguide/Elements/Grid"
import { Responsive } from "Utils/Responsive"
interface CollectionsGridProps {
  collections: CollectionsApp_collections
  categoryName?: string
}

export class CollectionsGrid extends Component<CollectionsGridProps> {
  render() {
    const { collections, categoryName } = this.props

    return (
      <Responsive>
        {({ xs }) => (
          <Box>
            <Sans size="3" weight="medium">
              {categoryName}
            </Sans>

            <Flex flexWrap="wrap" justifyContent="space-between">
              {collections.map((collection, index) => {
                const hasMarginRight = !xs && (index + 1) % 3 !== 0
                const hasBorderTop = xs ? index === 0 : index < 3

                return (
                  // <Col
                  //   key={index}
                  //   sm={4}
                  //   // isFullWidth={xs}
                  // >
                  <Flex>
                    <Box width={["20%", "30%"]}>
                      {hasBorderTop && <Separator />}
                      <Box py={2}>
                        <EntityHeader
                          href={`/collection/${collection.slug}`}
                          imageUrl={collection.headerImage}
                          name={collection.title}
                        />
                      </Box>
                      <Separator />
                    </Box>
                    {hasMarginRight && <Spacer m={2} />}
                  </Flex>
                  // </Col>
                )
              })}
            </Flex>
          </Box>
        )}
      </Responsive>
    )
  }
}

// max-width: ${props => (props.isFullWidth ? "100%" : "calc(33% - 13px)")};
// ${props =>
//   props.hasBorderTop &&
//   `
//   border-top: 1px solid ${color("black10")};
// `};

// ${props =>
//   props.hasMarginRight &&
//   `
//   margin-right: 20px;
// `};
// border-bottom: 1px solid ${color("black10")};

const CollectionContainer = styled(Box)<{
  hasBorderTop?: boolean
  hasMarginRight?: boolean
  isFullWidth?: boolean
}>``
