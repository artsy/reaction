import React, { Component  } from "react"
import styled, { StyledFunction } from "styled-components"
import { pMedia } from "../../Helpers"
import { ArticleCard, ArticleCardContainer } from './ArticleCard'
import { SeriesAbout, SeriesAboutContainer } from './SeriesAbout'
import { SeriesTitle, SeriesTitleContainer } from './SeriesTitle'

interface Props {
  color?: string,
  article?: any
}

export class Series extends Component<Props, null> {
  public static defaultProps: Partial<Props>

  render () {
    const { color, article } = this.props
    const { related_articles } = article

    const articles = related_articles || []

    return (
      <SeriesContainer className='SeriesTitle' color={color}>
        <SeriesContent>

          <SeriesTitle
            article={article}
            color={color}
          />
          
          {articles.map((relatedArticle, i) =>
            <ArticleCard
              key={i}
              article={relatedArticle}
              series={article}
              color={color}
            />
          )}
          
          <SeriesAbout
            article={article}
            color={color}
          />

        </SeriesContent>
      </SeriesContainer>
    )
  }
}

Series.defaultProps = {
  color: 'white'
}

const Div: StyledFunction<Props & React.HTMLProps<HTMLDivElement>> = styled.div

const SeriesContainer = Div`
  color: ${props => props.color};
  background-color: black;
  padding: 150px 20px;
`
const SeriesContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;

  ${SeriesTitleContainer} {
    margin-bottom: 60px;
  }

  ${ArticleCardContainer} {
    margin-bottom: 60px;
  }

  ${SeriesAboutContainer} {
    padding-top: 60px;
  }

  ${props => pMedia.md`
    ${ArticleCardContainer} {
      margin-bottom: 40px;
    }

    ${SeriesAboutContainer} {
      padding-top: 60px;
    }
  `}
`
