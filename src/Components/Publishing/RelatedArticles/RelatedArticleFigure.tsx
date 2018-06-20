import { unica } from "Assets/Fonts"
import React from "react"
import styled from "styled-components"
import { crop } from "../../../Utils/resizer"
import { track } from "../../../Utils/track"
import { pMedia } from "../../Helpers"
import { Byline } from "../Byline/Byline"
import { getArticleHref } from "../Constants"

export interface RelatedArticleFigureData {
  thumbnail_title: string
  thumbnail_image: string
  slug: string
}

interface RelatedArticleFigureProps extends React.HTMLProps<HTMLDivElement> {
  article: RelatedArticleFigureData
}

@track()
export class RelatedArticleFigure extends React.Component<
  RelatedArticleFigureProps,
  null
> {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  @track((props, [e]) => ({
    action: "Clicked article impression",
    article_id: props.article.id,
    destination_path: e.currentTarget.attributes.href.value,
    impression_type: "related_articles_canvas",
    context_type: "article_fixed",
  }))
  onClick(e) {
    // noop
  }

  render() {
    const { article } = this.props
    const href = getArticleHref(article.slug)
    const imageSrc = crop(article.thumbnail_image, { width: 510, height: 340 })
    const bylineArticle = { ...article, id: article.slug }

    return (
      <ArticleFigure href={href} onClick={this.onClick}>
        <ImageTitle>
          <BlockImage src={imageSrc} alt={article.thumbnail_title} />
          <ArticleTitle>{article.thumbnail_title}</ArticleTitle>
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
  min-height: 270px;
  ${pMedia.sm`
    min-height: 235px;
  `};
`

const ArticleFigure = styled.a`
  display: flex;
  flex-direction: column;
  width: 278px;
  text-decoration: none;
  color: black;
  ${pMedia.sm`
    width: 225px;
  `};
`

const ArticleTitle = styled.div`
  ${unica("s16")} ${pMedia.sm`
    ${unica("s14")}
  `};
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
