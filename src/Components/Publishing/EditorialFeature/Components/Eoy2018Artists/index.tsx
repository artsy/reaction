import { color, Flex, Serif, space } from "@artsy/palette"
import { compact, find, map } from "lodash"
import React from "react"
import styled from "styled-components"

import { unica } from "Assets/Fonts"
import { Byline, BylineContainer } from "Components/Publishing/Byline/Byline"
import { ArticleProps } from "Components/Publishing/Layouts/FeatureLayout"
import { Nav } from "Components/Publishing/Nav/Nav"
import { ImageSetPreview } from "Components/Publishing/Sections/ImageSetPreview"
import { resize } from "Utils/resizer"
import { Eoy2018ArticleHeader } from "./ArticleHeader"

export class Eoy2018Artists extends React.Component<ArticleProps> {
  getHeaderSections = () => {
    const { sections } = this.props.article
    const headers = []

    sections.map((section, index) => {
      let headerSection
      const sectionAfter = sections[index + 1]
      const sectionAfterisImage =
        sectionAfter && sectionAfter.type === "image_collection"

      if (this.sectionIsHeader(section)) {
        headerSection = {
          index,
          section,
        }
        if (sectionAfterisImage) {
          headerSection.imageSection = sectionAfter
        }
        headers.push(headerSection)
      }
    })
    return headers
  }

  sectionIsHeader = section => {
    const isText = section.type === "text"
    const isHeader = isText && section.body.includes("<h1>")
    return isHeader
  }

  sectionArtistHeader = (section, i) => {
    const headerSections = this.getHeaderSections()
    const { imageSection } = find(headerSections, ["section", section])
    const src = imageSection && imageSection.images[0].url

    return (
      <ArtistHeaderSection key={i}>
        <ArtistHeaderTitle dangerouslySetInnerHTML={{ __html: section.body }} />
        <ArtistHeaderImg src={src && resize(src, { width: 700 })} />
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
    const headerSections = this.getHeaderSections()
    const headerTextIndexes = map(headerSections, "index")
    const headerImages = map(headerSections, "image")

    const renderedSections = sections.map((section, i) => {
      const isHeader = headerTextIndexes.includes(i)
      const isHeaderImage = headerImages.includes(section)

      if (isHeader) {
        return this.sectionArtistHeader(section, i)
      } else if (isHeaderImage) {
        return null
      } else {
        if (section.type === "text" && i !== 0) {
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
    const { article } = this.props
    const introText = this.sectionText(article.sections[0], 0)
    const headerImages = map(
      compact(map(this.getHeaderSections(), "imageSection")),
      "images"
    )

    return (
      <React.Fragment>
        <Nav canFix color={color("black100")} backgroundColor="white" />
        <ArticleWrapper>
          <Eoy2018ArticleHeader images={headerImages} />
          <ArticleContent>
            <IntroSection alignItems="flex-start" pl={20}>
              <Byline article={article} />
              {introText}
            </IntroSection>
            {this.getSections()}
          </ArticleContent>
        </ArticleWrapper>
      </React.Fragment>
    )
  }
}

const BORDER_WIDTH = 6

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
  height: 60vh;
  min-height: 450px;
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
    min-height: fit-content;
    padding: ${space(2)}px;
    border-bottom: ${BORDER_WIDTH}px solid ${color("purple100")};
    &:hover {
      background: ${color("purple100")};
      color: white;
    }
  }

  h2 {
    ${unica("s25")};
    width: 50%;
    height: 50%;
    min-height: fit-content;
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
  background: ${color("purple100")};
  ${props =>
    props.src &&
    `
    background: url(${props.src});
    background-size: cover;
    background-position: center;
  `};
`

const IntroSection = styled(Flex)`
  ${BylineContainer} {
    flex-direction: column;
    align-items: flex-start;
  }
`

const TextSection = styled(Serif)`
  max-width: 75%;
  margin-left: auto;
  padding-bottom: 60px;

  p {
    font-size: 24px;
    text-indent: 2em;

    &:first-child {
      text-indent: 0;
    }
  }
`
const ImageSetWrapper = styled.div`
  margin-bottom: 60px;
  border: ${BORDER_WIDTH}px solid ${color("purple100")};
  border-left: none;
`
