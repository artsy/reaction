import React, { Component  } from "react"
import styled, { StyledFunction } from "styled-components"
import { pMedia } from "../../Helpers"
import { ArticleCard } from './Components/ArticleCard'
import { SeriesAbout } from './Components/SeriesAbout'
import { SeriesTitle } from './Components/SeriesTitle'

interface Props {
  color?: string,
  series?: any
}

export class Series extends Component<Props, null> {
  public static defaultProps: Partial<Props>

  render () {
    const { color, series } = this.props
    const articles = series.related_articles || []

    return (
      <SeriesContainer className='SeriesTitle' color={color}>
        <SeriesContent>

          <SeriesTitle
            series={series}
            color={color}
          />
          
          {articles.map((article, i) =>
            <ArticleCard
              key={i}
              article={article}
              series={series}
              color={color}
            />
          )}
          
          <SeriesAbout
            series={series}
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

  .SeriesTitle {
    margin-bottom: 60px;
    .PartnerBlock {
      padding-bottom: 40px;
    }
  }

  .ArticleCard {
    margin-bottom: 60px;
  }

  .SeriesAbout {
    padding-top: 60px;
  }

  ${props => pMedia.md`
    .SeriesTitle {
      .PartnerBlock {
        padding-bottom: 0;
      }
    }

    .ArticleCard {
      margin-bottom: 40px;
    }

    .SeriesAbout {
      padding-top: 40px;
    }
  `}
`
