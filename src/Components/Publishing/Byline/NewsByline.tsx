import React from "react"
import styled from "styled-components"
import { getArticleFullHref, getAuthorByline, getDate } from "../Constants"
import { Fonts } from "../Fonts"
import { Share } from "./Share"

interface NewsBylineProps {
  article: any
}

export const NewsByline: React.SFC<NewsBylineProps> = props => {
  const { article } = props
  const { authors, title } = article
  const url = getArticleFullHref(article.slug)

  return (
    <NewsBylineContainer>
      <AuthorDateContainer>
        <Poster>Posted by {getAuthorByline(authors)}</Poster>
        <DateAndSource article={article} />
      </AuthorDateContainer>
      <Share url={url} title={title} />
    </NewsBylineContainer>
  )
}

const DateAndSource: React.SFC<NewsBylineProps> = props => {
  const { article } = props
  const { date, news_source } = article

  return (
    <DateSourceContainer>
      {getDate(date, "verbose")}
      {`, via  ${news_source.title}`}
    </DateSourceContainer>
  )
}

const NewsBylineContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

const AuthorDateContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const Poster = styled.div`
  ${Fonts.unica("s14", "medium")};
`

const DateSourceContainer = styled.div`
  display: flex;
  ${Fonts.unica("s14")} color: #999999;
`
