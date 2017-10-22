import * as _ from "lodash"
import * as React from "react"
import ReactDOM from 'react-dom/server'
import HTMLEllipsis from 'react-lines-ellipsis/lib/html'
import styled, { StyledFunction } from "styled-components"
import { pMedia } from "../../Helpers"
import TextLink from "../../TextLink"
import { Fonts } from "../Fonts"
import { Layout, SectionLayout } from "../Typings"

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

export class ArtworkCaption extends React.Component<ArtworkCaptionProps, null> {
  joinParts(children) {
    const joined = _.compact(children)
      .reduce((prev, curr) => {
        return [
          prev,
          curr
        ]
      })

    return joined
  }

  renderArtists() {
    const {
      artwork: { artist, artists }
    } = this.props

    // Multiple artists
    if (artists && artists.length > 0) {
      const names = artists.map((a, i) => {
        const artistName = this.renderArtistName(a, i)
        return artistName
      })

      const joinedNames = this.joinParts(names)
      return joinedNames

      // Single artist
    } else if (artist) {
      const artistName = this.renderArtistName(artist, 0)
      return artistName
    }
  }

  renderArtistName(artist, i) {
    const { linked } = this.props
    const { name, slug } = artist
    const createTextLink = linked && slug

    if (createTextLink) {
      const href = `/artwork/${slug}`

      return (
        <span key={`artist-${i}`} className="name">
          <TextLink href={href} color="#999">
            {name}
          </TextLink>
        </span>
      )
    } else {
      return (
        <span className="name">
          {name}
        </span>
      )
    }
  }

  renderTitleDate() {
    const children = [
      this.renderTitle(),
      this.renderDate()
    ]

    const titleDate = this.joinParts(children)
    return titleDate
  }

  renderTitle() {
    const {
      artwork: { slug, title },
      linked
    } = this.props

    if (title) {
      if (linked) {
        const href = `/artwork/${slug}`

        return (
          <span key={0} className="title">
            <TextLink href={href} color="#999">
              {title}
            </TextLink>
          </span>
        )
      } else {
        return (
          <span key={0} className="title">
            {title}
          </span>
        )
      }
    }
  }

  renderDate() {
    const {
      artwork: {
        date
      }
    } = this.props

    if (date && date.length) {
      return (
        <span key={1} className="date">
          {date}
        </span>
      )
    }
  }

  renderPartner() {
    const {
      artwork: {
        partner: { name, slug }
      },
      linked
    } = this.props

    if (name) {
      const createTextLink = Boolean(linked && slug)

      if (createTextLink) {
        const href = `/partner/${slug}`

        return (
          <TextLink key={2} href={href} color="#999">
            {name}
          </TextLink>
        )
      } else {
        return name
      }
    }
  }

  renderTitleDatePartner() {
    const children = [
      this.renderTitle(),
      this.renderDate(),
      this.renderPartner()
    ]

    const joined = this.joinParts(children)
    return joined
  }

  render() {
    const { layout, isFullscreenCaption, sectionLayout } = this.props

    // Fullscreen
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

      // Classic Layout
    } else if (layout === "classic") {
      return (
        <StyledClassicCaption layout={layout} className="display-artwork__caption">
          <Truncator>
            <strong>
              {this.renderArtists()}
            </strong>

            {this.renderTitleDate()}
            {this.renderPartner()}
          </Truncator>
        </StyledClassicCaption>
      )

      // Other
    } else {
      return (
        <StyledArtworkCaption layout={layout} sectionLayout={sectionLayout} className="display-artwork__caption">
          <Truncator>
            <span className="artist-name">
              {this.renderArtists()}
            </span>

            {this.renderTitleDatePartner()}
          </Truncator>
        </StyledArtworkCaption>
      )
    }
  }
}

const Truncator: React.SFC<any> = ({ children }) => {
  const html = ReactDOM.renderToStaticMarkup(<span>{children}</span>)

  return (
    <TruncatedLine>
      <HTMLEllipsis
        unsafeHTML={html}
        trimRight={false}
        maxLine='2'
        ellipsis='...'
      />
    </TruncatedLine>
  )
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

  // TODO:
  // Remove commented lines after validation. Covered by <ReactElipses />

  // display: block;
  // text-overflow: ellipsis;
  // overflow: hidden;
  // white-space: nowrap;
  // width: 100%;

  .name:after {
    content: ', ';
  }

  .title:after {
    content: ', ';
  }

  .date:after {
    content: ', ';
  }
`

const Line = styled.div`
  &.artist-name {
    margin-right: 20px;
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
