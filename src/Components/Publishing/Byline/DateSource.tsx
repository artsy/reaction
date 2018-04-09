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
    const hasSource = source && source.url
    if (!editSource && !hasSource) return null

    return (
      <Fragment>
        {hasSource && ", via"}&nbsp;
        {editSource ? (
          editSource
        ) : (
          <a href={source.url} target="_blank">
            {source.title}
          </a>
        )}
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
