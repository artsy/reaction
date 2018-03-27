import React from "react"
import styled from "styled-components"
import colors from "../../../Assets/Colors"
import { pMedia } from "../../Helpers"
import { NewsDateHeader, NewsText } from "../News/NewsDateHeader"

interface Props {
  date: string
}

export const NewsNav: React.SFC<Props> = props => {
  const { date } = props
  return (
    <NewsNavContainer>
      <MaxWidthContainer>
        {date && <NewsDateHeader date={date} />}
        <Title>The News</Title>
      </MaxWidthContainer>
    </NewsNavContainer>
  )
}

const Title = NewsText.extend`
  position: absolute;
  left: 30px;
  ${pMedia.sm`
    left: 20px;
  `};
`

const MaxWidthContainer = styled.div`
  position: relative;
  max-width: 780px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 26px;
  ${pMedia.sm`
    min-height: 16px;
  `};
`

const NewsNavContainer = styled.div`
  position: fixed;
  top: 52px;
  left: 0;
  right: 0;
  border-bottom: 1px solid ${colors.grayRegular};
  padding: 10px 0;
  background: white;
  z-index: 1;
`
