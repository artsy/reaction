import { garamond, unica } from "Assets/Fonts"
import { Truncator } from "Components/Truncator"
import _ from "lodash"
import React from "react"
import styled from "styled-components"
import Colors from "../../../Assets/Colors"
import { ErrorBoundary } from "../../ErrorBoundary"
import { pMedia } from "../../Helpers"
import TextLink from "../../TextLink"
import { ArticleLayout, SectionLayout } from "../Typings"

interface ArtworkCaptionProps extends React.HTMLProps<HTMLDivElement> {
  artwork: any
  layout?: ArticleLayout
  sectionLayout?: SectionLayout
  linked?: boolean
  isFullscreenCaption?: boolean
}

interface StyledArtworkCaptionProps extends React.HTMLProps<HTMLDivElement> {
  layout?: ArticleLayout
  sectionLayout?: SectionLayout
}

export class ArtworkCaption extends React.Component<ArtworkCaptionProps, null> {
  joinParts(children, delimiter = ", ") {
    const compacted = _.compact(children)
    const delimSpan = <span>{delimiter}</span>

    if (compacted.length) {
      const reduced = compacted.reduce((prev, curr) => {
        return [prev, delimSpan, curr]
      })
      return reduced
    } else {
      return []
    }
  }

  joinArtistNames(names, delimiter = ", ") {
    if (names.length === 0) {
      return []
    }
    const delimSpan = <span>{delimiter}</span>

    return names.slice(1).reduce(
      (prev, curr, i) => {
        return prev.concat([delimSpan, curr])
      },
      [names[0]]
    )
  }

  renderArtists() {
    const {
      artwork: { artist, artists },
    } = this.props

    // Multiple artists
    if (artists && artists.length > 1) {
      const names = artists.map((a, i) => {
        const artistName = this.renderArtistName(a, i)
        return artistName
      })

      const joinedNames = this.joinArtistNames(names)
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
      const href = `/artist/${slug}`

      return (
        <ArtistName key={`artist-${i}`}>
          <TextLink href={href} color="#999">
            {name}
          </TextLink>
        </ArtistName>
      )
    } else {
      return <span className="name">{name}</span>
    }
  }

  renderTitleDate() {
    const children = [this.renderTitle(), this.renderDate()]
    const titleDate = this.joinParts(children)
    return titleDate
  }

  renderTitle() {
    const {
      artwork: { slug, title },
      linked,
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
      artwork: { date },
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
        partner: { name, slug },
      },
      linked,
    } = this.props

    if (name) {
      const createTextLink = Boolean(linked && slug)

      if (createTextLink) {
        return (
          <TextLink key={2} href={`/${slug}`} color="#999">
            {name}
          </TextLink>
        )
      } else {
        return name
      }
    }
  }

  renderCredit() {
    const {
      artwork: { credit },
    } = this.props

    if (credit && credit.length) {
      return (
        <span key={3} className="credit">
          {credit}
        </span>
      )
    }
  }

  renderPartnerCredit = () => {
    const children = [this.renderPartner(), this.renderCredit()]

    const joined = this.joinParts(children, ". ")
    return joined
  }

  renderFullscreenCaption = () => {
    return (
      <StyledFullscreenCaption>
        <Line>
          <ArtistNames>{this.renderArtists()}</ArtistNames>
        </Line>
        <div>
          <Line>{this.renderTitleDate()}</Line>
          <Line>{this.renderPartnerCredit()}</Line>
        </div>
      </StyledFullscreenCaption>
    )
  }

  renderClassicCaption = () => {
    return (
      <StyledClassicCaption className="display-artwork__caption">
        <Truncator>
          <ArtistNames>{this.renderArtists()}</ArtistNames>
          {this.renderTitleDate()}
          {". "}
          {this.renderPartner()}
        </Truncator>
      </StyledClassicCaption>
    )
  }

  renderEditorialCaption = () => {
    const { layout, sectionLayout } = this.props

    return (
      <StyledArtworkCaption
        layout={layout}
        sectionLayout={sectionLayout}
        className="display-artwork__caption"
      >
        <ArtistNames>{this.renderArtists()}</ArtistNames>
        <div>
          <Truncator>{this.renderTitleDate()}</Truncator>
          <Truncator>{this.renderPartnerCredit()}</Truncator>
        </div>
      </StyledArtworkCaption>
    )
  }

  render() {
    const { layout, isFullscreenCaption } = this.props

    return (
      <ErrorBoundary>
        <div>
          {isFullscreenCaption
            ? this.renderFullscreenCaption()
            : layout === "classic"
              ? this.renderClassicCaption()
              : this.renderEditorialCaption()}
        </div>
      </ErrorBoundary>
    )
  }
}

const ArtistNames = styled.span`
  margin-right: 30px;
`

const ArtistName = styled.span`
  white-space: nowrap;
`

const StyledArtworkCaption = styled.div`
  padding: ${(props: StyledArtworkCaptionProps) =>
    props.sectionLayout === "fillwidth" ? "0 10px;" : "0;"};
  margin-top: 10px;
  display: flex;
  color: ${Colors.grayDark};
  ${unica("s14")};
  .title,
  .title a {
    ${unica("s14", "italic")};
  }
  a {
    color: ${Colors.grayDark};
    ${unica("s14")};
  }
  ${pMedia.xs`
    padding: 0 10px;
  `};
`

const StyledClassicCaption = styled.div`
  margin-top: 10px;
  display: block;
  color: ${Colors.grayDark};
  ${garamond("s15")};

  ${ArtistNames} {
    margin-right: 0;
    font-weight: bold;
    &:after {
      content: ", ";
    }
  }

  .title {
    font-style: italic;
  }
`

const StyledFullscreenCaption = styled.div`
  ${unica("s16", "medium")};
  display: flex;
  color: black;

  .title {
    ${unica("s16", "mediumItalic")};
  }

  .title,
  .title a {
    ${unica("s16", "mediumItalic")};
  }
  a {
    color: black;
    ${unica("s16", "medium")};
  }

  ${pMedia.sm`
    ${unica("s14", "medium")}
    flex-direction: column;

    .title, .title a {
      ${unica("s14", "mediumItalic")}
    }
  `};
`

const Line = styled.div`
  ${pMedia.sm`
    &.artist-name {
      margin-bottom: 5px;
    }
  `};
`
