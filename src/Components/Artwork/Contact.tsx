import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import TextLink from "../TextLink"

export interface ContactProps extends RelayProps, React.HTMLProps<Contact> {}

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
    if (artwork.sale.is_live_open) {
      return (
        <TextLink href={artwork.href} underline>
          Enter Live Auction
        </TextLink>
      )
    } else if (artwork.sale.is_open) {
      const sa = artwork.sale_artwork
      const bids = sa.counts.bidder_positions
      if (bids > 0) {
        const s = bids > 1 ? "s" : ""
        return (
          <span>
            {sa.highest_bid.display} ({bids} bid{s})
          </span>
        )
      } else {
        return <span>{sa.opening_bid.display}</span>
      }
    } else if (artwork.sale.is_closed) {
      return <span>Auction closed</span>
    } else {
      return <span />
    }
  }

  contactPartnerLine() {
    const partner =
      this.props.artwork.partner &&
      this.props.artwork.partner.type.toLocaleLowerCase()

    return (
      <TextLink href={this.props.artwork.href} underline>
        Contact {partner}
      </TextLink>
    )
  }

  render() {
    return <div>{this.contactLine()}</div>
  }
}

export default createFragmentContainer(
  Contact,
  graphql`
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
  `
)

interface RelayProps {
  artwork: {
    _id: string
    href: string | null
    is_inquireable: boolean | null
    sale: {
      is_auction: boolean | null
      is_live_open: boolean | null
      is_open: boolean | null
      is_closed: boolean | null
    } | null
    partner: {
      type: string | null
    } | null
    sale_artwork: {
      highest_bid: {
        display: string | null
      } | null
      opening_bid: {
        display: string | null
      } | null
      counts: {
        bidder_positions: boolean | number | string | null
      } | null
    } | null
  }
}
