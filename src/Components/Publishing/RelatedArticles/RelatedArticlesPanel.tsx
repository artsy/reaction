import { Sans } from "@artsy/palette"
import * as Schema from "Analytics/Schema"
import { garamond } from "Assets/Fonts"
import { once } from "lodash"
import React from "react"
import track from "react-tracking"
import Waypoint from "react-waypoint"
import styled from "styled-components"
import { crop } from "../../../Utils/resizer"
import { getArticleHref } from "../Constants"

interface RelatedArticlesPanelProps extends React.HTMLProps<HTMLDivElement> {
  label?: string
  articles: Array<{
    thumbnail_title: string
    thumbnail_image: string
    slug: string
    id: string
  }>
}

@track()
export class RelatedArticlesPanel extends React.Component<
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
    owner_id: props.article.id,
    owner_type: Schema.OwnerType.Article,
    // TODO: Check where type & flow fit into new schema
    // flow: "article",
    // type: "thumbnail"
  }))
  onClick(e) {
    // noop
  }

  @track(() => ({
    action: Schema.ActionName.ArticleImpression,
    subject: "Related articles",
  }))
  trackRelatedImpression() {
    // noop
  }

  render() {
    const { articles, label } = this.props

    return (
      <RelatedArticlesContainer>
        <Label size="3t" weight="medium">
          {label}
        </Label>
        <Waypoint onEnter={once(this.trackRelatedImpression.bind(this))} />
        <Collection>
          {articles.map((article, i) => {
            const href = getArticleHref(article.slug)
            const articleImageSrc = crop(article.thumbnail_image, {
              width: 160,
              height: 110,
            })

            return (
              <ArticleLink
                href={href}
                key={`relatedArticles-${i}`}
                onClick={this.onClick.bind(this)}
              >
                <ArticleImage src={articleImageSrc} />
                <ArticleTitle>{article.thumbnail_title}</ArticleTitle>
              </ArticleLink>
            )
          })}
        </Collection>
      </RelatedArticlesContainer>
    )
  }
}

const RelatedArticlesContainer = styled.div`
  max-width: 360px;
`

const Collection = styled.div`
  display: flex;
  flex-direction: column;
`

const Label = Sans.extend`
  margin-bottom: 10px;
`

export const ArticleLink = styled.a`
  text-decoration: none;
  display: flex;
  justify-content: left;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`

const ArticleImage = styled.img`
  min-width: 80px;
  height: 55px;
  margin-right: 10px;
`

const ArticleTitle = styled.span`
  ${garamond("s17")};
  color: black;
`
