import { color, Sans, Spacer } from "@artsy/palette"
import { Details_artwork } from "__generated__/Details_artwork.graphql"
import { ContextConsumer } from "Artsy"
import React from "react"
// @ts-ignore
import { ComponentRef, createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import styled from "styled-components"
import { get } from "Utils/get"
import TextLink from "../TextLink"

const TruncatedLine = styled.div`
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

export interface Props extends React.HTMLProps<Details> {
  showSaleLine: boolean
  includeLinks: boolean
  artwork: Details_artwork
}

export class Details extends React.Component<Props, null> {
  static defaultProps = {
    showSaleLine: true,
    includeLinks: true,
  }

  artistLine() {
    const { cultural_maker, artists } = this.props.artwork
    const { includeLinks } = this.props

    if (cultural_maker) {
      return (
        <TruncatedLine>
          <strong>{cultural_maker}</strong>
        </TruncatedLine>
      )
    } else if (artists && artists.length) {
      const artistLine = artists
        .reduce((acc, artist, index) => {
          return acc.concat([
            ", ",
            includeLinks
              ? this.link(artist.name, artist.href, artist.__id + "-" + index)
              : artist.name,
          ])
        }, [])
        .slice(1)
      return (
        <TruncatedLine>
          <strong>{artistLine}</strong>
        </TruncatedLine>
      )
    }
  }

  titleLine() {
    const { includeLinks } = this.props
    const artworkText = (
      <>
        <em>{this.props.artwork.title}</em>
        {this.props.artwork.date && `, ${this.props.artwork.date}`}
      </>
    )
    const artworkTextWithLink = includeLinks ? (
      <TextLink href={this.props.artwork.href}>{artworkText}</TextLink>
    ) : (
      artworkText
    )
    return <TruncatedLine>{artworkTextWithLink}</TruncatedLine>
  }

  line(text) {
    return <TruncatedLine>{text}</TruncatedLine>
  }

  link(text, href, key) {
    return (
      <TextLink href={href} key={key}>
        {text}
      </TextLink>
    )
  }

  partnerLine() {
    if (this.props.artwork.collecting_institution) {
      return this.line(this.props.artwork.collecting_institution)
    } else if (this.props.artwork.partner) {
      if (this.props.includeLinks) {
        return (
          <TruncatedLine>
            <TextLink href={this.props.artwork.partner.href}>
              {this.props.artwork.partner.name}
            </TextLink>
          </TruncatedLine>
        )
      } else {
        return this.line(this.props.artwork.partner.name)
      }
    }
  }

  saleLine() {
    const artwork = this.props.artwork
    const hasSaleMessage =
      artwork.sale_message && artwork.sale_message !== "Contact For Price"
    const notInAuction = !(artwork.sale && artwork.sale.is_auction)
    if (hasSaleMessage && notInAuction) {
      return <div>{artwork.sale_message}</div>
    }
  }

  saleInfoLine() {
    const { artwork } = this.props
    const { sale } = artwork
    const inClosedAuction = sale && sale.is_auction && sale.is_closed

    return (
      <>
        <Sans
          style={{ display: "inline" }}
          color={color("black100")}
          weight={"medium"}
          size={"2"}
        >
          {inClosedAuction ? "Bidding closed" : this.saleMessageOrBidInfo()}{" "}
        </Sans>
        <Sans style={{ display: "inline" }} size={"2"} color={color("black60")}>
          {!inClosedAuction && this.auctionInfo()}
        </Sans>
        <Spacer mb={0.3} />
      </>
    )
  }

  saleMessageOrBidInfo() {
    const { artwork } = this.props
    const { sale } = artwork
    const inRunningAuction = sale && sale.is_auction && !sale.is_closed

    if (inRunningAuction) {
      const highestBidDisplay = get(
        artwork,
        p => p.sale_artwork.highest_bid.display
      )
      const openingBidDisplay = get(
        artwork,
        p => p.sale_artwork.opening_bid.display
      )
      return highestBidDisplay || openingBidDisplay || ""
    }

    // TODO: Extract this sentence-cased version and apply everywhere.
    if (artwork.sale_message === "Contact For Price") {
      return "Contact for price"
    }

    return artwork.sale_message
  }

  auctionInfo() {
    const { artwork } = this.props
    const { sale } = artwork

    if (sale) {
      return `(${sale.display_timely_at})`
    }
  }

  render() {
    return (
      <ContextConsumer>
        {({ user }) => {
          const hasLabFeature =
            user &&
            user.lab_features &&
            user.lab_features.includes("New Buy Now Flow")
          const enableBuyNowFlow = sd.ENABLE_NEW_BUY_NOW_FLOW || hasLabFeature

          return (
            <>
              {enableBuyNowFlow && this.saleInfoLine()}
              {this.artistLine()}
              {this.titleLine()}
              {this.partnerLine()}
              {!enableBuyNowFlow && this.props.showSaleLine && this.saleLine()}
            </>
          )
        }}
      </ContextConsumer>
    )
  }
}

export default createFragmentContainer<Props>(
  Details,
  graphql`
    fragment Details_artwork on Artwork {
      href
      title
      date
      sale_message
      cultural_maker
      artists(shallow: true) {
        __id
        href
        name
      }
      collecting_institution
      partner(shallow: true) {
        name
        href
      }
      sale {
        is_auction
        is_live_open
        is_open
        is_closed
        display_timely_at
      }
      sale_artwork {
        highest_bid {
          display
        }
        opening_bid {
          display
        }
      }
    }
  `
)
