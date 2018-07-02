import { ArtistArticles_artist } from "__generated__/ArtistArticles_artist.graphql"
import React, { Component } from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { PaginationFragmentContainer as Pagination } from "Styleguide/Components/Pagination"
import { Flex } from "Styleguide/Elements/Flex"
import { Col, Row } from "Styleguide/Elements/Grid"
import { ArticleItem } from "./ArtistArticle"

import {
  LoadingArea,
  LoadingAreaState,
} from "Apps/Artist/Components/LoadingArea"

const PAGE_SIZE = 10

interface ArtistArticlesProps {
  relay: RelayRefetchProp
  artist: ArtistArticles_artist
}

export class ArtistArticles extends Component<
  ArtistArticlesProps,
  LoadingAreaState
> {
  state = {
    isLoading: false,
  }

  loadNext = () => {
    const {
      artist: {
        articlesConnection: {
          pageInfo: { hasNextPage, endCursor },
        },
      },
    } = this.props

    if (hasNextPage) {
      this.loadAfter(endCursor)
    }
  }

  loadAfter = cursor => {
    this.toggleLoading(true)

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
        this.toggleLoading(false)

        if (error) {
          console.error(error)
        }
      }
    )
  }

  toggleLoading = isLoading => {
    this.setState({
      isLoading,
    })
  }

  render() {
    return (
      <React.Fragment>
        <span id="jumpto--artistArticles" />

        <Row>
          <Col>
            <LoadingArea isLoading={this.state.isLoading}>
              {this.props.artist.articlesConnection.edges.map(
                ({ node }, index) => {
                  return (
                    <ArticleItem
                      title={node.thumbnail_title}
                      imageUrl={node.thumbnail_image.resized.url}
                      date={node.published_at}
                      author={node.author.name}
                      href={node.href}
                      key={index}
                    />
                  )
                }
              )}
            </LoadingArea>
          </Col>
        </Row>
        <Row>
          <Col>
            <Flex mb={2} justifyContent="flex-end">
              <Pagination
                pageCursors={
                  this.props.artist.articlesConnection.pageCursors as any
                }
                onClick={this.loadAfter}
                onNext={this.loadNext}
                scrollTo="#jumpto-RouteTabs"
              />
            </Flex>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export const ArtistArticlesRefetchContainer = createRefetchContainer(
  ArtistArticles,
  {
    artist: graphql`
      fragment ArtistArticles_artist on Artist
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 10 }
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
            endCursor
          }
          pageCursors {
            ...Pagination_pageCursors
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
    query ArtistArticlesQuery(
      $first: Int
      $last: Int
      $after: String
      $before: String
      $artistID: String!
    ) {
      artist(id: $artistID) {
        ...ArtistArticles_artist
          @arguments(first: $first, last: $last, after: $after, before: $before)
      }
    }
  `
)
