import React, { Component } from "react"
import styled from "styled-components"
import TextLink from "../text_link"

const TruncatedLine = styled.div`
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 15px;
  color: #666;
`

class Artwork extends Component<any, null>  {

  renderImage(artwork) {
    const image = (
      <img
        src={artwork.image}
        className="display-artwork__image"
        width={"100%"} />
    )
    if (this.props.linked) {
      return (
        <TextLink href={"/artwork/" + artwork.slug} color="#666">{image}</TextLink>
      )
    } else {
      return image
    }
  }

  renderArtists(artwork) {
    if (artwork.artists != null ? artwork.artists[0] : undefined) {
      let names = artwork.artists.map((artist, i) => {
        return this.renderArtistName(artist, i)
      })
      return names
    } else {
      return (artwork.artist != null ? artwork.artist.name : undefined)
    }
  }

  renderArtistName(artist, i) {
    const spacer = i < this.props.artwork.artists.length - 1 ? this.renderSpacer() : ""
    if (this.props.linked && artist.slug) {
      return (
        <span key={"artist-" + i}>
          <TextLink href={"/artist/" + artist.slug} color="#666">{artist.name}</TextLink>
          {spacer}
        </span>
      )
    } else {
      return <span>artist.name{spacer}</span>
    }
  }

  renderTitleDate(artwork) {
    if (artwork.title && artwork.date) {
      return (
        <TruncatedLine>
          {this.renderTitle(artwork)}
          {this.renderSpacer()}
          {this.renderDate(artwork)}
        </TruncatedLine>
      )
    } else {
      return <TruncatedLine>{this.renderTitle(artwork)}</TruncatedLine>
    }
  }

  renderTitle(artwork) {
    if (artwork.title) {
      if (this.props.linked) {
        return (
          <span className="title">
            <TextLink href={"/artwork/" + artwork.slug} color={"#666"}>
              <em>{artwork.title}</em>
            </TextLink>
          </span>
        )
      } else {
        return <span className="title"><em>{artwork.title}</em></span>
      }
    }
  }

  renderDate(artwork) {
    if (artwork.date) {
      return <span className="date">{artwork.date}</span>
    }
  }
  renderSpacer() {
    return <span className="spacer">, </span>
  }

  renderPartner(artwork) {
    if (artwork.partner.name) {
      if (this.props.linked && artwork.partner.slug) {
        return (
            <TextLink href={"/" + artwork.partner.slug} color="#666">{artwork.partner.name}</TextLink>
        )
      } else {
        return artwork.partner.name
      }
    }
    return false
  }

  render() {
    const { artwork } = this.props
    return (
      <div className="display-artwork">
        {this.renderImage(artwork)}
        <div className="display-artwork__caption">
          <TruncatedLine><strong>{this.renderArtists(artwork)}</strong></TruncatedLine>
          {this.renderTitleDate(artwork)}
          <TruncatedLine>{this.renderPartner(artwork)}</TruncatedLine>
        </div>
      </div>
    )
  }
}
export default Artwork
