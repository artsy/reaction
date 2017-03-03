import * as React from "react"
import * as Relay from "react-relay"
import TextLink from "../text_link"

export interface ContactProps extends React.HTMLProps<ArtworkContact> {
  artwork: any
}

export class ArtworkContact extends React.Component<ContactProps, null> {

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
      return <TextLink href={ artwork.href } underline={ true }>Enter Live Auction</TextLink>
    } else if (artwork.sale.is_open) {
      const sa = artwork.sale_artwork
      const bids = sa.counts.bidder_positions
      if (bids > 0) {
        const s = bids > 1 ? "s" : ""
        return <span>{ sa.highest_bid.display } ({ bids } bid{ s })</span>
      } else {
        return <span>{ sa.opening_bid.display }</span>
      }
    } else if (artwork.sale.is_closed) {
      return <span>Auction closed</span>
    } else {
      return <span/>
    }
  }

  contactPartnerLine() {
    return (
      <TextLink href={ this.props.artwork.href } underline={ true }>
        Contact { this.props.artwork.partner.type.toLowerCase() }
      </TextLink>
    )
  }

  render() {
    return <div>{ this.contactLine() }</div>
  }
}

export default Relay.createContainer(ArtworkContact, {
  fragments: {
    artwork: () => Relay.QL`
      fragment on Artwork {
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
  },
})
