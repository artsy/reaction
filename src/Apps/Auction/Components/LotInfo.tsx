import { Flex, Image, Sans, Serif } from "@artsy/palette"
import { LotInfo_artwork } from "__generated__/LotInfo_artwork.graphql"
import { LotInfo_saleArtwork } from "__generated__/LotInfo_saleArtwork.graphql"
import React from "react"
import { createFragmentContainer, graphql, RelayProp } from "react-relay"

interface Props {
  artwork: LotInfo_artwork
  saleArtwork: LotInfo_saleArtwork
  relay: RelayProp
}

export const LotInfo: React.FC<Props> = ({ artwork, saleArtwork }) => {
  const {
    counts: { bidderPositions: bidCount },
  } = saleArtwork
  return (
    <Flex py={4}>
      <Flex maxWidth="150px">
        <Image width="100%" src={artwork.imageUrl} />
      </Flex>
      <Flex pl={3} pt={1} flexDirection="column">
        <Sans size="3" weight="medium" color="black100">
          Lot {saleArtwork.lotLabel}
        </Sans>
        <Serif size="3" color="black100">
          <i>{artwork.title}</i>
          {artwork.date && `, ${artwork.date}`}
        </Serif>
        <Serif size="3" color="black100">
          {artwork.artistNames}
        </Serif>
        <br />
        <Serif size="3">
          Current Bid: {saleArtwork.minimumNextBid.display}
        </Serif>
        {bidCount > 0 && (
          <Serif size="3" color="black60">
            ({bidCount} bid{bidCount > 1 && "s"})
          </Serif>
        )}
      </Flex>
    </Flex>
  )
}

export const LotInfoFragmentContainer = createFragmentContainer(LotInfo, {
  artwork: graphql`
    fragment LotInfo_artwork on Artwork {
      _id
      date
      title
      imageUrl
      artistNames: artist_names
    }
  `,
  saleArtwork: graphql`
    fragment LotInfo_saleArtwork on SaleArtwork {
      counts {
        bidderPositions: bidder_positions
      }
      lotLabel: lot_label
      minimumNextBid: minimum_next_bid {
        amount
        cents
        display
      }
    }
  `,
})
