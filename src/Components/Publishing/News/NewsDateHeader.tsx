import React from "react"
import styled from "styled-components"
import { pMedia } from "../../Helpers"
import { getDate } from "../Constants"
import { unica } from "Assets/Fonts"

interface Props {
  date: string
}

export const NewsDateHeader: React.SFC<Props> = props => {
  const { date } = props

  return <NewsText>{getDate(date, "news")}</NewsText>
}

export const NewsText = styled.div`
  ${unica("s25", "medium")};
  ${pMedia.sm`
    ${unica("s16", "medium")}
  `};
`
