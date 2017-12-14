import React, { Component  } from "react"
import styled, { StyledFunction } from "styled-components"
import { pMedia } from "../../Helpers"
import { ArticleCard, ArticleCardContainer } from '../Series/ArticleCard'
import { SeriesAbout, SeriesAboutContainer } from '../Series/SeriesAbout'
import { SeriesTitle, SeriesTitleContainer } from '../Series/SeriesTitle'
import { ArticleData } from "../Typings"

interface Props {
  article?: ArticleData
  color?: string
  relatedArticles?: any
}

export class SeriesLayout extends Component<Props, null> {
  public static defaultProps: Partial<Props>

  render () {
    const { article, color, relatedArticles } = this.props
    const { sponsor } = article

    return (
      <SeriesContainer
        className='Series'
        color={color}
      >
        <SeriesContent sponsor={sponsor}>

          <SeriesTitle
            article={article}
            color={color}
          />

          {relatedArticles &&
            relatedArticles.map((relatedArticle, i) =>
              <ArticleCard
                key={i}
                article={relatedArticle}
                series={article}
                color={color}
              />
            )
          }

          <SeriesAbout
            article={article}
            color={color}
          />

        </SeriesContent>
      </SeriesContainer>
    )
  }
}

SeriesLayout.defaultProps = {
  color: 'white'
}

interface ContainerProps {
  sponsor?: any
}

const Div: StyledFunction<Props & ContainerProps & React.HTMLProps<HTMLDivElement>> = styled.div

export const SeriesContainer = Div`
  color: ${props => props.color};
  background-color: black;
  padding: 150px 20px;
`
export const SeriesContent = Div`
  max-width: 1200px;
  margin: 0 auto;

  ${SeriesTitleContainer} {
    margin-bottom: ${props => props.sponsor ? '60px' : '90px'};
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
