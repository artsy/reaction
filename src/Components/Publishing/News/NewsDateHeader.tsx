import moment from "moment"
import React from "react"
import styled from "styled-components"
import { pMedia } from "../../Helpers"
import { Fonts } from "../Fonts"

interface NewsDateHeaderProps {
  date: any
}

export const NewsDateHeader: React.SFC<NewsDateHeaderProps> = props => {
  const { date } = props
  const hasYear =
    moment(date).format("YYYY") !== moment(new Date()).format("YYYY")
  const isToday =
    moment(date).format("MMM D, YYYY") ===
    moment(new Date()).format("MMM D, YYYY")
  const format = hasYear ? "MMM D, YYYY" : "MMM D"

  return (
    <NewsDateHeaderParent>
      <NewsDateHeaderContainer>
        <Title>The News</Title>
        {date && <Text>{isToday ? "Today" : moment(date).format(format)}</Text>}
      </NewsDateHeaderContainer>
    </NewsDateHeaderParent>
  )
}

const NewsDateHeaderParent = styled.div`
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
  padding: 10px 20px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`

const NewsDateHeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  max-width: 780px;
  margin: 0 auto;
  position: relative;
`

const Text = styled.div`
  ${Fonts.unica("s25", "medium")};
  ${pMedia.sm`
    ${Fonts.unica("s16", "medium")}
  `};
`

const Title = Text.extend`
  position: absolute;
  left: 0;
`
