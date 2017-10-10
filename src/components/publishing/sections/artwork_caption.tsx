import * as _ from "lodash"
import * as React from "react"
import styled, { StyledFunction } from "styled-components"
import { pMedia } from "../../helpers"
import TextLink from "../../text_link"
import Fonts from "../fonts"
import { Layout, SectionLayout } from "../typings"

interface ArtworkCaptionProps extends React.HTMLProps<HTMLDivElement> {
  artwork: any
  layout?: Layout
  sectionLayout?: SectionLayout
  linked?: boolean
  isFullscreenCaption?: boolean
}
interface StyledArtworkCaptionProps {
  layout?: Layout
  sectionLayout?: SectionLayout
}

class ArtworkCaption extends React.Component<ArtworkCaptionProps, null> {
  joinChildren(children) {
    const joined = _.compact(children).reduce((prev, curr, i) => {
      return [prev, this.renderComma(i), curr]
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
          <span key={0} className="title">
            <TextLink href={"/artwork/" + artwork.slug} color="#999">
              {artwork.title}
            </TextLink>
          </span>
        )
      } else {
        return <span key={0} className="title">{artwork.title}</span>
      }
    }
  }

  renderDate() {
    const artwork = this.props.artwork
    if (artwork.date && artwork.date.length > 0) {
      return <span key={1} className="date">{artwork.date}</span>
    }
  }

  renderPartner() {
    const artwork = this.props.artwork
    if (artwork.partner.name) {
      if (this.props.linked && artwork.partner.slug) {
        return (
          <TextLink key={2} href={"/partner/" + artwork.partner.slug} color="#999">
            {artwork.partner.name}
          </TextLink>
        )
      } else {
        return artwork.partner.name
      }
    }
  }

  renderComma(i) {
    return <span key={"comma-" + i} className="comma">, </span>
  }

  renderTitleDatePartner() {
    const children = [this.renderTitle(), this.renderDate(), this.renderPartner()]
    return this.joinChildren(children)
  }

  render() {
    const { layout, isFullscreenCaption, sectionLayout } = this.props
    if (isFullscreenCaption) {
      return (
        <StyledFullscreenCaption layout={layout}>
          <Line className="artist-name">
            {this.renderArtists()}
          </Line>
          <Line>
            {this.renderTitleDatePartner()}
          </Line>
        </StyledFullscreenCaption>
      )
    } else if (layout === "classic") {
      return (
        <StyledClassicCaption layout={layout} className="display-artwork__caption">
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
        </StyledClassicCaption>
      )
    } else {
      return (
        <StyledArtworkCaption layout={layout} sectionLayout={sectionLayout} className="display-artwork__caption">
          <TruncatedLine>
            <span className="artist-name">
              {this.renderArtists()}
            </span>
            {this.renderTitleDatePartner()}
          </TruncatedLine>
        </StyledArtworkCaption>
      )
    }
  }
}

const div: StyledFunction<StyledArtworkCaptionProps & React.HTMLProps<HTMLDivElement>> = styled.div
const StyledArtworkCaption = div`
  padding: ${props => (props.sectionLayout === "fillwidth" ? "0 10px;" : "0;")}
  margin-top: 10px;
  display: flex;
  ${Fonts.unica("s14")}
  .title {
    ${Fonts.unica("s14", "italic")}
  }
  ${pMedia.xs`
    padding: 0 10px;
  `}
`
const StyledClassicCaption = div`
  margin-top: 10px;
  display: block;
  ${Fonts.garamond("s15")}
  .title {
    font-style: italic;
  }
`
const StyledFullscreenCaption = div`
  display: flex;
  flex-direction: row;
  ${Fonts.unica("s16", "medium")}
  .title {
    ${Fonts.unica("s16", "mediumItalic")}
  }
  ${pMedia.sm`
    ${Fonts.unica("s14", "medium")}
    flex-direction: column;
    .title {
      ${Fonts.unica("s14", "mediumItalic")}
    }
  `}
`
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
const Line = styled.div`
  &.artist-name {
    margin-right: 30px;
  }
  ${pMedia.sm`
    &.artist-name {
      margin-bottom: 5px;
    }
  `}
  ${TextLink} {
    color: black;
  }
`
export default ArtworkCaption
