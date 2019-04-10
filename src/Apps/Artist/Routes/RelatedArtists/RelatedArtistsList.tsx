import { Box, Col, Flex, Row } from "@artsy/palette"
import { RelatedArtistsList_artist } from "__generated__/RelatedArtistsList_artist.graphql"
import { ContextConsumer } from "Artsy"
import React, { Component } from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"

import {
  ArtistCardFragmentContainer as ArtistCard,
  PaginationFragmentContainer as Pagination,
} from "Components/v2"

import { LoadingArea, LoadingAreaState } from "Components/v2/LoadingArea"

interface ShowProps {
  relay: RelayRefetchProp
  artist: RelatedArtistsList_artist
  kind: string
  scrollTo: string
}

export const PAGE_SIZE = 16

class RelatedArtistsList extends Component<ShowProps, LoadingAreaState> {
  state = {
    isLoading: false,
  }

  loadNext = () => {
    const {
      artist: {
        related: {
          artists: {
            pageInfo: { hasNextPage, endCursor },
          },
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
        kind: this.props.kind,
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

  renderPagination() {
    return (
      <Box>
        <Pagination
          hasNextPage={this.props.artist.related.artists.pageInfo.hasNextPage}
          pageCursors={this.props.artist.related.artists.pageCursors}
          onClick={this.loadAfter}
          onNext={this.loadNext}
        />
      </Box>
    )
  }

  render() {
    return (
      <ContextConsumer>
        {({ user, mediator }) => {
          return (
            <>
              <Row>
                <Col>
                  <LoadingArea isLoading={this.state.isLoading}>
                    <Flex flexWrap="wrap" mr={-2} width="100%">
                      {this.props.artist.related.artists.edges.map(
                        ({ node }, index) => {
                          return (
                            <Box
                              pr={2}
                              mb={[1, 4]}
                              width={["100%", "33%", "33%", "25%"]}
                              key={index}
                            >
                              <ArtistCard
                                lazyLoad
                                artist={node}
                                mediator={mediator}
                                user={user}
                              />
                            </Box>
                          )
                        }
                      )}
                    </Flex>
                  </LoadingArea>
                </Col>
              </Row>

              <Box py={2} />

              <Row>
                <Col>
                  <Box>
                    <Pagination
                      hasNextPage={
                        this.props.artist.related.artists.pageInfo.hasNextPage
                      }
                      pageCursors={
                        this.props.artist.related.artists.pageCursors
                      }
                      onClick={this.loadAfter}
                      onNext={this.loadNext}
                      scrollTo={this.props.scrollTo}
                    />
                  </Box>
                </Col>
              </Row>
            </>
          )
        }}
      </ContextConsumer>
    )
  }
}

export const RelatedArtistsListRefetchContainer = createRefetchContainer(
  RelatedArtistsList,
  {
    artist: {
      artist: graphql`
        fragment RelatedArtistsList_artist on Artist
          @argumentDefinitions(
            first: { type: "Int", defaultValue: 16 }
            last: { type: "Int" }
            after: { type: "String" }
            before: { type: "String" }
            kind: { type: "RelatedArtistsKind" }
          ) {
          id
          related {
            artists(
              first: $first
              after: $after
              before: $before
              last: $last
              kind: $kind
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
                  ...ArtistCard_artist
                }
              }
            }
          }
        }
      `,
    },
  },
  graphql`
    query RelatedArtistsListQuery(
      $first: Int
      $last: Int
      $after: String
      $before: String
      $artistID: String!
      $kind: RelatedArtistsKind
    ) {
      artist(id: $artistID) {
        ...RelatedArtistsList_artist
          @arguments(
            kind: $kind
            first: $first
            last: $last
            after: $after
            before: $before
          )
      }
    }
  `
)
