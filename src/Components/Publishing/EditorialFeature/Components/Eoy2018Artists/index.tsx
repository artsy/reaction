import { color, Serif } from "@artsy/palette"
import { unica } from "Assets/Fonts"
import { ArticleProps } from "Components/Publishing/Layouts/FeatureLayout"
import { Nav } from "Components/Publishing/Nav/Nav"
import { ImageSetPreview } from "Components/Publishing/Sections/ImageSetPreview"
import React from "react"
import styled from "styled-components"
import { Eoy2018ArticleHeader } from "./ArticleHeader"

export const BORDER_WIDTH = 4

export class Eoy2018Artists extends React.Component<ArticleProps> {
  sectionIsHeader = section => {
    const isText = section.type === "text"
    const isHeader = isText && section.body.includes("<h1>")
    return isHeader
  }

  sectionIsHeaderImage = (section, i) => {
    const {
      article: { sections },
    } = this.props
    const isImage = section.type === "image_collection"
    const sectionBefore = i !== 0 && sections[i - 1]
    const sectionBeforeIsHeader = this.sectionIsHeader(sectionBefore)

    return isImage && sectionBeforeIsHeader
  }

  sectionHeader = (section, i) => {
    const {
      article: { sections },
    } = this.props
    const sectionAfter = sections[i + 1]
    const sectionAfterisImage = this.sectionIsHeaderImage(sectionAfter, i + 1)
    const src = sectionAfterisImage && sectionAfter.images[0].url

    return (
      <ArtistHeaderSection key={i}>
        <ArtistHeaderTitle dangerouslySetInnerHTML={{ __html: section.body }} />
        <ArtistHeaderImg src={src} />
      </ArtistHeaderSection>
    )
  }

  sectionText = (section, i) => {
    return (
      <TextSection size="5" key={i}>
        <div dangerouslySetInnerHTML={{ __html: section.body }} />
      </TextSection>
    )
  }

  sectionImageSet = (section, i) => {
    return (
      <ImageSetWrapper key={i}>
        <ImageSetPreview section={section} />
      </ImageSetWrapper>
    )
  }

  getSections = () => {
    const {
      article: { sections },
    } = this.props

    const renderedSections = sections.map((section, i) => {
      const isHeader = this.sectionIsHeader(section)
      const isHeaderImage = this.sectionIsHeaderImage(section, i)

      if (isHeader) {
        return this.sectionHeader(section, i)
      } else if (isHeaderImage) {
        return null
      } else {
        if (section.type === "text") {
          return this.sectionText(section, i)
        } else if (section.type === "image_set") {
          return this.sectionImageSet(section, i)
        } else {
          return null
        }
      }
    })
    return renderedSections
  }

  render() {
    return (
      <React.Fragment>
        <Nav canFix />

        <ArticleWrapper>
          <Eoy2018ArticleHeader />

          <ArticleContent>{this.getSections()}</ArticleContent>
        </ArticleWrapper>
      </React.Fragment>
    )
  }
}

const ArticleWrapper = styled.div`
  padding: 0 40px;
`

const ArticleContent = styled.div`
  padding: 40px 0;
  border-left: ${BORDER_WIDTH}px solid ${color("purple100")};

  blockquote {
    ${unica("s34")};
  }
`

const ArtistHeaderSection = styled.div`
  height: 55vh;
  border: ${BORDER_WIDTH}px solid ${color("purple100")};
  border-left: none;
  display: flex;
  margin-bottom: 40px;
`

const ArtistHeaderTitle = styled.div`
  flex: 1;
  border-right: ${BORDER_WIDTH}px solid ${color("purple100")};

  h1 {
    ${unica("s65")};
    width: 100%;
    height: 50%;
    padding: 20px;
    border-bottom: ${BORDER_WIDTH}px solid ${color("purple100")};
  }

  h2 {
    ${unica("s25")};
    width: 50%;
    height: 50%;
    display: inline-flex;
    padding: 20px;
    &:last-child {
      border-left: ${BORDER_WIDTH}px solid ${color("purple100")};
    }
    &:hover {
      background: ${color("purple100")};
      color: white;
    }
  }
`

const ArtistHeaderImg = styled.div<{ src?: string }>`
  flex: 1;
  ${props =>
    props.src &&
    `
    background: url(${props.src});
    background-size: cover;
    background-position: center;
  `};
`

const TextSection = styled(Serif)`
  max-width: 75%;
  margin-left: auto;
  padding-bottom: 60px;

  p {
    font-size: 24;
  }
`
const ImageSetWrapper = styled.div`
  margin-bottom: 60px;
  border: ${BORDER_WIDTH}px solid ${color("purple100")};
  border-left: none;
`
