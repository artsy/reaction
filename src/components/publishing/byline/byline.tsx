import * as React from "react"
import styled, { StyledFunction } from "styled-components"
import { Author, Date } from "./author_date"
import Share from "./share"

interface BylineProps {
  article: any
  layout?: string
}

interface BylineContainerProps {
  layout: string
}

const Byline: React.SFC<BylineProps> = props => {
  const article = props.article
  const layout = props.layout || article.layout
  const { contributing_authors, published_at } = article
  const share = layout === "condensed"
    ? false
    : <Share
        url={`http://www.artsy.net/article/${article.slug}`}
        title={article.social_title || article.thumbnail_title}
        color={layout === "fullscreen" ? "white" : "black"}
      />
  return (
    <BylineContainer layout={layout}>
      <Author authors={contributing_authors} layout={layout} />
      <Date date={published_at} layout={layout} />
      {share}
    </BylineContainer>
  )
}

const Div: StyledFunction<BylineContainerProps> = styled.div
const BylineContainer = Div`
  display: flex;
  flex-wrap: wrap;
  display: flex;
  align-items: center;
`
export default Byline
