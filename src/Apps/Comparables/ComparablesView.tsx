import { Box, Spinner } from "@artsy/palette"
import { ComparablesViewQuery } from "__generated__/ComparablesViewQuery.graphql"
import { ContextConsumer, ContextProps } from "Artsy"
import React, { Component } from "react"
import { graphql, QueryRenderer } from "react-relay"
import styled from "styled-components"
import { ComparablesFragmentContainer } from "./Filter"

export interface Props extends ContextProps {
  artistID?: string
  medium?: string
  priceRange?: string
  forSale?: boolean
  attributionClass?: string[]
}

export class Comparables extends Component<Props> {
  render() {
    const {
      attributionClass,
      artistID,
      medium,
      priceRange,
      forSale,
    } = this.props

    return (
      <ContextConsumer>
        {({ relayEnvironment }) => {
          return (
            <>
              <QueryRenderer<ComparablesViewQuery>
                environment={relayEnvironment}
                query={graphql`
                  query ComparablesViewQuery(
                    $medium: String
                    $major_periods: [String]
                    $partner_id: ID
                    $for_sale: Boolean
                    $sort: String
                    $at_auction: Boolean
                    $ecommerce: Boolean
                    $inquireable_only: Boolean
                    $price_range: String
                    $artist_id: String
                    $attribution_class: [String]
                    $acquireable: Boolean
                  ) {
                    viewer {
                      ...Filter_viewer
                        @arguments(
                          medium: $medium
                          major_periods: $major_periods
                          partner_id: $partner_id
                          for_sale: $for_sale
                          sort: $sort
                          at_auction: $at_auction
                          ecommerce: $ecommerce
                          inquireable_only: $inquireable_only
                          price_range: $price_range
                          artist_id: $artist_id
                          attribution_class: $attribution_class
                          acquireable: $acquireable
                        )
                    }
                  }
                `}
                variables={{
                  artist_id: artistID,
                  medium,
                  price_range: priceRange,
                  for_sale: forSale,
                  attribution_class: attributionClass,
                  sort: "-decayed_merch",
                }}
                render={({ props }) => {
                  if (props) {
                    return (
                      <Box pt={3} pb={3}>
                        <ComparablesFragmentContainer viewer={props.viewer} />
                      </Box>
                    )
                  } else {
                    return (
                      <SpinnerContainer>
                        <Spinner />
                      </SpinnerContainer>
                    )
                  }
                }}
              />
            </>
          )
        }}
      </ContextConsumer>
    )
  }
}

const SpinnerContainer = styled.div`
  width: 100%;
  height: 100px;
  position: relative;
`
