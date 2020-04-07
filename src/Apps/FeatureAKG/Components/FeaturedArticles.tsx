import { Box, Col, Flex, Grid, Image, Row, Sans } from "@artsy/palette"
import { FeaturedArticles_articles } from "__generated__/FeaturedArticles_articles.graphql"
import { StyledLink } from "Apps/Artist/Components/StyledLink"
import { RouterLink } from "Artsy/Router/RouterLink"
import React from "react"
import { createFragmentContainer } from "react-relay"
import { graphql } from "relay-runtime"
import styled from "styled-components"
import { Media } from "Utils/Responsive"

interface FeaturedArticlesProps {
  featured_article_id: string
  article_1_id: string
  article_2_id: string
  article_3_id: string
  view_more_url: string
  articles: FeaturedArticles_articles
}

const FeaturedArticles: React.FC<FeaturedArticlesProps> = props => {
  const articles = [...props.articles]

  if (!articles?.length) {
    return null
  }

  const firstArticle = articles.shift()

  return (
    <Grid fluid>
      <Row>
        <Col md={6}>
          <Box pr={[0, 0, 1]}>
            <StyledLink to={firstArticle.href}>
              <Image
                src={firstArticle.thumbnailImage.cropped.url}
                width="100%"
              />
              <Sans size={["4t", "4t", "6"]} my={1}>
                {firstArticle.thumbnailTitle}
              </Sans>
              <Sans size="2" color="black60">
                {firstArticle.publishedAt}
              </Sans>
            </StyledLink>
          </Box>
          <Media lessThan="md">
            <ArticleSeparator my={2} />
          </Media>
        </Col>
        <Col md={6}>
          {articles.map((article, index) => {
            return (
              <Box ml={[0, 0, 1]} key={`article-${index}`}>
                <StyledLink to={article.href}>
                  <Flex width="100%" justifyContent="space-between">
                    <Box width="70%" maxWidth={["none", "400px"]} mr={[1, 2]}>
                      <Sans size={["2", "3t"]} mb="5px">
                        {article.thumbnailTitle}
                      </Sans>
                      <Sans size="2" color="black60">
                        {article.publishedAt}
                      </Sans>
                    </Box>
                    <Box maxWidth={["90px", "120px"]}>
                      <Image
                        src={article.tinyImage.cropped.url}
                        width="100%"
                        lazyLoad
                        height={60}
                      />
                    </Box>
                  </Flex>
                </StyledLink>
                <ArticleSeparator my={2} />
              </Box>
            )
          })}
          <RouterLink to={props.view_more_url}>
            <Sans size="2" ml={[0, 0, 1]}>
              View more
            </Sans>
          </RouterLink>
        </Col>
      </Row>
    </Grid>
  )
}

export const FeaturedArticlesFragmentContainer = createFragmentContainer(
  FeaturedArticles,
  {
    articles: graphql`
      fragment FeaturedArticles_articles on Article @relay(plural: true) {
        thumbnailTitle
        publishedAt(format: "MMM Do, YYYY")
        thumbnailImage {
          cropped(width: 780, height: 520) {
            url
          }
        }
        tinyImage: thumbnailImage {
          cropped(width: 60, height: 60) {
            url
          }
        }
        href
      }
    `,
  }
)

const ArticleSeparator = styled(Box)`
  border-top: 1px solid #e5e5e5;
`
