import moment from "moment"
import React from "react"
import styled from "styled-components"
import { pMedia } from "../../Helpers"
import { Fonts } from "../Fonts"

interface Props {
  date: string
}

export const NewsDateDivider: React.SFC<Props> = props => {
  const { date } = props
  const today = new Date()
  const isToday =
    moment(date).format("MMM D, YYYY") === moment(today).format("MMM D, YYYY")
  const hasYear = moment(date).format("YYYY") !== moment(today).format("YYYY")
  const format = hasYear ? "MMM D, YYYY" : "MMM D"

  return (
    <NewsDateDividerContainer>
      {date && <Text>{isToday ? "Today" : moment(date).format(format)}</Text>}
    </NewsDateDividerContainer>
  )
}

const Text = styled.div`
  ${Fonts.unica("s25", "medium")};
  ${pMedia.sm`
    ${Fonts.unica("s16", "medium")}
  `};
`

const NewsDateDividerContainer = styled.div`
  margin-top: 80px;
  display: flex;
  justify-content: center;
  width: 100%;
  ${pMedia.sm`
    margin-top: 40px;
`};
`
