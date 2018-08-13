import { Details_artwork } from "__generated__/Details_artwork.graphql"
import React from "react"
// @ts-ignore
import { ComponentRef, createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import TextLink from "../TextLink"

const TruncatedLine = styled.div`
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

export interface Props extends React.HTMLProps<Details> {
  showSaleLine: boolean
  artwork: Details_artwork
}

export class Details extends React.Component<Props, null> {
  static defaultProps = {
    showSaleLine: true,
  }

  artistLine() {
    const { cultural_maker, artists } = this.props.artwork

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
            <TextLink href={artist.href} key={artist.__id + "-" + index}>
              {artist.name}
            </TextLink>,
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
    return (
      <TruncatedLine>
        <TextLink href={this.props.artwork.href}>
          <em>{this.props.artwork.title}</em>
          {this.props.artwork.date && `, ${this.props.artwork.date}`}
        </TextLink>
      </TruncatedLine>
    )
  }

  partnerLine() {
    if (this.props.artwork.collecting_institution) {
      return (
        <TruncatedLine>
          {this.props.artwork.collecting_institution}
        </TruncatedLine>
      )
    } else if (this.props.artwork.partner) {
      return (
        <TruncatedLine>
          <TextLink href={this.props.artwork.partner.href}>
            {this.props.artwork.partner.name}
          </TextLink>
        </TruncatedLine>
      )
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

  render() {
    return (
      <div>
        {this.artistLine()}
        {this.titleLine()}
        {this.partnerLine()}
        {this.props.showSaleLine && this.saleLine()}
      </div>
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
      }
    }
  `
)
