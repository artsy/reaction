import React from "react"
import styled from "styled-components"
import { media } from "../../../Helpers"
import { SeriesAbout, SeriesAboutContainer } from "../../Series/SeriesAbout"
import { ArticleData } from "../../Typings"
import { MaxRow } from "../../Video/Shared"
import { ArticleCards } from "./ArticleCards"
import { ArticleCardsTitle, Link } from "./Title"

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
      {relatedArticles && (
        <MaxRow>
          <ArticleCardsTitle article={article} />
          <ArticleCards
            relatedArticles={relatedArticles}
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

const ArticleCardsContainer = styled.div`
  color: ${props => props.color};

  ${Link} {
    color: ${props => props.color};
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
