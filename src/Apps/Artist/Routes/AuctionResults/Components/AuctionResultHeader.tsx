import { Box, Link, Sans, Serif } from "@artsy/palette"
import { AuctionResultHeader_artist } from "__generated__/AuctionResultHeader_artist.graphql"
import React from "react"
import { createFragmentContainer } from "react-relay"
import { graphql } from "relay-runtime"
import { data as sd } from "sharify"

interface Props {
  artist: AuctionResultHeader_artist
}

const AuctionResultHeader: React.FC<Props> = props => {
  const { artist } = props

  return (
    <Box pb={2}>
      <Sans size="5t">Auction results</Sans>
      <Serif size="3" color="black100">
        Filter auction results to compare past lots by medium, size, and more.
        Note that auction prices vary based on market specifics at the time of
        the auction and may not be indicative of the current gallery market. To
        get the best sense of value, pair the artist’s auction results with
        their{" "}
        <Link href={`${sd.APP_URL}/artist/${artist.slug}/cv`}>
          career highlights
        </Link>{" "}
        like exhibition history, gallery representation, and presence in museum
        collections. For more information on how auction pricing differs from
        gallery pricing, check out{" "}
        <Link
          href={`${sd.APP_URL}/article/artsy-editorial-gallery-auction-house-buy`}
        >
          this article
        </Link>
        .
      </Serif>
    </Box>
  )
}

export const AuctionResultHeaderFragmentContainer = createFragmentContainer(
  AuctionResultHeader,
  {
    artist: graphql`
      fragment AuctionResultHeader_artist on Artist {
        slug
      }
    `,
  }
)
