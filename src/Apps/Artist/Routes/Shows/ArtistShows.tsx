import { Sans } from "@artsy/palette"
import { ArtistShows_artist } from "__generated__/ArtistShows_artist.graphql"
import React, { Component } from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { PaginationFragmentContainer } from "Styleguide/Components/Pagination"
import { Box } from "Styleguide/Elements/Box"
import { Flex } from "Styleguide/Elements/Flex"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Separator } from "Styleguide/Elements/Separator"
import { Spacer } from "Styleguide/Elements/Spacer"
import { Responsive } from "Utils/Responsive"
import { ArtistShowBlockItem } from "./ArtistShowBlockItem"
import { ArtistShowListItem } from "./ArtistShowListItem"

import {
  LoadingArea,
  LoadingAreaState,
} from "Apps/Artist/Components/LoadingArea"

interface ArtistShowsProps {
  relay: RelayRefetchProp
  artist: ArtistShows_artist
  status: string
  sort: string
  scrollTo: string
  heading: string
}

export const PAGE_SIZE = 4

class ArtistShows extends Component<ArtistShowsProps, LoadingAreaState> {
  state = {
    isLoading: false,
  }

  loadNext = () => {
    const {
      artist: {
        showsConnection: {
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
        status: this.props.status,
        sort: this.props.sort,
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
    if (this.props.artist.showsConnection.edges.length === 0) {
      return null
    }
    return (
      <Responsive>
        {({ xs }) => {
          const blockWidth = xs ? "100%" : "50%"
          const blockDirection = xs ? "column" : "row"
          const pr = xs ? 0 : 2
          const pb = pr

          return (
            <React.Fragment>
              <Row>
                <Col>
                  <Row>
                    <Col>
                      {/* Negative margin bottom to make space 20px from bottom of 
                    text to the image below */}
                      <Sans size="3" weight="medium" mb={-0.5}>
                        {this.props.heading}
                      </Sans>
                      <Spacer mb={2} />
                      <LoadingArea isLoading={this.state.isLoading}>
                        {this.props.status === "running" ? (
                          <ShowBlocks flexDirection={blockDirection} flexWrap>
                            {this.props.artist.showsConnection.edges.map(
                              ({ node }, edgeKey) => {
                                return (
                                  <React.Fragment>
                                    <ArtistShowBlockItem
                                      key={edgeKey}
                                      blockWidth={blockWidth}
                                      imageUrl={node.cover_image.cropped.url}
                                      partner={node.partner.name}
                                      name={node.name}
                                      exhibitionInfo={node.exhibition_period}
                                      pr={pr}
                                      pb={pb}
                                      href={node.href}
                                      city={node.city}
                                    />
                                    {xs && <Spacer mb={3} />}
                                  </React.Fragment>
                                )
                              }
                            )}
                          </ShowBlocks>
                        ) : (
                          <ShowList>
                            {this.props.artist.showsConnection.edges.map(
                              ({ node }, edgeKey) => {
                                return (
                                  <React.Fragment>
                                    <ArtistShowListItem
                                      key={edgeKey}
                                      city={node.city}
                                      partner={node.partner.name}
                                      name={node.name}
                                      exhibitionInfo={node.exhibition_period}
                                      href={node.href}
                                    />

                                    {xs && <Spacer mb={3} />}
                                  </React.Fragment>
                                )
                              }
                            )}
                          </ShowList>
                        )}
                      </LoadingArea>
                    </Col>
                  </Row>

                  <Row>
                    <Separator mb={2} />
                    <Col>
                      <Flex justifyContent="flex-end">
                        <PaginationFragmentContainer
                          pageCursors={
                            this.props.artist.showsConnection.pageCursors as any
                          }
                          onClick={this.loadAfter}
                          onNext={this.loadNext}
                          scrollTo={this.props.scrollTo}
                        />
                      </Flex>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </React.Fragment>
          )
        }}
      </Responsive>
    )
  }
}

export const ArtistShowsRefetchContainer = createRefetchContainer(
  ArtistShows,
  {
    artist: graphql`
      fragment ArtistShows_artist on Artist
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 4 }
          last: { type: "Int" }
          after: { type: "String" }
          before: { type: "String" }
          sort: { type: "PartnerShowSorts" }
          status: { type: "String" }
        ) {
        id
        showsConnection(
          first: $first
          after: $after
          before: $before
          last: $last
          sort: $sort
          status: $status
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
              partner {
                ... on ExternalPartner {
                  name
                }
                ... on Partner {
                  name
                }
              }
              name
              href
              exhibition_period
              cover_image {
                cropped(width: 800, height: 600) {
                  url
                }
              }
              city
            }
          }
        }
      }
    `,
  },
  graphql`
    query ArtistShowsQuery(
      $first: Int
      $last: Int
      $after: String
      $before: String
      $artistID: String!
      $sort: PartnerShowSorts
      $status: String!
    ) {
      artist(id: $artistID) {
        ...ArtistShows_artist
          @arguments(
            sort: $sort
            first: $first
            last: $last
            after: $after
            before: $before
            status: $status
          )
      }
    }
  `
)

const ShowBlocks = Flex
const ShowList = Box
