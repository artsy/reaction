import { Box, Flex, Sans } from "@artsy/palette"
import { unica } from "Assets/Fonts"
import { Author, StyledAuthor } from "Components/Publishing/Byline/Author"
import { Date, DateContainer } from "Components/Publishing/Byline/Date"
import { Share } from "Components/Publishing/Byline/Share"
import { getArticleFullHref } from "Components/Publishing/Constants"
import {
  ArticleProps,
  FeatureLayout,
} from "Components/Publishing/Layouts/FeatureLayout"
import { Nav, NavContainer } from "Components/Publishing/Nav/Nav"
import React from "react"
import styled from "styled-components"

export const Eoy2018Culture: React.SFC<ArticleProps> = props => {
  const { article } = props
  return (
    <ArticleWrapper>
      <Nav canFix color="black" backgroundColor="white" />

      <ArticleHeader>
        <ArticleTitle size="16" weight="medium">
          <div>Year In Visual Culture</div>
          <div>2018</div>
        </ArticleTitle>
        <HeaderImg src={article.hero_section.url} />
      </ArticleHeader>

      <Intro>
        <Box width={"20%"}>
          <Share
            url={getArticleFullHref(article.slug)}
            title={article.social_title || article.thumbnail_title}
          />
        </Box>
        <Flex>
          <Author authors={article.authors} />
          <Date date={article.published_at} />
        </Flex>
      </Intro>

      <Box>
        <div dangerouslySetInnerHTML={{ __html: article.sections[0].body }} />
      </Box>
      <FeatureLayout {...props} />
    </ArticleWrapper>
  )
}

const ArticleWrapper = styled.div`
  ${NavContainer} {
    border-bottom-width: 6px;
    border-top: 6px solid black;
  }

  blockquote {
    ${unica("s34")};
  }
`

const ArticleTitle = styled(Sans)`
  text-transform: uppercase;
  padding: 20px 40px;
  border-bottom: 6px solid;
`

const Intro = styled(Flex)`
  align-items: center;
  padding: 20px 40px;

  ${DateContainer} {
    margin-top: 0;
  }
  ${StyledAuthor} {
    margin-top: 0;
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
