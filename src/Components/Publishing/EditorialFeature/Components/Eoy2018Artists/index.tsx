import { Box, color, Flex, Sans, Serif, space } from "@artsy/palette"
import { compact, find, map } from "lodash"
import React from "react"
import styled from "styled-components"

import { unica } from "Assets/Fonts"
import { media } from "Components/Helpers"
import { Byline, BylineContainer } from "Components/Publishing/Byline/Byline"
import { ArticleProps } from "Components/Publishing/Layouts/FeatureLayout"
import { Nav, NavContainer } from "Components/Publishing/Nav/Nav"
import { ArticleCards } from "Components/Publishing/RelatedArticles/ArticleCards/ArticleCards"
import {
  FullLabel,
  ImageSetContainer,
  ImageSetPreview,
  ImgContainer,
} from "Components/Publishing/Sections/ImageSetPreview"
import { LabelWrapper } from "Components/Publishing/Sections/ImageSetPreview/ImageSetLabel"
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
      <ArtistHeaderSection
        key={i}
        mb={40}
        flexDirection={["column", "column", "column", "row"]}
      >
        <ArtistHeaderTitle dangerouslySetInnerHTML={{ __html: section.body }} />
        <ArtistHeaderImg src={src && resize(src, { width: 700 })} />
      </ArtistHeaderSection>
    )
  }

  sectionText = (section, i) => {
    return (
      <Box maxWidth={["100%", "75%", "75%"]} ml="auto" px={[20, 0]}>
        <TextSection size="5" key={i} pb={[40, 60]}>
          <div dangerouslySetInnerHTML={{ __html: section.body }} />
        </TextSection>
      </Box>
    )
  }

  sectionImageSet = (section, i) => {
    return (
      <ImageSetWrapper key={i} mb={60}>
        <ImageSetPreview section={section}>
          <CaptionWrapper size={["3", "4"]}>
            <ImageSetCaption
              dangerouslySetInnerHTML={{ __html: section.images[0].caption }}
            />
          </CaptionWrapper>
        </ImageSetPreview>
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
      <AricleWrapper>
        <Nav canFix color={color("black100")} backgroundColor="white">
          <NavBorder />
        </Nav>

        <Box px={[10, 10, 55]}>
          <Eoy2018ArticleHeader images={headerImages} />

          <ArticleContent py={40}>
            <IntroSection
              alignItems="flex-start"
              flexDirection={["column", "row"]}
              pl={[0, 20]}
            >
              <Byline article={article} />
              {introText}
            </IntroSection>
            {this.getSections()}
          </ArticleContent>
        </Box>

        {article.relatedArticles && (
          <Box px={[10, 10, 55]} my={40} mx="auto">
            <ArticleCards relatedArticles={article.relatedArticles} />
          </Box>
        )}
      </AricleWrapper>
    )
  }
}

const BORDER_WIDTH = 6

const AricleWrapper = styled.div`
  ${NavContainer} {
    border-bottom: none;
  }
`

const NavBorder = styled.div`
  border-bottom: ${BORDER_WIDTH}px solid ${color("purple100")};
  position: absolute;
  top: 100%;
  left: 55px;
  right: 55px;

  ${media.sm`
    left: 10px;
    right: 10px;
  `};
`

const ArticleContent = styled(Box)`
  border-left: ${BORDER_WIDTH}px solid ${color("purple100")};
  border-bottom: ${BORDER_WIDTH}px solid ${color("purple100")};

  blockquote {
    ${unica("s34")};
    line-height: 1.3em;

    ${media.sm`
      ${unica("s25")};
      line-height: 1.3em;
    `};
  }
`

const ArtistHeaderSection = styled(Flex)`
  height: 60vh;
  min-height: 450px;
  border: ${BORDER_WIDTH}px solid ${color("purple100")};
  border-left-width: 0;

  ${media.md`
    height: fit-content;
  `};
`

const ArtistHeaderTitle = styled.div`
  flex: 1;
  border-right: ${BORDER_WIDTH}px solid ${color("purple100")};
  overflow: hidden;
  min-height: min-content;

  h1 {
    ${unica("s65")};
    width: 100%;
    height: 50%;
    min-height: fit-content;
    padding: ${space(2)}px;
    border-bottom: ${BORDER_WIDTH}px solid ${color("purple100")};

    ${media.md`
      width: 60%;
      float: right;
      height: 100%;
      border-bottom: none;
      border-left: ${BORDER_WIDTH}px solid ${color("purple100")};
    `};

    ${media.xs`
      border-bottom: ${BORDER_WIDTH}px solid ${color("purple100")};
      border-left: none;
      width: 100%;
      height: 50%;
      float: none;
    `};
  }

  h2 {
    ${unica("s25")};
    width: 50%;
    height: 50%;
    min-height: fit-content;
    display: inline-flex;
    padding: ${space(2)}px;
    &:last-child {
      border-left: ${BORDER_WIDTH}px solid ${color("purple100")};
    }

    ${media.md`
      width: 40%;
      float: left;
      &:last-child {
        border-left: none;
        border-top: ${BORDER_WIDTH}px solid ${color("purple100")};
      }
    `};

    ${media.xs`
      width: 50%;
      float: none;
      &:last-child {
        border-left: ${BORDER_WIDTH}px solid ${color("purple100")};
        border-top: none;
      }
    `};
  }

  ${media.md`
    height: 65vh;
    border-right: none;
    border-bottom: ${BORDER_WIDTH}px solid ${color("purple100")};
  `};
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

  ${media.md`
    min-height: 70vw;
  `};
`

const IntroSection = styled(Flex)`
  ${BylineContainer} {
    flex-direction: column;
    align-items: flex-start;
    ${media.md`
      padding: 0 20px 20px;
    `};
  }
`

const TextSection = styled(Serif)`
  p {
    font-size: 24px;
    text-indent: 2em;

    &:first-child {
      text-indent: 0;
    }
  }
`
const CaptionWrapper = styled(Sans)`
  flex: 1;

  ${media.sm`
    min-width: 50%;
  `};
`

const ImageSetCaption = styled.div`
  height: 100%;
  padding: ${space(2)}px;
  background: white;
  color: black;
  border-bottom: ${BORDER_WIDTH}px solid ${color("purple100")};

  ${media.sm`
    border-bottom: none;
    border-right: ${BORDER_WIDTH}px solid ${color("purple100")};
  `};
`

const ImageSetWrapper = styled(Box)`
  border: ${BORDER_WIDTH}px solid ${color("purple100")};
  border-left: none;

  ${ImageSetContainer} {
    display: flex;
    flex-direction: row-reverse;

    ${media.sm`
      flex-direction: column-reverse;
    `};
  }

  ${FullLabel} {
    position: relative;
    display: flex;
    flex-direction: column-reverse;
    flex: 1;
    left: auto;
    bottom: auto;
    max-width: inherit;
    border-radius: 0;
    box-shadow: none;
    &:hover {
      background-color: ${color("purple100")};
    }
    ${media.sm`
      flex-direction: row-reverse;

      ${LabelWrapper} {
        max-width: 50%;
      }
    `};
  }

  ${ImgContainer} {
    flex: 3;
    border-right: ${BORDER_WIDTH}px solid ${color("purple100")};
    img {
      object-fit: cover;
      object-position: center;
      height: 100%;
    }

    ${media.sm`
      border-right: none;
      border-bottom: ${BORDER_WIDTH}px solid ${color("purple100")};
    `};
  }
`
