import * as React from "react"
import styled, { StyledFunction } from "styled-components"
import TextLink from "../text_link"
import Fonts from "./fonts"
import ViewFullscreen from "./view_fullscreen"

const TruncatedLine = styled.div`
  color: #999;
  display: flex;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

interface StyledArtworkCaptionProps {
  layout?: string
}

const div: StyledFunction<StyledArtworkCaptionProps & React.HTMLProps<HTMLDivElement>> = styled.div

const StyledArtworkCaption = div`
  ${props => (props.layout === "classic" ? Fonts.garamond("s15") : Fonts.unica("s14", "medium"))}
  display: ${props => (props.layout === "classic" ? "block" : "flex")}
`

interface ArtworkCaptionProps extends React.HTMLProps<HTMLDivElement> {
  layout?: string
  artwork?: any
  linked?: boolean
}

class ArtworkCaption extends React.Component<ArtworkCaptionProps, void> {
  renderArtists(artwork) {
    if (artwork.artists != null ? artwork.artists[0] : undefined) {
      let names = artwork.artists.map((artist, i) => {
        return this.renderArtistName(artist, i)
      })
      return names
    } else {
      return artwork.artist != null ? artwork.artist.name : undefined
    }
  }

  renderArtistName(artist, i) {
    const spacer = i < this.props.artwork.artists.length - 1 ? this.renderSpacer() : false
    if (this.props.linked && artist.slug) {
      return (
        <span key={"artist-" + i}>
          <TextLink href={"/artist/" + artist.slug} color="#666">{artist.name}</TextLink>
          {spacer}
        </span>
      )
    } else {
      return <span>{artist.name}{spacer}</span>
    }
  }

  renderTitleDate(artwork) {
    if (artwork.title && artwork.date) {
      return (
        <div>
          {this.renderTitle(artwork)}
          {this.renderSpacer()}
          {this.renderDate(artwork)}
        </div>
      )
    } else {
      return this.renderTitle(artwork)
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

  renderPartner(artwork) {
    if (artwork.partner.name) {
      if (this.props.linked && artwork.partner.slug) {
        const color = this.props.layout === "classic" ? "#666" : "#999"
        return (
          <TextLink href={"/partner/" + artwork.partner.slug} color={color}>
            {artwork.partner.name}
          </TextLink>
        )
      } else {
        return artwork.partner.name
      }
    }
    return false
  }

  renderSpacer() {
    return <span className="spacer">, </span>
  }

  render() {
    const { artwork, layout } = this.props
    if (layout === "classic") {
      return (
        <StyledArtworkCaption layout={layout} className="display-artwork__caption">
          <TruncatedLine>
            <strong>
              {this.renderArtists(artwork)}
            </strong>
          </TruncatedLine>
          <TruncatedLine>
            {this.renderTitleDate(artwork)}
          </TruncatedLine>
          <TruncatedLine>
            {this.renderPartner(artwork)}
          </TruncatedLine>
        </StyledArtworkCaption>
      )
    } else {
      return (
        <StyledArtworkCaption layout={layout} className="display-artwork__caption">
          <TruncatedLine>
            <strong>
              {this.renderArtists(artwork)}
            </strong>
            <span className="spacer" />
            {this.renderTitleDate(artwork)}
            {this.renderPartner(artwork)}
          </TruncatedLine>
          <ViewFullscreen />
        </StyledArtworkCaption>
      )
    }
  }
}

export default ArtworkCaption
