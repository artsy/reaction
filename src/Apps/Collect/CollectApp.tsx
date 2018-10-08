import { Separator } from "@artsy/palette"
import { Box, Flex, Serif } from "@artsy/palette"
import { CollectApp_viewer } from "__generated__/CollectApp_viewer.graphql"
import React, { Component, Fragment } from "react"
import { LazyLoadComponent } from "react-lazy-load-image-component"
import { createFragmentContainer, graphql } from "react-relay"
import {
  Footer,
  RecentlyViewedQueryRenderer as RecentlyViewed,
} from "Styleguide/Components"
import { ArtworkGridFragmentContainer as ArtworkGrid } from "./Components/ArtworkGrid"
import { CollectionHeader } from "./Components/Header"

export interface CollectAppProps {
  name: string
  viewer?: CollectApp_viewer
}

export class CollectApp extends Component<CollectAppProps> {
  render() {
    const collection = {
      id: "minimalist-prints",
      title: "minimalist prints",
      image:
        "https://d7hftxdivxxvm.cloudfront.net?resize_to=width&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2Fbzx0Po9dHb_GhcvbD_c7jQ%2Funtouched-jpg.jpg&width=2000&quality=80",
      description:
        "Brian Donnelly, better known as KAWS, spent the first year of his career as an animator for Disney. After leaving in 1997, KAWS took inspiration from the company’s signature cartoon, Mickey Mouse, to create his own set of characters that he named “Companions.” With gloved hands and X’s for eyes, “Companions” first appeared in KAWS’s graffiti works across New York City in the late 1990s. By the end of the decade, the street artist created his first three-dimensional version, and his characters have since taken on a variety of colors, sizes, and poses. In 2017, his four-foot-tall Seated Companion (2011) broke the auction record for the series, selling for over $400,000. However, many of KAWS’s “Companions” are considerably more affordable, such as his vinyl toys produced in collaboration with esteemed manufacturers including Bounty Hunter, Bape, Medicom, and his own brand OriginalFake, which was active between 2006 and 2013.",
      medium: "prints",
      major_periods: [],
      gene_ids: [],
      artist_ids: [],
    }
    return (
      <Fragment>
        <Flex flexDirection="column">
          {true ? (
            <CollectionHeader collection={collection} />
          ) : (
            <Box mt={3} mb={4}>
              <Serif size="8">Collect Art &amp; Design Online</Serif>
            </Box>
          )}
          <Box>
            <ArtworkGrid viewer={this.props.viewer} />
          </Box>

          {typeof window !== "undefined" && (
            <LazyLoadComponent threshold={1000}>
              <RecentlyViewed />
            </LazyLoadComponent>
          )}
          <Separator mt={6} mb={3} />

          <Box>
            <Footer />
          </Box>
        </Flex>
      </Fragment>
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
      ) {
      ...ArtworkGrid_viewer
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
        )
    }
  `
)
