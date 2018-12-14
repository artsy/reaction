import { Box, color, Flex, Sans, Serif } from "@artsy/palette"
import { unica } from "Assets/Fonts"
import { media, pMedia } from "Components/Helpers"
import { Author, StyledAuthor } from "Components/Publishing/Byline/Author"
import { Date, DateContainer } from "Components/Publishing/Byline/Date"
import { Share } from "Components/Publishing/Byline/Share"
import { getArticleFullHref } from "Components/Publishing/Constants"
import { ArticleProps } from "Components/Publishing/Layouts/FeatureLayout"
import { Nav, NavContainer } from "Components/Publishing/Nav/Nav"
import { ArticleCards } from "Components/Publishing/RelatedArticles/ArticleCards/ArticleCards"
import { CaptionContainer } from "Components/Publishing/Sections/Caption"
import {
  ImageCollection,
  ImageCollectionItem,
} from "Components/Publishing/Sections/ImageCollection"
import {
  ImageSetContainer,
  ImageSetPreview,
} from "Components/Publishing/Sections/ImageSetPreview"
import { SocialEmbed } from "Components/Publishing/Sections/SocialEmbed"
import React from "react"
import styled from "styled-components"

export class Eoy2018Culture extends React.Component<ArticleProps> {
  sectionText = (section, i) => {
    return (
      <TextContainer key={i} px={[10, 10, 55]} py={30} mx="auto">
        <Box width={["100%", "100%", "70%"]} mx="auto" maxWidth={1000}>
          <Serif size="5">
            <div dangerouslySetInnerHTML={{ __html: section.body }} />
          </Serif>
        </Box>
      </TextContainer>
    )
  }

  sectionHeaderText = (section, i) => {
    return (
      <SectionHeader key={i} pt={10} pb={[10, 10, 20]} px={[10, 10, 55]}>
        <div dangerouslySetInnerHTML={{ __html: section.body }} />
      </SectionHeader>
    )
  }

  sectionSocialEmbed = (section, i) => {
    return (
      <SectionWrapper key={i} px={[10, 10, 55]} py={40}>
        <SocialEmbed section={section} />
      </SectionWrapper>
    )
  }

  sectionImageCollection = (section, i) => {
    return (
      <ImageWrapper key={i}>
        <ImageCollection
          sectionLayout={section.layout}
          articleLayout="feature"
          images={section.images}
          targetHeight={500}
          gutter={10}
        />
      </ImageWrapper>
    )
  }

  sectionImageSet = (section, i) => {
    return (
      <ImageSetWrapper key={i} px={[0, 0, 55]}>
        <ImageSetPreview section={section} />
      </ImageSetWrapper>
    )
  }

  sectionIsHeader = section => {
    const isText = section.type === "text"
    const isHeader = isText && section.body.includes("<h1>")
    return isHeader
  }

  makeSectionArrays = sections => {
    const chapters = []
    let currentChapter = null

    sections.map((section, i) => {
      if (this.sectionIsHeader(section)) {
        if (currentChapter === null) {
          currentChapter = 0
        } else {
          currentChapter += 1
        }
      }

      if (i !== 0) {
        if (chapters.length && chapters[currentChapter]) {
          chapters[currentChapter].push(section)
        } else {
          chapters[currentChapter] = [section]
        }
      }
    })
    return chapters
  }

  getSections = sections => {
    return sections.map((section, i) => {
      if (this.sectionIsHeader(section)) {
        return this.sectionHeaderText(section, i)
      } else {
        switch (section.type) {
          case "text": {
            return this.sectionText(section, i)
          }
          case "image_collection": {
            return this.sectionImageCollection(section, i)
          }
          case "image_set": {
            return this.sectionImageSet(section, i)
          }
          case "social_embed": {
            return this.sectionSocialEmbed(section, i)
          }
          default: {
            return null
          }
        }
      }
    })
  }

  render() {
    const { article } = this.props
    const chapters = this.makeSectionArrays(article.sections)
    const introText =
      article.sections && article.sections[0] && article.sections[0].body

    return (
      <ArticleWrapper>
        <Nav canFix color="black" backgroundColor="white" />

        <SectionWrapper>
          <ArticleTitle
            size="16"
            weight="medium"
            px={[10, 10, 55]}
            pb={10}
            pt={20}
          >
            <div>Year In Visual Culture</div>
            <div>2018</div>
          </ArticleTitle>
          <HeaderImg src={article.hero_section.url} />
        </SectionWrapper>

        <TextContainer px={[10, 10, 55]} py={30} mx="auto">
          <Box maxWidth={1400} mx="auto">
            <Flex
              pb={20}
              alignItems="center"
              flexDirection={["row-reverse", "row"]}
            >
              <Box width={["100%", "100%", "15%"]}>
                <Share
                  url={getArticleFullHref(article.slug)}
                  title={article.social_title || article.thumbnail_title}
                />
              </Box>
              <Flex width={["100%", "100%", "70%"]} maxWidth={1000}>
                <Author authors={article.authors} />
                <Date date={article.published_at} />
              </Flex>
            </Flex>

            <Box width={["100%", "100%", "70%"]} maxWidth={1000} mx="auto">
              {introText && (
                <div dangerouslySetInnerHTML={{ __html: introText }} />
              )}
            </Box>
          </Box>
        </TextContainer>

        {chapters.map((chapter, i) => {
          const isDark = i % 2 === 0
          return (
            <ChapterWrapper isDark={isDark} key={i}>
              {this.getSections(chapter)}
            </ChapterWrapper>
          )
        })}

        {article.relatedArticles && (
          <Box px={[10, 10, 55]} my={40} mx="auto">
            <ArticleCards relatedArticles={article.relatedArticles} />
          </Box>
        )}
      </ArticleWrapper>
    )
  }
}

const BORDER_WIDTH = 6

const ArticleWrapper = styled.div`
  ${NavContainer} {
    border-bottom-width: ${BORDER_WIDTH}px;
    border-top: ${BORDER_WIDTH}px solid black;
  }
  ${DateContainer} {
    margin-top: 0;
  }
  ${StyledAuthor} {
    margin-top: 0;

    ${media.xs`
      width: max-content;
    `};
  }
`

const ChapterWrapper = styled.div<{ isDark?: boolean }>`
  ${props =>
    props.isDark &&
    `
    color: white;
    background-color: ${color("black100")};
    a {
      color: white;
    }
  `};
`

const SectionWrapper = styled(Box)`
  border-bottom: ${BORDER_WIDTH}px solid;
  position: relative;
`

const TextContainer = styled(SectionWrapper)`
  blockquote {
    ${unica("s34")};
    padding: 20px 0;
    line-height: 1.25em;
  }

  p {
    font-size: 24px;
    text-indent: 2em;

    &:first-child {
      text-indent: 0;
    }
  }

  ${media.sm`
    blockquote {
      font-size: 24px;
    }
  `};
`

const ArticleTitle = styled(Sans)`
  text-transform: uppercase;
  border-bottom: ${BORDER_WIDTH}px solid;
  font-size: 7.5vw;
  line-height: 1em;
`

const SectionHeader = styled(Box)<{ isDark?: boolean }>`
  border-bottom: ${BORDER_WIDTH}px solid;

  > div {
    max-width: 1600px;
    margin: 0 auto;
    width: 100%;
    display: flex;
    align-items: flex-end;
  }

  h1 {
    ${unica("s65", "medium")};
    text-transform: uppercase;
    flex: 2;
  }
  h2 {
    font-size: 50px;
    width: fit-content;
    line-height: 1em;
    text-align: right;
  }

  ${media.md`
    h1 {
      font-size: 45px;;
    }
    h2 {
      font-size: 30px;
    }
  `};

  ${media.xs`
    h1 {
      font-size: 30px;;
    }
    h2 {
      font-size: 20px;
    }
`};
`

const HeaderImg = styled.img`
  height: calc(100vh - 50px);
  min-height: 400px;
  object-fit: cover;
  object-position: center;
  width: 100%;
`

const ImageWrapper = styled(SectionWrapper)`
  img {
    max-height: calc(100vh - 50px);
    min-height: 400px;
    object-fit: cover;
    object-position: center;
  }

  ${ImageCollectionItem} {
    ${pMedia.xs`
      margin-bottom: 0;
    `};
  }

  ${CaptionContainer} {
    position: absolute;
    bottom: 0;
    left: 5px;

    p {
      font-size: 10px;
      color: white;
      opacity: 0.6;
      text-shadow: 0 0 5px black;
    }
  }
`
const ImageSetWrapper = styled(SectionWrapper)`
  ${ImageSetContainer} {
    width: 70%;
    max-width: 1000px;
    margin: 0 auto;
    color: black;

    img {
      width: 100%;
    }
    ${media.md`
      width: 100%;
    `};
  }
`
