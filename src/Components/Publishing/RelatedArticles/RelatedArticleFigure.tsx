import React from "react"
import styled from "styled-components"
import { crop } from "../../../Utils/resizer"
import { track } from "../../../Utils/track"
import { pMedia } from "../../Helpers"
import { Byline } from "../Byline/Byline"
import { articleHref } from "../Constants"
import { Fonts } from "../Fonts"

interface RelatedArticleFigureProps extends React.HTMLProps<HTMLDivElement> {
  article: {
    thumbnail_title: string
    thumbnail_image: string
    slug: string
    contributing_authors: any
    published_at: string
  }
}

@track()
export class RelatedArticleFigure extends React.Component<RelatedArticleFigureProps, void> {
  constructor(props) {
    super()
    this.onClick = this.onClick.bind(this)
  }

  @track((props, [e]) => ({
    action: "Clicked article impression",
    article_id: props.article.id,
    destination_path: e.currentTarget.attributes.href.value,
    impression_type: "related_articles_canvas",
    context_type: "article_fixed",
  }))
  // tslint:disable-next-line:no-empty
  onClick(e) { }

  render() {
    const { article } = this.props
    const href = articleHref(article.slug)
    const imageSrc = crop(article.thumbnail_image, { width: 510, height: 340 })

    return (
      <ArticleFigure>
        <ImageTitle href={href} onClick={this.onClick}>
          <BlockImage
            src={imageSrc}
            alt={article.thumbnail_title}
          />
          <ArticleTitle>
            {article.thumbnail_title}
          </ArticleTitle>
        </ImageTitle>

        <Byline
          article={article}
          layout="condensed"
        />
      </ArticleFigure>
    )
  }
}

const ImageTitle = styled.a`
  display: flex;
  flex-direction: column;
  color: black;
  text-decoration: none;
  min-height: 270px;
  ${pMedia.sm`
    height: 235px;
  `};
`

const ArticleFigure = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 278px;
  margin-right: 30px;
  text-decoration: none;
  color: black;
`

const ArticleTitle = styled.div`
  ${Fonts.unica("s16")} ${pMedia.sm`
    ${Fonts.unica("s14")}
  `};
`

const BlockImage = styled.img`
  display: block;
  width: 278px;
  height: 185px;
  margin-bottom: 10px;
  object-fit: cover;
  ${pMedia.sm`
    height: 150px;
  `};
`
