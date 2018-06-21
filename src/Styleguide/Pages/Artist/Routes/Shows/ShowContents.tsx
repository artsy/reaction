import React from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { Pagination } from "Styleguide/Components/Pagination"
import { Box } from "Styleguide/Elements/Box"
import { Flex } from "Styleguide/Elements/Flex"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Separator } from "Styleguide/Elements/Separator"

import { Responsive } from "Styleguide/Utils/Responsive"
import { ShowBlockItem } from "./ShowBlockItem"
import { ShowListItem } from "./ShowListItem"

import { ShowContents_artist } from "__generated__/ShowContents_artist.graphql"

const ShowBlocks = Flex
const ShowList = Box

interface ShowProps {
  relay: RelayRefetchProp
  artist: ShowContents_artist
  status: string
}

export const PAGE_SIZE = 4

// This is the actual Refetch Container we want to use.
export const Container = createRefetchContainer(
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
            {...this.props.artist.showsConnection.pageCursors}
            onClick={this.loadAfter}
            onNext={this.loadNext}
            onPrev={this.loadPrev}
          />
        </div>
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
                        {this.renderPagination()}
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
      fragment ShowContents_artist on Artist
        @argumentDefinitions(
          first: { type: "Int" }
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
    query ShowContentsQuery(
      $first: Int
      $last: Int
      $after: String
      $before: String
      $artistID: String!
      $sort: PartnerShowSorts
      $status: String!
    ) {
      artist(id: $artistID) {
        ...ShowContents_artist
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
