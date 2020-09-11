import React from "react"
import * as Artsy from "Artsy"
import { Environment, QueryRenderer, graphql } from "react-relay"
import {
  ArtworkSaleMessageQuery,
  ArtworkSaleMessageQueryResponse,
} from "__generated__/ArtworkSaleMessageQuery.graphql"
import { get } from "Utils/get"

interface ArtworkSaleMessageQueryRendererProps {
  relayEnvironment: Environment
  artworkSlug: string
}

export const ArtworkSaleMessage: React.FC<ArtworkSaleMessageQueryResponse> = props => {
  const bidInfo = artwork => {
    const { sale } = artwork

    const inRunningAuction = sale && sale.isAuction && !sale.isClosed
    if (!inRunningAuction) {
      return undefined
    }

    const bidderPositionCounts = get(
      artwork,
      a => a.saleArtwork.counts.bidderPositions,
      0
    )

    if (bidderPositionCounts === 0) {
      return undefined
    }

    const s = bidderPositionCounts > 1 ? "s" : ""
    return `(${bidderPositionCounts} bid${s})`
  }

  const saleMessageDisplay = artwork => {
    const { sale } = artwork
    const isAuction = sale && sale.isAuction

    if (isAuction) {
      const showBiddingClosed = sale.isClosed
      if (showBiddingClosed) {
        return "Bidding closed"
      } else {
        const highestBidDisplay = get(
          artwork,
          p => p.saleArtwork.highestBid.display
        )
        const openingBidDisplay = get(
          artwork,
          p => p.saleArtwork.openingBid.display
        )

        return highestBidDisplay || openingBidDisplay || ""
      }
    }

    return artwork.saleMessage === "Contact For Price"
      ? "Contact for price"
      : artwork.saleMessage
  }

  const { artwork } = props
  const saleMessage = `${saleMessageDisplay(artwork)} ${bidInfo(artwork) ||
    ""}`.trim()
  return <span key="artworkSaleMessage">{saleMessage}</span>
}

export const ArtworkSaleMessageQueryString = graphql`
  query ArtworkSaleMessageQuery($artworkSlug: String!) {
    artwork(id: $artworkSlug) {
      saleMessage
      sale {
        isAuction
        isClosed
      }
      saleArtwork {
        counts {
          bidderPositions
        }
        highestBid {
          display
        }
        openingBid {
          display
        }
      }
    }
  }
`

export const ArtworkSaleMessageQueryRenderer: React.FC<ArtworkSaleMessageQueryRendererProps> = props => {
  const { artworkSlug, relayEnvironment } = props
  return (
    <QueryRenderer<ArtworkSaleMessageQuery>
      environment={relayEnvironment}
      query={ArtworkSaleMessageQueryString}
      variables={{ artworkSlug }}
      render={readyState => {
        const artwork = readyState?.props?.artwork
        return artwork ? <ArtworkSaleMessage artwork={artwork} /> : null
      }}
    />
  )
}

export const ArtworkSaleMessageContainer = Artsy.withSystemContext(
  ArtworkSaleMessageQueryRenderer
)
