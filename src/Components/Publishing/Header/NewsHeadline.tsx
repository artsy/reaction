import React from "react"
import styled from "styled-components"
import { Fonts } from "../Fonts"

interface NewsHeadlineProps {
  title: string
  article?: any
}

export const NewsHeadline: React.SFC<NewsHeadlineProps> = props => {
  const { title } = props
  return (
    <NewsHeadlineParent>
      <NewsHeadlineContainer>
        <Title>{title}</Title>
      </NewsHeadlineContainer>
    </NewsHeadlineParent>
  )
}

const NewsHeadlineParent = styled.div`
  margin: 0 40px;
`

const NewsHeadlineContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 780px;
  width: 100%;
  margin: 40px auto;
  box-sizing: border-box;
  margin-bottom: 30px;
`

const Title = styled.div`
  ${Fonts.garamond("s34")};
  font-weight: 600;
`
