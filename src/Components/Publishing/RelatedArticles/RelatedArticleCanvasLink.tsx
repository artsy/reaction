import { Serif } from "@artsy/palette"
import * as Schema from "Analytics/Schema"
import React from "react"
import track from "react-tracking"
import styled from "styled-components"
import { crop } from "../../../Utils/resizer"
import { pMedia } from "../../Helpers"
import { Byline } from "../Byline/Byline"
import { getArticleHref } from "../Constants"

export interface RelatedArticleFigureData {
  thumbnail_title: string
  thumbnail_image: string
  slug: string
  id: string
}

export interface RelatedArticleCanvasLinkProps
  extends React.HTMLProps<HTMLDivElement> {
  article: RelatedArticleFigureData
}

@track()
export class RelatedArticleCanvasLink extends React.Component<
  RelatedArticleCanvasLinkProps
> {
  @track(props => ({
    action: Schema.ActionType.Click,
    subject: Schema.Subject.FurtherReading,
    destination_path: getArticleHref(props.article.slug),
    type: "thumbnail",
  }))
  onClick() {
    // noop
  }

  render() {
    const { article } = this.props
    const href = getArticleHref(article.slug)
    const imageSrc = crop(article.thumbnail_image, { width: 510, height: 340 })
    const bylineArticle = { ...article, id: article.slug }

    return (
      <ArticleFigure href={href} onClick={this.onClick.bind(this)}>
        <ImageTitle>
          <BlockImage src={imageSrc} alt={article.thumbnail_title} />
          <Serif size="3t">{article.thumbnail_title}</Serif>
        </ImageTitle>

        <Byline article={bylineArticle} layout="condensed" />
      </ArticleFigure>
    )
  }
}

const ImageTitle = styled.div`
  display: flex;
  flex-direction: column;
  color: black;
  text-decoration: none;
`

const ArticleFigure = styled.a`
  display: flex;
  flex-direction: column;
  width: 278px;
  text-decoration: none;
  color: black;
  ${pMedia.sm`width: 225px;`};
`

const BlockImage = styled.img`
  display: block;
  width: 278px;
  height: 185px;
  margin-bottom: 10px;
  object-fit: cover;
  ${pMedia.sm`
    width: 225px;
    height: 150px;
  `};
`
