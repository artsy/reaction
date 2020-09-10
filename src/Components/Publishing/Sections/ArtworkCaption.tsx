import { Box, BoxProps, Text, color } from "@artsy/palette"
import { ErrorBoundary } from "Artsy/Router/ErrorBoundary"
import { pMedia } from "Components/Helpers"
import { ArticleLayout, SectionLayout } from "Components/Publishing/Typings"
import { Truncator } from "Components/Truncator"
import _ from "lodash"
import React from "react"
import styled from "styled-components"
import { ArtworkSaleMessageContainer as ArtworkSaleMessage } from "./ArtworkSaleMessage"

interface ArtworkCaptionProps extends BoxProps {
  artwork: any
  color?: string
  layout?: ArticleLayout
  sectionLayout?: SectionLayout
  linked?: boolean
  isFullscreenCaption?: boolean
}

export class ArtworkCaption extends React.Component<ArtworkCaptionProps> {
  static defaultProps = {
    color: "black60",
  }

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
    } else if (artists && artists.length === 1) {
      const artistName = this.renderArtistName(
        artists[0],
        "renderArtists-single"
      )
      return artistName
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
          <a href={href}>{name}</a>
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
            <a href={href}>{title}</a>
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
          <a key="renderPartner" href={`/${slug}`}>
            {name}
          </a>
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
      <StyledFullscreenCaption variant="mediumText">
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
    const { artwork, color, layout, sectionLayout } = this.props

    return (
      <StyledArtworkCaption
        color={color}
        layout={layout}
        sectionLayout={sectionLayout}
      >
        <ArtistNames>{this.renderArtists()}</ArtistNames>
        <div>
          <Truncator>{this.renderTitleDate()}</Truncator>
          <Truncator>{this.renderPartnerCredit()}</Truncator>
        </div>
        <ArtworkSaleMessage artworkSlug={artwork.slug} />
      </StyledArtworkCaption>
    )
  }

  render() {
    const { layout, isFullscreenCaption, ...rest } = this.props

    return (
      <ErrorBoundary>
        <Box {...rest}>
          {isFullscreenCaption
            ? this.renderFullscreenCaption()
            : layout === "classic"
            ? this.renderClassicCaption()
            : this.renderEditorialCaption()}
        </Box>
      </ErrorBoundary>
    )
  }
}

const ArtistNames = styled.strong`
  margin-right: 30px;
  color: ${color("black100")};
`

const ArtistName = styled.span`
  white-space: nowrap;
`

export const StyledArtworkCaption = styled(Text).attrs({
  variant: "text",
})<{
  layout?: ArticleLayout
  sectionLayout?: SectionLayout
}>`
  padding: ${props => (props.sectionLayout === "fillwidth" ? "0 10px;" : "0;")};
  margin-top: 10px;

  a {
    color: inherit;
    text-decoration: none;
  }

  .title,
  .title a {
    font-style: italic;
  }

  ${pMedia.xs`
    padding: 0 10px;
  `};
`

const StyledClassicCaption = styled(Text).attrs({
  fontFamily: "serif",
  variant: "text",
  color: "black60",
})`
  margin-top: 10px;
  display: block;

  a {
    color: inherit;
    text-decoration: none;
  }

  ${ArtistNames} {
    margin-right: 0;
    color: inherit;

    &::after {
      content: ", ";
    }
  }

  .title {
    font-style: italic;
  }
`

const StyledFullscreenCaption = styled(Text).attrs({
  variant: "text",
})`
  a {
    text-decoration: none;
  }

  .title,
  .title a {
    font-style: italic;
  }

  ${pMedia.sm`
    flex-direction: column;
  `};
`

const Line = styled.div`
  ${pMedia.sm`
    &.artist-name {
      margin-bottom: 5px;
    }
  `};
`
