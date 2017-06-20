import React, { Component } from "react"

class Artwork extends Component<any, null>  {

  renderImage(artwork) {
    const image = (
      <img
        src={artwork.image}
        className="display-artwork__image"
        style={styles.image} />
    )
    if (this.props.linked) {
      return (
        <a href={"/artwork/" + artwork.slug} style={styles.a}>{image}</a>
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
    const spacer = i < this.props.artwork.artists.length ? this.renderSpacer() : ""
    if (this.props.linked && artist.slug) {
      return (
        <span key={"artist-" + i}>
          <a href={"/artist/" + artist.slug} style={styles.a}>{artist.name}</a>
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
        <p style={styles.p}>
          {this.renderTitle(artwork)}
          {this.renderSpacer()}
          {this.renderDate(artwork)}
        </p>
      )
    } else {
      return <p style={styles.p}>{this.renderTitle(artwork)}</p>
    }
  }

  renderTitle(artwork) {
    if (artwork.title) {
      if (this.props.linked) {
        return (
          <span className="title">
            <a href={"/artwork/" + artwork.slug} style={styles.a}>
              <em>{artwork.title}</em>
            </a>
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
          <p style={styles.p}>
            <a href={"/" + artwork.partner.slug} style={styles.a}>{artwork.partner.name}</a>
          </p>
        )
      } else {
        return <p style={styles.p}>{artwork.partner.name}</p>
      }
    }
    return false
  }

  render() {
    const { artwork } = this.props
    return (
      <div className="display-artwork">
        {this.renderImage(artwork)}
        <div className="display-artwork__caption" style={styles.caption}>
          <p style={styles.p}><strong>{this.renderArtists(artwork)}</strong></p>
          {this.renderTitleDate(artwork)}
          {this.renderPartner(artwork)}
        </div>
      </div>
    )
  }
}
export default Artwork

const styles = {
  caption: {
    color: "#666",
    fontSize: 15,
    lineHeight: 1.25,
    marginTop: 10,
    whiteSpace: "initial",
    fontFamily: `
      'Adobe Garamond W08',
      'adobe-garamond-pro',
      'AGaramondPro-Regular',
      'Times New Roman',
      'Times',
      'serif'
    `,
  },
  p: {
    margin: 0,
  },
  a: {
    textDecoration: "none",
    color: "#666",
  },
  image: {
    width: "100%",
    height: "auto",
  },
}
