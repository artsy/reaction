import { Col, Row, Separator } from "@artsy/palette"
import { FeatureApp_viewer } from "__generated__/FeatureApp_viewer.graphql"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { Footer } from "Components/Footer"
import React from "react"
import { Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { FeatureFragmentContainer as Feature } from "./Components/Feature"

interface FeatureAppProps {
  viewer: FeatureApp_viewer
}

export const FeatureApp: React.FC<FeatureAppProps> = props => {
  return (
    <AppContainer>
      <Title>Art Keeps Going</Title>
      <Feature viewer={props.viewer} />
      <Separator mt={6} mb={3} />
      <Row>
        <Col>
          <HorizontalPadding>
            <Footer />
          </HorizontalPadding>
        </Col>
      </Row>
    </AppContainer>
  )
}

export const FeatureAppFragmentContainer = createFragmentContainer(FeatureApp, {
  viewer: graphql`
    fragment FeatureApp_viewer on Viewer
      @argumentDefinitions(
        articleIDs: { type: "[String]!" }
        selectedWorksSetID: { type: "String!" }
        collectionRailItemIDs: { type: "[String!]" }
        auctionRailItemIDs: { type: "[String!]" }
        fairRailItemIDs: { type: "[String!]" }
        hasCollectionRailItems: { type: "Boolean!" }
        hasAuctionRailItems: { type: "Boolean!" }
        hasFairRailItems: { type: "Boolean!" }
      ) {
      ...Feature_viewer
        @arguments(
          articleIDs: $articleIDs
          selectedWorksSetID: $selectedWorksSetID
          collectionRailItemIDs: $collectionRailItemIDs
          auctionRailItemIDs: $auctionRailItemIDs
          fairRailItemIDs: $fairRailItemIDs
          hasCollectionRailItems: $hasCollectionRailItems
          hasAuctionRailItems: $hasAuctionRailItems
          hasFairRailItems: $hasFairRailItems
        )
    }
  `,
})

export default FeatureAppFragmentContainer
