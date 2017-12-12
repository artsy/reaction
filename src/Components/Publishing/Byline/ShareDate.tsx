import React from "react"
import styled, { StyledFunction } from "styled-components"
import { pMedia } from "../../Helpers"
import { getArticleFullHref, getDate } from "../Constants"
import { Fonts } from "../Fonts"
import { Date } from "./AuthorDate"
import { Share } from "./Share"

interface ShareDateProps {
  article: any
  color?: string
}

interface ColorProps {
  color?: string
}

export const ShareDate: React.SFC<ShareDateProps> = props => {
  const { article, color } = props
  const title = article.social_title || article.thumbnail_title
  return (
    <ShareDateContainer color={color}>
      <Date
        date={getDate(article.published_at)}
      />
      <Share
        url={getArticleFullHref(article.slug)}
        title={title}
        color={color}
        hasLabel
      />
    </ShareDateContainer>
  )
}

ShareDate.defaultProps = {
  color: 'black'
}

const div: StyledFunction<ColorProps> = styled.div

const ShareDateContainer = div`
  color: ${props => props.color || 'black'};
`
