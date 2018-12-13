import { Box } from "@artsy/palette"
import { unica } from "Assets/Fonts"
import { media } from "Components/Helpers"
import {
  Vertical,
  VerticalOrSeriesTitle,
} from "Components/Publishing/Sections/VerticalOrSeriesTitle"
import {
  SeriesAbout,
  SeriesAboutContainer,
} from "Components/Publishing/Series/SeriesAbout"
import { ArticleData } from "Components/Publishing/Typings"
import React from "react"
import styled from "styled-components"
import { ArticleCards } from "./ArticleCards"

interface Props {
  article?: ArticleData
  color?: string
  relatedArticles?: any
}

export const ArticleCardsBlock: React.SFC<Props> = props => {
  const { article, color, relatedArticles } = props
  const { seriesArticle } = article

  return (
    <ArticleCardsContainer color={color}>
      {(relatedArticles || article.relatedArticles) && (
        <Box maxWidth={1200} mx="auto">
          <VerticalOrSeriesTitle
            article={article}
            color={color}
            prefix="More in "
          />
          <ArticleCards
            relatedArticles={relatedArticles || article.relatedArticles}
            series={seriesArticle}
            color={color}
          />
        </Box>
      )}
      {seriesArticle && (
        <Box maxWidth={1200} mx="auto">
          <SeriesAbout article={seriesArticle} color={color} />
        </Box>
      )}
    </ArticleCardsContainer>
  )
}

ArticleCardsBlock.defaultProps = {
  color: "black",
}

export const ArticleCardsContainer = styled.div`
  color: ${props => props.color};

  ${Vertical} {
    ${unica("s32")};
    width: 100%;
    margin-bottom: 40px;

    a {
      border-bottom: 2px solid;
      ${media.sm`
        display: block;
      `};
    }
  }

  ${SeriesAboutContainer} {
    margin: 60px auto 100px auto;
  }

  ${media.sm`
    ${SeriesAboutContainer} {
      margin: 40px auto 100px auto;
    }
  `};
`
