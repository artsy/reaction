import { ContextConsumer, ContextProps } from "Components/Artsy"
import React from "react"
import {
  createRefetchContainer,
  graphql,
  QueryRenderer,
  RelayRefetchProp,
} from "react-relay"
import styled from "styled-components"
import { Pagination } from "Styleguide/Components/Pagination"
import { Box } from "Styleguide/Elements/Box"
import { Flex } from "Styleguide/Elements/Flex"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Separator } from "Styleguide/Elements/Separator"
import { ArticleItem } from "./ArticleItem"

import { Articles_artist } from "__generated__/Articles_artist.graphql"

interface ArticlesProps {
  relay: RelayRefetchProp
  artist: Articles_artist
}

const PAGE_SIZE = 10

// Renders list of articles, we'll use this in our refetch container.
class ArticlesContainer extends React.Component<ArticlesProps> {
  loadPrev = () => {
    const {
      startCursor,
      hasPreviousPage,
    } = this.props.artist.articlesConnection.pageInfo
    if (hasPreviousPage) {
      this.loadBefore(startCursor)
    }
  }

  loadNext = () => {
    const {
      hasNextPage,
      endCursor,
    } = this.props.artist.articlesConnection.pageInfo
    if (hasNextPage) {
      this.loadAfter(endCursor)
    }
  }

  loadBefore(cursor) {
    this.props.relay.refetch(
      {
        first: null,
        before: cursor,
        artistID: this.props.artist.id,
        after: null,
        last: PAGE_SIZE,
      },
      null,
      error => {
        if (error) {
          console.error(error)
        }
      }
    )
  }

  loadAfter = cursor => {
    this.props.relay.refetch(
      {
        first: PAGE_SIZE,
        after: cursor,
        artistID: this.props.artist.id,
        before: null,
        last: null,
      },
      null,
      error => {
        if (error) {
          console.error(error)
        }
      }
    )
  }

  renderPagination() {
    return (
      <div>
        <Pagination
          {...this.props.artist.articlesConnection.pageCursors}
          onClick={this.loadAfter}
          onNext={this.loadNext}
          onPrev={this.loadPrev}
        />
      </div>
    )
  }

  render() {
    return (
      <div>
        <Row>
          <Col>
            <ArticleList>
              {this.props.artist.articlesConnection.edges.map(({ node }) => {
                return (
                  <ArticleItem
                    title={node.thumbnail_title}
                    imageUrl={node.thumbnail_image.resized.url}
                    date={node.published_at}
                    author={node.author.name}
                    href={node.href}
                  />
                )
              })}
            </ArticleList>
          </Col>
        </Row>

        <Box my={2}>
          <Separator />
        </Box>

        <Row>
          <Col>
            <Flex mb={2} justifyContent="flex-end">
              {this.renderPagination()}
            </Flex>
          </Col>
        </Row>
      </div>
    )
  }
}

// This is the actual Refetch Container we want to use.
const ArticlesRefetchContainer = createRefetchContainer(
  ArticlesContainer,
  {
    artist: graphql`
      fragment Articles_artist on Artist
        @argumentDefinitions(
          first: { type: "Int" }
          last: { type: "Int" }
          after: { type: "String" }
          before: { type: "String" }
        ) {
        id
        articlesConnection(
          first: $first
          after: $after
          before: $before
          last: $last
          sort: PUBLISHED_AT_DESC
          in_editorial_feed: true
        ) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          pageCursors {
            around {
              cursor
              page
              isCurrent
            }
            first {
              cursor
              page
              isCurrent
            }
            last {
              cursor
              page
              isCurrent
            }
          }
          edges {
            node {
              href
              thumbnail_title
              author {
                name
              }
              published_at(format: "MMM d, YYYY")
              thumbnail_image {
                resized(width: 300) {
                  url
                }
              }
              href
            }
          }
        }
      }
    `,
  },
  graphql`
    query ArticlesQuery(
      $first: Int
      $last: Int
      $after: String
      $before: String
      $artistID: String!
    ) {
      artist(id: $artistID) {
        ...Articles_artist
          @arguments(first: $first, last: $last, after: $after, before: $before)
      }
    }
  `
)

interface Props extends ContextProps {
  artistID: string
}

class ArticlesQueryRenderer extends React.Component<Props> {
  render() {
    const { artistID, relayEnvironment } = this.props
    return (
      <QueryRenderer
        environment={relayEnvironment}
        query={graphql`
          query ArticlesIndexQuery($artistID: String!, $first: Int!) {
            artist(id: $artistID) {
              ...Articles_artist @arguments(first: $first)
            }
          }
        `}
        variables={{ artistID, first: PAGE_SIZE }}
        render={({ props }) => {
          if (props) {
            return <ArticlesRefetchContainer artist={props.artist} />
          } else {
            return null
          }
        }}
      />
    )
  }
}

export const ArticlesContent = ContextConsumer(ArticlesQueryRenderer)

const ArticleList = styled.div``
