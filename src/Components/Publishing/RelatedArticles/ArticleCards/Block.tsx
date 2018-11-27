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
import { MaxRow } from "Components/Publishing/Video/Shared"
import React from "react"
import { Col } from "react-styled-flexboxgrid"
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
        <MaxRow>
          <Col>
            <VerticalOrSeriesTitle
              article={article}
              color={color}
              prefix="More in "
            />
          </Col>
          <ArticleCards
            relatedArticles={relatedArticles || article.relatedArticles}
            series={seriesArticle}
            color={color}
          />
        </MaxRow>
      )}
      {seriesArticle && (
        <MaxRow>
          <SeriesAbout article={seriesArticle} color={color} />
        </MaxRow>
      )}
    </ArticleCardsContainer>
  )
}

ArticleCardsBlock.defaultProps = {
  color: "black",
}

export const ArticleCardsContainer = styled.div`
  color: ${props => props.color};

  ${MaxRow} {
    margin: auto;
  }

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
    margin: 60px 0 100px 0;
  }

  ${media.sm`
    ${SeriesAboutContainer} {
      margin: 40px 0 100px 0;
    }
  `};
`
