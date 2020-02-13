import { Box, Sans, Serif } from "@artsy/palette"
import { AuctionResultHeader_results } from "__generated__/AuctionResultHeader_results.graphql"
import React from "react"
import { createFragmentContainer } from "react-relay"
import { graphql } from "relay-runtime"

interface Props {
  artist: AuctionResultHeader_results
}

const AuctionResultHeader: React.FC<Props> = props => {
  const { artist } = props
  return (
    <Box pb={2}>
      <Sans size="5t">Auction results</Sans>
      <Serif size="3" color="black100">
        Filter past auction results to compare and evaluate {artist.name}'s
        market.
      </Serif>
    </Box>
  )
}

export const AuctionResultHeaderFragmentContainer = createFragmentContainer(
  AuctionResultHeader,
  {
    artist: graphql`
      fragment AuctionResultHeader_results on Artist {
        name
      }
    `,
  }
)
