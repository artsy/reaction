import { Box, Sans, Serif } from "@artsy/palette"
import { AuctionResultHeader_artist } from "__generated__/AuctionResultHeader_artist.graphql"
import React from "react"
import { createFragmentContainer } from "react-relay"
import { graphql } from "relay-runtime"

interface Props {
  artist: AuctionResultHeader_artist
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
      fragment AuctionResultHeader_artist on Artist {
        name
      }
    `,
  }
)
