import React from "react"
import styled from "styled-components"
import { pMedia } from "../../Helpers"
import { getDate } from "../Constants"
import { Fonts } from "../Fonts"

interface Props {
  date: string
}

export const NewsDateHeader: React.SFC<Props> = props => {
  const { date } = props

  return <NewsText>{getDate(date, "news")}</NewsText>
}

export const NewsText = styled.div`
  ${Fonts.unica("s25", "medium")};
  ${pMedia.sm`
    ${Fonts.unica("s16", "medium")}
  `};
`
