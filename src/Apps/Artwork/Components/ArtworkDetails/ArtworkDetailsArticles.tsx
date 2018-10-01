import { Box } from "@artsy/palette"
import { ArticleItem } from "Apps/Artist/Routes/Articles/ArtistArticle"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Col, Row } from "Styleguide/Elements/Grid"
import { get } from "Utils/get"

import { ArtworkDetailsArticles_artwork } from "__generated__/ArtworkDetailsArticles_artwork.graphql"

export interface ArtworkDetailsArticlesProps {
  artwork: ArtworkDetailsArticles_artwork
}

export const ArtworkDetailsArticles: React.SFC<
  ArtworkDetailsArticlesProps
> = props => {
  const { articles } = props.artwork
  if (!articles || articles.length < 1) {
    return null
  }
  return (
    <Row>
      <Col>
        <Box>
          {articles.map((article, index) => {
            const imageUrl = get(article, p => p.thumbnail_image.resized.url)
            return (
              <ArticleItem
                title={article.thumbnail_title}
                imageUrl={imageUrl}
                date={article.published_at}
                author={article.author.name}
                href={article.href}
                key={index}
                lastChild={index === articles.length - 1}
              />
            )
          })}
        </Box>
      </Col>
    </Row>
  )
}

export const ArtworkDetailsArticlesFragmentContainer = createFragmentContainer(
  ArtworkDetailsArticles,
  graphql`
    fragment ArtworkDetailsArticles_artwork on Artwork {
      articles(size: 10) {
        author {
          name
        }
        href
        published_at(format: "MMM Do, YYYY")
        thumbnail_image {
          resized(width: 300) {
            url
          }
        }
        thumbnail_title
      }
    }
  `
)
