import { ShowsRefetchContainer_artist } from "__generated__/ShowsRefetchContainer_artist.graphql"
import React from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { PaginationFragmentContainer } from "Styleguide/Components/Pagination"
import { Box } from "Styleguide/Elements/Box"
import { Flex } from "Styleguide/Elements/Flex"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Separator } from "Styleguide/Elements/Separator"
import { Responsive } from "Styleguide/Utils/Responsive"
import { ShowBlockItem } from "./ShowBlockItem"
import { ShowListItem } from "./ShowListItem"

interface ShowProps {
  relay: RelayRefetchProp
  artist: ShowsRefetchContainer_artist
  status: string
  sort: string
}

export const PAGE_SIZE = 4

export const ShowsRefetchContainer = createRefetchContainer(
  class extends React.Component<ShowProps> {
    loadPrev = () => {
      const {
        startCursor,
        hasPreviousPage,
      } = this.props.artist.showsConnection.pageInfo
      if (hasPreviousPage) {
        this.loadBefore(startCursor)
      }
    }

    loadNext = () => {
      const {
        hasNextPage,
        endCursor,
      } = this.props.artist.showsConnection.pageInfo
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
          status: this.props.status,
          sort: this.props.sort,
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
          status: this.props.status,
          sort: this.props.sort,
        },
        null,
        error => {
          if (error) {
            console.error(error)
          }
        }
      )
    }

    renderShowBlocks(blockWidth: string, blockDirection: any) {
      return (
        <ShowBlocks flexDirection={blockDirection} flexWrap={"true" as any}>
          {this.props.artist.showsConnection.edges.map(({ node }) => {
            return (
              <ShowBlockItem
                blockWidth={blockWidth}
                imageUrl={node.cover_image.cropped.url}
                partner={node.partner.name}
                name={node.name}
                exhibitionInfo={node.exhibition_period}
              />
            )
          })}
        </ShowBlocks>
      )
    }

    renderShowList() {
      return (
        <ShowList>
          {this.props.artist.showsConnection.edges.map(({ node }) => {
            return (
              <ShowListItem
                city={node.city}
                partner={node.partner.name}
                name={node.name}
                exhibitionInfo={node.exhibition_period}
              />
            )
          })}
        </ShowList>
      )
    }

    render() {
      return (
        <Responsive>
          {({ xs }) => {
            const blockWidth = xs ? "100%" : "50%"
            const blockDirection = xs ? "column" : "row"

            return (
              <Row>
                <Col>
                  <Row>
                    <Col>
                      {this.props.status === "running"
                        ? this.renderShowBlocks(blockWidth, blockDirection)
                        : this.renderShowList()}
                    </Col>
                  </Row>

                  {this.props.status === "running" && (
                    <Box py={2}>
                      <Separator />
                    </Box>
                  )}

                  <Row>
                    <Col>
                      <Flex justifyContent="flex-end">
                        <PaginationFragmentContainer
                          pageCursors={
                            this.props.artist.showsConnection.pageCursors as any
                          }
                          onClick={this.loadAfter}
                          onNext={this.loadNext}
                          onPrev={this.loadPrev}
                        />
                      </Flex>
                    </Col>
                  </Row>
                </Col>
              </Row>
            )
          }}
        </Responsive>
      )
    }
  },
  {
    artist: graphql`
      fragment ShowsRefetchContainer_artist on Artist
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
            hasPreviousPage
            startCursor
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
    query ShowsRefetchContainerQuery(
      $first: Int
      $last: Int
      $after: String
      $before: String
      $artistID: String!
      $sort: PartnerShowSorts
      $status: String!
    ) {
      artist(id: $artistID) {
        ...ShowsRefetchContainer_artist
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
