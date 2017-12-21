import React, { Component } from "react"
import styled, { StyledFunction } from "styled-components"
import { pMedia } from "../../Helpers"
import { Nav } from "../Nav/Nav"
import { ArticleCard, ArticleCardContainer } from '../Series/ArticleCard'
import { FixedBackground } from '../Series/FixedBackground'
import { SeriesAbout, SeriesAboutContainer } from '../Series/SeriesAbout'
import { SeriesTitle, SeriesTitleContainer } from '../Series/SeriesTitle'
import { ArticleData } from "../Typings"

interface Props {
  article?: ArticleData
  backgroundColor?: string
  color?: string
  relatedArticles?: any
}

export class SeriesLayout extends Component<Props, null> {
  public static defaultProps: Partial<Props>

  render() {
    const { article, backgroundColor, color, relatedArticles } = this.props
    const { hero_section, sponsor } = article
    const backgroundUrl = hero_section && hero_section.url ? hero_section.url : ''

    return (
      <SeriesContainer
        className='Series'
        color={color}
        backgroundColor={backgroundColor}
      >
        <Nav
          transparent
          sponsor={sponsor}
          canFix={false}
        />

        <FixedBackground
          backgroundColor={backgroundColor}
          backgroundUrl={backgroundUrl}
        />

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
  backgroundColor: 'black',
  color: 'white'
}

interface ContainerProps {
  backgroundUrl?: string,
  sponsor?: any
}

const Div: StyledFunction<Props & ContainerProps & React.HTMLProps<HTMLDivElement>> = styled.div

export const SeriesContent = Div`
  max-width: 1200px;
  min-height: 100vh;
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
export const SeriesContainer = Div`
  color: ${props => props.color};

  ${SeriesContent} {
    padding: 90px 20px 150px;
  }
`
