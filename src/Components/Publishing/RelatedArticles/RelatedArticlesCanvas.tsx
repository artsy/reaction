import { unica } from "Assets/Fonts"
import _ from "lodash"
import React from "react"
import styled, { StyledFunction } from "styled-components"
import { pMedia } from "../../Helpers"
import {
  RelatedArticleFigure,
  RelatedArticleFigureData,
} from "./RelatedArticleFigure"

interface RelatedArticlesCanvasProps extends React.HTMLProps<HTMLDivElement> {
  vertical?: {
    name: string
    id?: string
  }
  articles: RelatedArticleFigureData[]
  isMobile?: boolean
}

interface ScrollingContainerProps {
  isMobile?: boolean
}

export const RelatedArticlesCanvas: React.SFC<
  RelatedArticlesCanvasProps
> = props => {
  const { articles, isMobile, vertical } = props

  return (
    <RelatedArticlesContainer>
      {getTitle(vertical)}
      <ArticlesWrapper isMobile={isMobile}>
        {_.map(articles, (article, i) => {
          return (
            <RelatedArticleFigure
              article={article}
              key={`related-article-figure-${i}`}
            />
          )
        })}
      </ArticlesWrapper>
    </RelatedArticlesContainer>
  )
}

const getTitle = vertical => {
  if (vertical) {
    return (
      <Title>
        Further Reading in <VerticalSpan>{vertical.name}</VerticalSpan>
      </Title>
    )
  } else {
    return <Title>More from Artsy Editorial</Title>
  }
}

const ScrollingContainer: StyledFunction<
  ScrollingContainerProps & React.HTMLProps<HTMLDivElement>
> =
  styled.div

const RelatedArticlesContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1250px;
  margin: 30px auto 30px auto;
  ${pMedia.xl`
    margin: 30px 0 30px 0;
  `};
`
const Title = styled.div`
  ${unica("s32")} margin-bottom: 30px;
  ${pMedia.xl`
    margin: 0 20px 30px 40px;
  `} ${pMedia.sm`
    margin-left: 20px;
  `};
`
const VerticalSpan = styled.span`
  ${pMedia.sm`
    display: block;
  `};
`
const ArticlesWrapper = ScrollingContainer`
  display: flex;
  justify-content: space-between;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  a {
    margin-right: 30px;
    &:last-child {
      margin-right: 0;
    }
    ${pMedia.xl`
      margin: 0 10px;
      &:first-child {
        margin-left: 40px;
      }
      &:last-child {
        border-right: 20px solid white;
      }
    `}
    ${pMedia.sm`
      &:first-child {
        margin-left: 20px;
      }
    `}
  }
  ${props => props.isMobile && "-webkit-overflow-scrolling: touch;"}
`
