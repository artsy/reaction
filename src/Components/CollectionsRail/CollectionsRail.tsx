import { Box, Col, Grid, Row, Sans, Spacer } from "@artsy/palette"
import { CollectionsRail_collections } from "__generated__/CollectionsRail_collections.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"

import { CollectionEntity } from "./Collection"

interface CollectionRailsProps {
  collections?: CollectionsRail_collections
  // collections?: any
}

const RailsWrapper = styled(Box)`
  width: 100%;
  max-width: 1250px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`

const CollectionsRow = styled(Row)`
  justify-content: space-between;
`

export class CollectionsRail extends React.Component<CollectionRailsProps> {
  getRails = () => {
    const collections: any[] = this.props.collections.map(
      (collection, index) => {
        return (
          <Col xl={5} lg={5} md={5} sm={12} key={index}>
            <CollectionEntity
              title={collection.title}
              headerImage={collection.headerImage}
              slug={collection.slug}
              price_guidance={collection.price_guidance}
            />
          </Col>
        )
      }
    )

    return (
      <Grid ml={0} mr={0}>
        <Box ml={0} mr={0}>
          <CollectionsRow width="100%">{collections}</CollectionsRow>
        </Box>
      </Grid>
    )
  }

  render() {
    return (
      <RailsWrapper pb={3}>
        <Sans size="6">Shop by collection</Sans>
        <Spacer mb={3} />
        {this.getRails()}
      </RailsWrapper>
    )
  }
}

export const CollectionsRailFragmentContainer = createFragmentContainer(
  CollectionsRail,
  graphql`
    fragment CollectionsRail_collections on MarketingCollection
      @relay(plural: true) {
      slug
      headerImage
      title
      price_guidance
      show_on_editorial
    }
  `
)
