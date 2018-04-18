import React from "react"
import { Col } from "react-styled-flexboxgrid"
import styled from "styled-components"
import { media } from "../../Helpers"
import { getEditorialHref } from "../Constants"
import { Fonts } from "../Fonts"
import { ArticleCard, ArticleCardContainer } from "../Series/ArticleCard"
import { SeriesAbout, SeriesAboutContainer } from "../Series/SeriesAbout"
import { ArticleData } from "../Typings"
import { MaxRow } from "../Video/Shared"

interface Props {
  article?: ArticleData
  color?: string
  relatedArticles?: any
}

export const RelatedArticleCardFooter: React.SFC<Props> = props => {
  const { article, color, relatedArticles } = props
  const { seriesArticle } = article

  const seriesLink =
    seriesArticle && getEditorialHref("series", seriesArticle.slug)

  return (
    <RelatedArticlesContainer color={color}>
      {relatedArticles && (
        <MaxRow>
          <RelatedArticlesTitle>
            {"More in "}
            {seriesArticle ? (
              <Link href={seriesLink}>{seriesArticle.title}</Link>
            ) : (
              <span>{article.vertical && article.vertical.name}</span>
            )}
          </RelatedArticlesTitle>
        </MaxRow>
      )}
      {relatedArticles &&
        relatedArticles.map((relatedArticle, i) => {
          return (
            <MaxRow key={i}>
              <Col xs={12}>
                <ArticleCard
                  article={relatedArticle}
                  color={color}
                  series={seriesArticle}
                />
              </Col>
            </MaxRow>
          )
        })}
      {seriesArticle && (
        <MaxRow>
          <SeriesAbout article={seriesArticle} color={color} />
        </MaxRow>
      )}
    </RelatedArticlesContainer>
  )
}

const Link = styled.a`
  text-decoration: none;
  border-bottom: 2px solid;
  ${media.sm`
    display: block;
  `};
`

const RelatedArticlesContainer = styled.div`
  color: ${props => (props.color ? props.color : "black")};
  ${ArticleCardContainer} {
    margin-bottom: 60px;
  }
  ${Link} {
    color: ${props => (props.color ? props.color : "black")};
  }

  ${SeriesAboutContainer} {
    margin: 60px 0 100px 0;
  }

  ${media.sm`
    ${ArticleCardContainer} {
      margin-bottom: 30px;
    }
    ${SeriesAboutContainer} {
      margin: 40px 0 100px 0;
    }
  `};
`

const RelatedArticlesTitle = styled(Col)`
  ${Fonts.unica("s32")} width: 100%;
  margin-bottom: 40px;
`
