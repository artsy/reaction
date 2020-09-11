import React from "react"
import * as Artsy from "Artsy"
import { Environment, QueryRenderer, graphql } from "react-relay"
import { ArtworkSaleMessageQuery } from "__generated__/ArtworkSaleMessageQuery.graphql"
import { get } from "Utils/get"

interface ArtworkSaleMessageProps {
  relayEnvironment: Environment
  artworkSlug: string
}

const ArtworkSaleMessage: React.FC<ArtworkSaleMessageProps> = props => {
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
  const { artworkSlug, relayEnvironment } = props
  return (
    <QueryRenderer<ArtworkSaleMessageQuery>
      environment={relayEnvironment}
      query={graphql`
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
      `}
      variables={{ artworkSlug }}
      render={readyState => {
        const artwork = readyState?.props?.artwork
        return <div>{artwork ? saleMessageDisplay(artwork) : null}</div>
      }}
    />
  )
}

export const ArtworkSaleMessageContainer = Artsy.withSystemContext(
  ArtworkSaleMessage
)
