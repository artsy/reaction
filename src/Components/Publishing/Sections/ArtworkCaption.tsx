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
  joinParts(children, key, delimiter = ", ") {
    const compacted = _.compact(children)

    if (compacted.length) {
      const reduced = compacted.reduce((prev, curr, i) => {
        return [
          prev,
          <span key={`joinParts-${key}-${i}`}>{delimiter}</span>,
          curr,
        ]
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

    return names.slice(1).reduce(
      (prev, curr, i) => {
        return prev.concat([
          <span key={`joinArtistNames-${i}`}>{delimiter}</span>,
          curr,
        ])
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
        const artistName = this.renderArtistName(a, `renderArtists-${i}`)
        return artistName
      })

      const joinedNames = this.joinArtistNames(names)
      return joinedNames

      // Single artist
    } else if (artist) {
      const artistName = this.renderArtistName(artist, "renderArtists-single")
      return artistName
    }
  }

  renderArtistName(artist, key: string) {
    const { linked } = this.props
    const { name, slug } = artist
    const createTextLink = linked && slug

    if (createTextLink) {
      const href = `/artist/${slug}`

      return (
        <ArtistName key={`renderArtistName-${key}`}>
          <TextLink href={href} color="#999">
            {name}
          </TextLink>
        </ArtistName>
      )
    } else {
      return (
        <span key={`renderArtistName-${key}`} className="name">
          {name}
        </span>
      )
    }
  }

  renderTitleDate() {
    const children = [this.renderTitle(), this.renderDate()]
    const titleDate = this.joinParts(children, "renderTitleDate")
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
          <span key="renderTitle" className="title">
            <TextLink href={href} color="#999">
              {title}
            </TextLink>
          </span>
        )
      } else {
        return (
          <span key="renderTitle" className="title">
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
        <span key="renderDate" className="date">
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
          <TextLink key="renderPartner" href={`/${slug}`} color="#999">
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
        <span key="renderCredit" className="credit">
          {credit}
        </span>
      )
    }
  }

  renderPartnerCredit = () => {
    const children = [this.renderPartner(), this.renderCredit()]

    const joined = this.joinParts(children, "renderPartnerCredit", ". ")
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

  a {
    color: ${Colors.grayDark};
    ${unica("s14")};
  }

  .title,
  .title a {
    ${unica("s14", "italic")};
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

    &::after {
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

  a {
    color: black;
    ${unica("s16", "medium")};
  }

  .title {
    ${unica("s16", "mediumItalic")};
  }

  .title,
  .title a {
    ${unica("s16", "mediumItalic")};
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
