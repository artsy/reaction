import { RelatedArtistsList_artist } from "__generated__/RelatedArtistsList_artist.graphql"
import React, { Component } from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { AppState } from "Router/state"
import { ArtistCardFragmentContainer as ArtistCard } from "Styleguide/Components/ArtistCard"
import { PaginationFragmentContainer as Pagination } from "Styleguide/Components/Pagination"
import { Box } from "Styleguide/Elements/Box"
import { Flex } from "Styleguide/Elements/Flex"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Subscribe } from "unstated"
import { Responsive } from "Utils/Responsive"

import {
  LoadingArea,
  LoadingAreaState,
} from "Apps/Artist/Components/LoadingArea"

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
          pageCursors={this.props.artist.related.artists.pageCursors as any}
          onClick={this.loadAfter}
          onNext={this.loadNext}
        />
      </Box>
    )
  }

  render() {
    return (
      <Subscribe to={[AppState]}>
        {({ state }) => {
          const {
            mediator,
            system: { currentUser },
          } = state

          return (
            <Responsive>
              {({ xs, sm, md }) => {
                let width
                if (xs) {
                  width = "100%"
                } else if (sm || md) {
                  width = "33%"
                } else {
                  width = "25%"
                }

                return (
                  <React.Fragment>
                    <Row>
                      <Col>
                        <LoadingArea isLoading={this.state.isLoading}>
                          <Flex flexWrap mr={-2}>
                            {this.props.artist.related.artists.edges.map(
                              ({ node }, index) => {
                                return (
                                  <Box
                                    pr={2}
                                    mb={xs ? 1 : 4}
                                    width={width}
                                    key={index}
                                  >
                                    <ArtistCard
                                      artist={node as any}
                                      mediator={mediator}
                                      currentUser={currentUser}
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
                              this.props.artist.related.artists.pageInfo
                                .hasNextPage
                            }
                            pageCursors={
                              this.props.artist.related.artists
                                .pageCursors as any
                            }
                            onClick={this.loadAfter}
                            onNext={this.loadNext}
                            scrollTo={this.props.scrollTo}
                          />
                        </Box>
                      </Col>
                    </Row>
                  </React.Fragment>
                )
              }}
            </Responsive>
          )
        }}
      </Subscribe>
    )
  }
}

export const RelatedArtistsRefetchContainer = createRefetchContainer(
  RelatedArtistsList,
  {
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
