import { Box, Serif } from "@artsy/palette"
import { CollectApp_viewer } from "__generated__/CollectApp_viewer.graphql"
import React, { Component } from "react"
import { Meta, Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import { CollectFrame } from "./CollectFrame"
import { CollectFilterFragmentContainer as ArtworkGrid } from "./Components/Base/CollectFilterContainer"
export interface CollectAppProps {
  viewer?: CollectApp_viewer
}

export class CollectApp extends Component<CollectAppProps> {
  render() {
    return (
      <CollectFrame>
        <Title>Collect | Artsy</Title>
        <Meta property="og:url" content={`${sd.APP_URL}/collect`} />
        <Meta
          property="og:image"
          content={`${sd.APP_URL}/images/og_image.jpg`}
        />

        <Box mt={3} mb={4}>
          <Serif size="8">Collect art and design online</Serif>
        </Box>
        <Box>
          <ArtworkGrid viewer={this.props.viewer} />
        </Box>
      </CollectFrame>
    )
  }
}

export const CollectAppFragmentContainer = createFragmentContainer(
  CollectApp,
  graphql`
    fragment CollectApp_viewer on Viewer
      @argumentDefinitions(
        medium: { type: "String", defaultValue: "*" }
        major_periods: { type: "[String]" }
        partner_id: { type: "ID" }
        for_sale: { type: "Boolean" }
        at_auction: { type: "Boolean" }
        acquireable: { type: "Boolean" }
        inquireable_only: { type: "Boolean" }
        aggregations: {
          type: "[ArtworkAggregation]"
          defaultValue: [MEDIUM, TOTAL]
        }
        sort: { type: "String", defaultValue: "-partner_updated_at" }
        price_range: { type: "String" }
        artist_id: { type: "String" }
        attribution_class: { type: "String" }
      ) {
      ...CollectFilterContainer_viewer
        @arguments(
          medium: $medium
          major_periods: $major_periods
          partner_id: $partner_id
          for_sale: $for_sale
          sort: $sort
          acquireable: $acquireable
          at_auction: $at_auction
          inquireable_only: $inquireable_only
          price_range: $price_range
          artist_id: $artist_id
          attribution_class: $attribution_class
        )
    }
  `
)
