import { color, Serif, space } from "@artsy/palette"
import * as Schema from "Analytics/Schema"
import React from "react"
import track from "react-tracking"
import styled from "styled-components"
import { crop } from "../../../Utils/resizer"
import { getArticleHref } from "../Constants"
import { RelatedArticleFigureData } from "./RelatedArticleCanvasLink"

interface RelatedArticlesPanelProps extends React.HTMLProps<HTMLDivElement> {
  article: RelatedArticleFigureData
}

@track()
export class RelatedArticlesPanelLink extends React.Component<
  RelatedArticlesPanelProps
> {
  static defaultProps = {
    label: "Related Stories",
  }

  @track(props => ({
    action: Schema.ActionType.Click,
    action_name: Schema.ActionName.ArticleImpression,
    subject: "Related article",
    destination_path: getArticleHref(props.article.slug),
    // TODO: Check where type & flow fit into new schema
    flow: "article",
    type: "thumbnail",
  }))
  onClick(e) {
    // noop
  }

  render() {
    const { article } = this.props
    const href = getArticleHref(article.slug)
    const articleImageSrc = crop(article.thumbnail_image, {
      width: 160,
      height: 110,
    })

    return (
      <ArticleLink href={href} onClick={this.onClick.bind(this)}>
        <ArticleImage src={articleImageSrc} />
        <Serif size="4t" color={color("black100")}>
          {article.thumbnail_title}
        </Serif>
      </ArticleLink>
    )
  }
}

export const ArticleLink = styled.a`
  text-decoration: none;
  display: flex;
  justify-content: left;
  margin-bottom: ${space(2)}px;
`

const ArticleImage = styled.img`
  min-width: 80px;
  height: 55px;
  margin-right: ${space(1)}px;
`
