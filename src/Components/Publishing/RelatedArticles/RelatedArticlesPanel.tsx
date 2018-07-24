import { Sans } from "@artsy/palette"
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
  tracking?: any
  articles: Array<{
    thumbnail_title: string
    thumbnail_image: string
    slug: string
    id: string
  }>
}

export class RelatedArticlesPanel extends React.Component<
  RelatedArticlesPanelProps
> {
  static defaultProps = {
    label: "Related Stories",
  }
  onClick = article => {
    const { tracking } = this.props
    const href = getArticleHref(article.slug)

    tracking.trackEvent({
      action: "Clicked article impression",
      destination_path: href,
      entity_id: article.id,
      entity_type: "article",
      flow: "article",
      impression_type: "Related article",
      type: "link",
    })
  }

  trackRelatedImpression = () => {
    const { tracking } = this.props

    tracking.trackEvent({
      action: "article_impression",
      impression_type: "Related articles",
    })
  }

  render() {
    const { articles, label } = this.props

    return (
      <RelatedArticlesContainer>
        <Label size="3t" weight="medium">
          {label}
        </Label>
        <Waypoint onEnter={once(this.trackRelatedImpression)} />
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
                onClick={() => this.onClick(article)}
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

export default track()(RelatedArticlesPanel)
