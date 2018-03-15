import React from "react"
import styled from "styled-components"
import { pMedia } from "../../Helpers"
import { getArticleFullHref, getAuthorByline } from "../Constants"
import { Fonts } from "../Fonts"
import { IconShareArrow } from "../Icon/IconShareArrow"
import { ArticleData } from "../Typings"
import { DateSource } from "./DateSource"
import { Share } from "./Share"

export interface NewsBylineProps {
  article: ArticleData
  editSource?: any
  isMobile?: boolean
  isTruncated?: boolean
  onShareFromMobile?: () => void
}

export const NewsByline: React.SFC<NewsBylineProps> = props => {
  const {
    article,
    editSource,
    isTruncated,
    isMobile,
    onShareFromMobile,
  } = props
  const { authors, title } = article
  const url = getArticleFullHref(article.slug)

  const shareIcon = isMobile ? (
    <ShareIconContainer onClick={onShareFromMobile}>
      <IconShareArrow />
    </ShareIconContainer>
  ) : (
    <Share url={url} title={title} />
  )

  return (
    <NewsBylineContainer>
      <AuthorDateContainer>
        {!isTruncated && <Poster>Posted by {getAuthorByline(authors)}</Poster>}
        <DateSource article={article} editSource={editSource} />
      </AuthorDateContainer>
      {!isTruncated && shareIcon}
    </NewsBylineContainer>
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

const ShareIconContainer = styled.div`
  &:hover {
    opacity: 0.6;
  }
`
