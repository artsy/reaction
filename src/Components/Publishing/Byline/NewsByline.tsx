import React from "react"
import styled from "styled-components"
import colors from "../../../Assets/Colors"
import { pMedia } from "../../Helpers"
import { getArticleFullHref, getAuthorByline, getDate } from "../Constants"
import { Fonts } from "../Fonts"
import { IconShareArrow } from "../Icon/IconShareArrow"
import { ArticleData } from "../Typings"
import { Share } from "./Share"

interface NewsBylineProps {
  article: ArticleData
  isMobile?: boolean
  isTruncated?: boolean
}

export const NewsByline: React.SFC<NewsBylineProps> = props => {
  const { article, isTruncated, isMobile } = props
  const { authors, title } = article
  const url = getArticleFullHref(article.slug)
  const shareIcon = isMobile ? (
    <IconShareArrow />
  ) : (
    <Share url={url} title={title} />
  )

  return (
    <NewsBylineContainer>
      <AuthorDateContainer>
        {!isTruncated && <Poster>Posted by {getAuthorByline(authors)}</Poster>}
        <DateAndSource article={article} />
      </AuthorDateContainer>
      {!isTruncated && shareIcon}
    </NewsBylineContainer>
  )
}

const DateAndSource: React.SFC<NewsBylineProps> = props => {
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

const NewsBylineContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: flex-start;
`

const AuthorDateContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const Poster = styled.div`
  ${Fonts.unica("s14", "medium")};

  ${pMedia.sm`
    ${Fonts.unica("s12", "medium")}
  `};
`

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
