import { Box, color, Flex, Sans, Serif } from "@artsy/palette"
import { unica } from "Assets/Fonts"
import { Author, StyledAuthor } from "Components/Publishing/Byline/Author"
import { Date, DateContainer } from "Components/Publishing/Byline/Date"
import { Share } from "Components/Publishing/Byline/Share"
import { getArticleFullHref } from "Components/Publishing/Constants"
import { ArticleProps } from "Components/Publishing/Layouts/FeatureLayout"
import { Nav, NavContainer } from "Components/Publishing/Nav/Nav"
import { CaptionContainer } from "Components/Publishing/Sections/Caption"
import { ImageCollection } from "Components/Publishing/Sections/ImageCollection"
import {
  ImageSetContainer,
  ImageSetPreview,
} from "Components/Publishing/Sections/ImageSetPreview"
import React from "react"
import styled from "styled-components"

export class Eoy2018Culture extends React.Component<ArticleProps> {
  state = {
    chapters: [],
  }

  componentWillMount() {
    this.setState({
      chapters: this.makeSectionArrays(),
    })
  }

  sectionText = (section, i) => {
    return (
      <TextContainer key={i}>
        <Box width={"70%"} mx={"auto"} maxWidth={1000}>
          <Serif size="5">
            <div dangerouslySetInnerHTML={{ __html: section.body }} />
          </Serif>
        </Box>
      </TextContainer>
    )
  }

  sectionHeaderText = (section, i) => {
    return (
      <SectionHeader key={i}>
        <div dangerouslySetInnerHTML={{ __html: section.body }} />
      </SectionHeader>
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
      <ImageSetWrapper key={i}>
        <ImageSetPreview section={section} />
      </ImageSetWrapper>
    )
  }

  sectionIsHeader = section => {
    const isText = section.type === "text"
    const isHeader = isText && section.body.includes("<h1>")
    return isHeader
  }

  makeSectionArrays = () => {
    const {
      article: { sections },
    } = this.props
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
          default: {
            return null
          }
        }
      }
    })
  }

  render() {
    const { article } = this.props
    const { chapters } = this.state

    return (
      <ArticleWrapper>
        <Nav canFix color="black" backgroundColor="white" />

        <ArticleHeader>
          <ArticleTitle size="16" weight="medium" px={40} pb={10} pt={20}>
            <div>Year In Visual Culture</div>
            <div>2018</div>
          </ArticleTitle>
          <HeaderImg src={article.hero_section.url} />
        </ArticleHeader>

        <TextContainer>
          <Box maxWidth={1400} mx="auto">
            <Intro pb={20}>
              <Box width={"15%"}>
                <Share
                  url={getArticleFullHref(article.slug)}
                  title={article.social_title || article.thumbnail_title}
                />
              </Box>
              <Flex width={"70%"} maxWidth={1000}>
                <Author authors={article.authors} />
                <Date date={article.published_at} />
              </Flex>
            </Intro>

            <Box width={"70%"} maxWidth={1000} mx={"auto"}>
              <div
                dangerouslySetInnerHTML={{ __html: article.sections[0].body }}
              />
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
      </ArticleWrapper>
    )
  }
}

const ArticleWrapper = styled.div`
  ${NavContainer} {
    border-bottom-width: 6px;
    border-top: 6px solid black;
  }
  ${DateContainer} {
    margin-top: 0;
  }
  ${StyledAuthor} {
    margin-top: 0;
  }
`

const ChapterWrapper = styled.div<{ isDark?: boolean }>`
  ${props =>
    props.isDark &&
    `
    color: white;
    background-color: ${color("black100")};
  `};
`

const TextContainer = styled.div`
  border-bottom: 6px solid;
  padding: 30px 40px;
  margin: 0 auto;

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
`

const ArticleTitle = styled(Sans)`
  text-transform: uppercase;
  border-bottom: 6px solid;
  font-size: 7.5vw;
  line-height: 1em;
`

const Intro = styled(Flex)`
  align-items: center;
`

const SectionHeader = styled.div<{ isDark?: boolean }>`
  border-bottom: 6px solid;
  padding: 20px 40px 10px;

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
    flex: 2;
    line-height: 1em;
    text-align: right;
  }
`

const HeaderImg = styled.img`
  height: 100%;
  object-fit: cover;
  object-position: center;
  width: 100%;
`

const ArticleHeader = styled.div`
  height: calc(100vh - 46px);
  overflow: hidden;
  border-bottom: 6px solid black;
`

const ImageWrapper = styled.div`
  border-bottom: 6px solid;
  img {
    max-height: calc(100vh - 60px);
    object-fit: cover;
    object-position: center;
  }

  ${CaptionContainer} {
    display: none;
  }
`
const ImageSetWrapper = styled(Box)`
  border-bottom: 6px solid;
  padding: 0 40px;

  ${ImageSetContainer} {
    width: 70%;
    max-width: 1000px;
    margin: 0 auto;
    color: black;

    img {
      width: 100%;
    }
  }
`
