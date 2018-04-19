import React from "react"
import { Col } from "react-styled-flexboxgrid"
import styled from "styled-components"
import { media } from "../../../Helpers"
import { getEditorialHref } from "../../Constants"
import { Fonts } from "../../Fonts"
import { ArticleData } from "../../Typings"

interface Props {
  article?: ArticleData
}

export const ArticleCardsTitle: React.SFC<Props> = props => {
  const { article: { seriesArticle, vertical } } = props

  const seriesLink =
    seriesArticle && getEditorialHref("series", seriesArticle.slug)

  return (
    <Title>
      {"More in "}
      {seriesArticle ? (
        <Link href={seriesLink}>{seriesArticle.title}</Link>
      ) : (
        <span>{vertical && vertical.name}</span>
      )}
    </Title>
  )
}

export const Link = styled.a`
  text-decoration: none;
  border-bottom: 2px solid;
  color: black;
  ${media.sm`
    display: block;
  `};
`

const Title = styled(Col)`
  ${Fonts.unica("s32")} width: 100%;
  margin-bottom: 40px;
`
