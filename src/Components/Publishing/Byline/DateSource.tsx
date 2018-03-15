import React, { Fragment } from "react"
import styled from "styled-components"
import colors from "../../../Assets/Colors"
import { pMedia } from "../../Helpers"
import { getDate } from "../Constants"
import { Fonts } from "../Fonts"
import { NewsBylineProps } from "./NewsByline"

interface Props {
  editSource?: any
}

export const DateSource: React.SFC<NewsBylineProps & Props> = props => {
  const { article, editSource } = props
  const { news_source, published_at } = article

  const getNewsSource = source => {
    if (!source || !source.url) return null
    return (
      <Fragment>
        {", via"}&nbsp;
        {editSource ? editSource : <a href={source.url}>{source.title}</a>}
      </Fragment>
    )
  }

  return (
    <DateSourceContainer>
      {getDate(published_at || new Date(), "verbose")}
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
