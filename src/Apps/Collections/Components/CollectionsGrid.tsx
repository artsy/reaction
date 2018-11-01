import { Box, color, Sans } from "@artsy/palette"
import { CollectionsApp_collections } from "__generated__/CollectionsApp_collections.graphql"
import React, { Component } from "react"
import styled from "styled-components"
import { EntityHeader } from "Styleguide/Components/EntityHeader"
import { Col, Row } from "Styleguide/Elements/Grid"
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

            <CollectionsContainer>
              {collections.map((collection, index) => {
                const hasMarginRight = !xs && (index + 1) % 3 !== 0
                const hasBorderTop = xs ? index === 0 : index < 3

                return (
                  <CollectionContainer
                    key={index}
                    hasBorderTop={hasBorderTop}
                    hasMarginRight={hasMarginRight}
                    isFullWidth={xs}
                  >
                    <EntityHeader
                      href={`/collection/${collection.slug}`}
                      imageUrl={collection.headerImage}
                      name={collection.title}
                    />
                  </CollectionContainer>
                )
              })}
            </CollectionsContainer>
          </Box>
        )}
      </Responsive>
    )
  }
}

const CollectionsContainer = styled(Row)`
  justify-content: space-between;
`

const CollectionContainer = styled(Col)<{
  hasBorderTop: boolean
  hasMarginRight: boolean
  isFullWidth: boolean
}>`
  border-bottom: 1px solid ${color("black10")};
  padding: 20px 0;
  max-width: ${props => (props.isFullWidth ? "100%" : "calc(33% - 13px)")};

  ${props =>
    props.hasBorderTop &&
    `
    border-top: 1px solid ${color("black10")};
  `};

  ${props =>
    props.hasMarginRight &&
    `
    margin-right: 20px;
  `};
`
