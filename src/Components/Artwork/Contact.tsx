import { Contact_artwork } from "__generated__/Contact_artwork.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { get } from "Utils/get"
import TextLink from "../TextLink"

export interface ContactProps extends React.HTMLProps<Contact> {
  artwork: Contact_artwork
}

export class Contact extends React.Component<ContactProps, null> {
  contactLine() {
    const { artwork } = this.props
    if (artwork.sale && artwork.sale.is_auction) {
      return this.auctionLine()
    } else if (artwork.is_inquireable) {
      return this.contactPartnerLine()
    }
  }

  auctionLine() {
    const { artwork } = this.props
    const isLiveOpen = get(artwork, p => p.sale.is_live_open)
    const isOpen = get(artwork, p => p.sale.is_open)
    const isClosed = get(artwork, p => p.sale.is_closed)

    if (isLiveOpen) {
      return (
        <TextLink href={artwork.href} underline>
          Enter Live Auction
        </TextLink>
      )
    } else if (isOpen) {
      const sa = get(artwork, p => p.sale_artwork)
      const bidderPositions = get(sa, p => p.counts.bidder_positions)
      const highestBidDisplay = get(sa, p => p.highest_bid.display)
      const openingBidDisplay = get(sa, p => p.opening_bid.display)

      if (bidderPositions && bidderPositions > 0) {
        const s = bidderPositions > 1 ? "s" : ""
        return (
          <span>
            {highestBidDisplay} ({bidderPositions} bid
            {s})
          </span>
        )
      } else {
        return <span>{openingBidDisplay}</span>
      }
    } else if (isClosed) {
      return <span>Auction closed</span>
    } else {
      return <span />
    }
  }

  contactPartnerLine() {
    const partner = get(this.props, p =>
      p.artwork.partner.type.toLocaleLowerCase()
    )

    if (partner) {
      return (
        <TextLink href={this.props.artwork.href} underline>
          Contact {partner}
        </TextLink>
      )
    } else {
      return null
    }
  }

  render() {
    return <div>{this.contactLine()}</div>
  }
}

export default createFragmentContainer(Contact, {
  artwork: graphql`
    fragment Contact_artwork on Artwork {
      _id
      href
      is_inquireable
      sale {
        is_auction
        is_live_open
        is_open
        is_closed
      }
      partner(shallow: true) {
        type
      }
      sale_artwork {
        highest_bid {
          display
        }
        opening_bid {
          display
        }
        counts {
          bidder_positions
        }
      }
    }
  `,
})
