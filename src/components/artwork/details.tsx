import * as React from "react"
import * as Relay from "react-relay"
import styled from "styled-components"
import colors from '../../assets/colors'
import TextLink from '../text_link'

export interface DetailsProps extends React.HTMLProps<ArtworkDetails> {
    artwork: any
}

export class ArtworkDetails extends React.Component<DetailsProps, null> {

  artistLine() {
    const cultural_maker = this.props.artwork.cultural_maker
    const artists = this.props.artwork.artists

    if (cultural_maker) {
      return (<div><strong>{cultural_maker}</strong></div>)
    } else if (artists && artists.length) {
      let artistsEl = []
      for (var i=0; i < artists.length; i++) {
        artistsEl.push(<TextLink href={artists[i].href}>{artists[i].name}</TextLink>)
        if (i !== artists.length - 1) {
          artistsEl.push(<span>,</span>)
        }
      } 
      return (<div><strong>{artistsEl}</strong></div>)
    }
  }

  titleLine() {
    return (
      <TextLink href={this.props.artwork.href}>
        <em>{this.props.artwork.title}</em>
        { this.props.artwork.date ? `, ${this.props.artwork.date}` : null }
      </TextLink>
    )
  }

  partnerLine() {
    if (this.props.artwork.collecting_institution) {
      return (<div>{this.props.artwork.collecting_institution}</div>)
    } else {
      return (
        <div>
          <TextLink href={this.props.artwork.partner.href}>
            {this.props.artwork.partner.name}
          </TextLink>
        </div>
      )
    }
  }

  saleLine() {
    const artwork = this.props.artwork
    const hasSaleMessage = artwork.sale_message && artwork.sale_message != 'Contact For Price'
    const notInAuction = !(artwork.sale && artwork.sale.is_auction)
    if (hasSaleMessage && notInAuction) {
      return (
        <div>{artwork.sale_message}</div>
      )
    }
  }

  render() {
    return (
      <div>
        {this.artistLine()}
        {this.titleLine()}
        {this.partnerLine()}
        {this.saleLine()}
      </div>
    )
  }
}

export default Relay.createContainer(ArtworkDetails , {
  fragments: {
    artwork: () => Relay.QL`
      fragment on Artwork {
        href
        title
        date
        sale_message
        cultural_maker
        artists(shallow: true) {
          href
          name
        }
        collecting_institution
        partner(shallow: true) {
          name
        }
        sale {
          is_auction
          is_live_open
          is_open
          is_closed
        }
      }
    `
  },
})

interface RelayProps {
  artwork: {
    href: string | null,
    title: string | null,
    date: string | null,
    sale_message: string | null,
    cultural_maker: string | null,
    artists: Array<{
      name: string | null,
    } | null> | null,
    collecting_institution: string | null,
    partner: {
      name: string | null,
    } | null,
    sale: {
      is_auction: boolean | null,
      is_live_open: boolean | null,
      is_open: boolean | null,
      is_closed: boolean | null,
    } | null,
  },
}
