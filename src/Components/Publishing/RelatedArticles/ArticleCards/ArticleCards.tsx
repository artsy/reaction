import { media } from "Components/Helpers"
import { ArticleData } from "Components/Publishing/Typings"
import React from "react"
import { Col } from "react-styled-flexboxgrid"
import styled from "styled-components"
import { ArticleCard, ArticleCardContainer } from "./ArticleCard"

interface Props {
  series?: ArticleData
  color?: string
  relatedArticles?: any
}

export const ArticleCards: React.SFC<Props> = props => {
  const { color, relatedArticles, series } = props

  return (
    <ArticleCardsContainer color={color}>
      {relatedArticles.map((relatedArticle, i) => {
        return (
          <Col xs={12} key={i}>
            <ArticleCard
              article={relatedArticle}
              color={color}
              series={series}
            />
          </Col>
        )
      })}
    </ArticleCardsContainer>
  )
}

ArticleCards.defaultProps = {
  color: "black",
}

const ArticleCardsContainer = styled.div`
  color: ${props => props.color};

  ${ArticleCardContainer} {
    margin-bottom: 60px;
  }
  ${media.md`
    ${ArticleCardContainer} {
      margin-bottom: 40px;
    }
  `};
`
