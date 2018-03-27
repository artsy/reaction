import moment from "moment"
import React from "react"
import styled from "styled-components"
import { pMedia } from "../../Helpers"
import { Fonts } from "../Fonts"

interface Props {
  date: string
}

export const NewsDateHeader: React.SFC<Props> = props => {
  const { date } = props
  const today = new Date()
  const isToday =
    moment(date).format("MMM D, YYYY") === moment(today).format("MMM D, YYYY")
  const hasYear = moment(date).format("YYYY") !== moment(today).format("YYYY")
  const format = hasYear ? "MMM D, YYYY" : "MMM D"

  return <NewsText>{isToday ? "Today" : moment(date).format(format)}</NewsText>
}

export const NewsText = styled.div`
  ${Fonts.unica("s25", "medium")};
  ${pMedia.sm`
    ${Fonts.unica("s16", "medium")}
  `};
`
