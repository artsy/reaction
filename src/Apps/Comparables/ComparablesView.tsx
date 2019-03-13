import { Box, Spinner } from "@artsy/palette"
import { ComparablesViewQuery } from "__generated__/ComparablesViewQuery.graphql"
import { ContextProps, SystemContext } from "Artsy"
import React, { useContext } from "react"
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

export const Comparables: React.FC<Props> = props => {
  const { attributionClass, artistID, medium, priceRange, forSale } = props

  const { relayEnvironment } = useContext(SystemContext)

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
        render={({ props: relayProps }) => {
          if (relayProps) {
            return (
              <Box pt={3} pb={3}>
                <ComparablesFragmentContainer viewer={relayProps.viewer} />
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
}

const SpinnerContainer = styled.div`
  width: 100%;
  height: 100px;
  position: relative;
`
