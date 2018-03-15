import React from "react"
import styled from "styled-components"
import colors from "../../../Assets/Colors"
import { pMedia } from "../../Helpers"
import { getDate } from "../Constants"
import { Fonts } from "../Fonts"
import { NewsBylineProps } from "./NewsByline"

export const DateAndSource: React.SFC<NewsBylineProps> = props => {
  const { article } = props
  const { date, news_source, published_at } = article

  const getNewsSource = source => {
    if (!source || !source.url) return null
    return (
      <div>
        {", via "}
        <a href={source.url}>{source.title}</a>
      </div>
    )
  }

  return (
    <DateSourceContainer>
      {getDate(date || published_at, "verbose")}
      {getNewsSource(news_source)}
    </DateSourceContainer>
  )
}

const DateSourceContainer = styled.div`
  display: flex;
  ${Fonts.unica("s14")};

  ${pMedia.sm`
    ${Fonts.unica("s12")}
  `} a {
    color: ${colors.grayDark};
  }
  color: ${colors.grayDark};
`
