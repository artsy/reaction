import * as React from "react"
import styled, { StyledFunction } from "styled-components"
// import { joinChildren } from "../../utils/index"
import TextLink from "../text_link"
import Fonts from "./fonts"
import ViewFullscreen from "./view_fullscreen"

const TruncatedLine = styled.div`
  color: #999;
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  .artist-name {
    margin-right: 30px;
  }
`

interface StyledArtworkCaptionProps {
  layout?: string
}

const div: StyledFunction<StyledArtworkCaptionProps & React.HTMLProps<HTMLDivElement>> = styled.div

const StyledArtworkCaption = div`
  display: ${props => (props.layout === "classic" ? "block" : "flex")};
  ${props => (props.layout === "classic" ? Fonts.garamond("s15") : Fonts.unica("s14", "medium"))}

`

interface ArtworkCaptionProps extends React.HTMLProps<HTMLDivElement> {
  layout?: string
  artwork?: any
  linked?: boolean
}

class ArtworkCaption extends React.Component<ArtworkCaptionProps, void> {
  renderArtists() {
    const artwork = this.props.artwork
    if (artwork.artists && artwork.artists.length > 0) {
      const names = artwork.artists.map((artist, i) => {
        return this.renderArtistName(artist, i)
      })
      return names
    } else if (artwork.artist) {
      return this.renderArtistName(artwork.artist, 0)
    } else {
      return false
    }
  }

  renderArtistName(artist, i) {
    const comma = i < this.props.artwork.artists.length - 1 ? this.renderComma() : false
    if (this.props.linked && artist.slug) {
      return (
        <span key={"artist-" + i} className="name">
          <TextLink href={"/artist/" + artist.slug} color="#666">{artist.name}</TextLink>
          {comma}
        </span>
      )
    } else {
      return <span className="name">{artist.name}{comma}</span>
    }
  }

  renderTitleDate() {
    const artwork = this.props.artwork
    if (artwork.title && artwork.date) {
      return (
        <span>
          {this.renderTitle()}
          {this.renderComma()}
          {this.renderDate()}
        </span>
      )
    } else {
      return this.renderTitle()
    }
  }

  renderTitle() {
    const artwork = this.props.artwork
    if (artwork.title) {
      if (this.props.linked) {
        return (
          <span className="title">
            <TextLink href={"/artwork/" + artwork.slug} color={"#666"}>
              {artwork.title}
            </TextLink>
          </span>
        )
      } else {
        return <span className="title"><em>{artwork.title}</em></span>
      }
    }
  }

  renderDate() {
    const artwork = this.props.artwork
    if (artwork.date) {
      return <span className="date">{artwork.date}</span>
    }
  }

  renderPartner() {
    const artwork = this.props.artwork
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

  renderComma() {
    return <span className="comma">, </span>
  }

  render() {
    const { layout } = this.props
    if (layout === "classic") {
      return (
        <StyledArtworkCaption layout={layout} className="display-artwork__caption">
          <TruncatedLine>
            <strong>
              {this.renderArtists()}
            </strong>
          </TruncatedLine>
          <TruncatedLine>
            {this.renderTitleDate()}
          </TruncatedLine>
          <TruncatedLine>
            {this.renderPartner()}
          </TruncatedLine>
        </StyledArtworkCaption>
      )
    } else {
      return (
        <StyledArtworkCaption layout={layout} className="display-artwork__caption">
          <TruncatedLine>
            <span className="artist-name">
              {this.renderArtists()}
            </span>
            {this.renderTitleDate()}
            {this.renderComma()}
            {this.renderPartner()}
          </TruncatedLine>
          <ViewFullscreen />
        </StyledArtworkCaption>
      )
    }
  }
}

export default ArtworkCaption
