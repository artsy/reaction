import * as _ from "lodash"
import * as React from "react"
import styled, { StyledFunction } from "styled-components"
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
  margin-top: 10px;
  display: ${props => (props.layout === "classic" ? "block" : "flex")};
  ${props => (props.layout === "classic" ? Fonts.garamond("s15") : Fonts.unica("s14", "medium"))}
`

interface ArtworkCaptionProps extends React.HTMLProps<HTMLDivElement> {
  artwork: any
  layout?: string
  linked?: boolean
}

class ArtworkCaption extends React.Component<ArtworkCaptionProps, null> {
  joinChildren(children) {
    const joined = _.compact(children).reduce((prev, curr) => {
      return [prev, this.renderComma(), curr]
    })
    return joined
  }

  renderArtists() {
    const artwork = this.props.artwork
    if (artwork.artists && artwork.artists.length > 0) {
      const names = artwork.artists.map((artist, i) => {
        return this.renderArtistName(artist, i)
      })
      return this.joinChildren(names)
    } else if (artwork.artist) {
      return this.renderArtistName(artwork.artist, 0)
    }
  }

  renderArtistName(artist, i) {
    if (this.props.linked && artist.slug) {
      return (
        <span key={"artist-" + i} className="name">
          <TextLink href={"/artist/" + artist.slug} color="#999">{artist.name}</TextLink>
        </span>
      )
    } else {
      return <span className="name">{artist.name}</span>
    }
  }

  renderTitleDate() {
    const children = [this.renderTitle(), this.renderDate()]
    return this.joinChildren(children)
  }

  renderTitle() {
    const artwork = this.props.artwork
    if (artwork.title) {
      if (this.props.linked) {
        return (
          <span className="title">
            <TextLink href={"/artwork/" + artwork.slug} color="#999">
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
    if (artwork.date && artwork.date.length > 0) {
      return <span className="date">{artwork.date}</span>
    }
  }

  renderPartner() {
    const artwork = this.props.artwork
    if (artwork.partner.name) {
      if (this.props.linked && artwork.partner.slug) {
        return (
          <TextLink href={"/partner/" + artwork.partner.slug} color="#999">
            {artwork.partner.name}
          </TextLink>
        )
      } else {
        return artwork.partner.name
      }
    }
  }

  renderComma() {
    return <span className="comma">, </span>
  }

  renderTitleDatePartner() {
    const children = [this.renderTitle(), this.renderDate(), this.renderPartner()]
    return this.joinChildren(children)
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
            {this.renderTitleDatePartner()}
          </TruncatedLine>
          <ViewFullscreen />
        </StyledArtworkCaption>
      )
    }
  }
}

export default ArtworkCaption
