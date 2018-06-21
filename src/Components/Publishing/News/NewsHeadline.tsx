import { garamond } from "Assets/Fonts"
import React from "react"
import styled from "styled-components"
import { pMedia } from "../../Helpers"

interface NewsHeadlineProps {
  article: any
  editTitle?: any
}

export const NewsHeadline: React.SFC<NewsHeadlineProps> = props => {
  const { article, editTitle } = props
  const { title } = article

  return (
    <NewsHeadlineParent>
      <NewsHeadlineContainer>
        <Title>{editTitle ? editTitle : title}</Title>
      </NewsHeadlineContainer>
    </NewsHeadlineParent>
  )
}

const NewsHeadlineParent = styled.div`
  margin: 0;
`

const NewsHeadlineContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  max-width: 780px;
  width: 100%;
  margin: 10px auto 30px;
  box-sizing: border-box;
`

const Title = styled.div`
  ${garamond("s34")};
  font-weight: 600;
  ${pMedia.sm`
    ${garamond("s23")}
    line-height: 1.1;
  `};
`
