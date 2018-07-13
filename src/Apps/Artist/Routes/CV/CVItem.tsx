import { Sans, Serif } from "@artsy/palette"
import { CVItem_artist } from "__generated__/CVItem_artist.graphql"
import { groupBy } from "lodash"
import React, { Component } from "react"
import styled from "styled-components"
import { Box } from "Styleguide/Elements/Box"
import { Button } from "Styleguide/Elements/Button"
import { Flex } from "Styleguide/Elements/Flex"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Spacer } from "Styleguide/Elements/Spacer"
import { Responsive } from "Utils/Responsive"

import {
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"
import { ShowEntry } from "./ShowEntry"

export const PAGE_SIZE = 10

// width={xs || sm ? "100%" : ""}
// mb={3}
// onClick={() => this.loadMore()}
// loading={this.state.isLoading ? true : false}
const ShowMoreButton = props => (
  <Button variant="secondaryOutline" {...props}>
    Show more
  </Button>
)

export interface CVItemProps {
  relay: RelayPaginationProp
  artist: CVItem_artist
  category: string
}

interface CVItemState {
  isLoading: boolean
}

class CVItem extends Component<CVItemProps, CVItemState> {
  state = {
    isLoading: false,
  }

  loadMore() {
    const hasMore = this.props.artist.showsConnection.pageInfo.hasNextPage

    if (hasMore) {
      this.setState({
        isLoading: true,
      })

      this.props.relay.loadMore(PAGE_SIZE, error => {
        if (error) {
          // tslint:disable-next-line:no-console
          console.log(error)
        }

        this.setState({
          isLoading: false,
        })
      })
    }
  }

  get hasMore() {
    const hasMore = this.props.artist.showsConnection.pageInfo.hasNextPage
    return hasMore
  }

  render() {
    const groupedByYear = groupBy(
      this.props.artist.showsConnection.edges,
      ({ node: show }) => {
        return show.start_at
      }
    )

    return (
      <Responsive>
        {({ xs, sm }) => {
          return (
            <React.Fragment>
              <Row>
                <Col>
                  <CVItems pb={1}>
                    <Box>
                      <Row>
                        <Col md={2}>
                          <Box mb={1}>
                            <Category size="3" weight="medium">
                              {this.props.category}
                            </Category>
                          </Box>
                        </Col>
                        <Col sm={12}>
                          {Object.keys(groupedByYear)
                            .sort()
                            .reverse()
                            .map((year, index) => {
                              return (
                                <YearGroup mb={2} key={index}>
                                  <Year size="3">{year}</Year>
                                  <Spacer mr={xs || sm ? 1 : 4} />
                                  <ShowGroup>
                                    {groupedByYear[year].map(
                                      ({ node }, key) => (
                                        <ShowEntry node={node} key={key} />
                                      )
                                    )}
                                  </ShowGroup>
                                </YearGroup>
                              )
                            })}

                          <Spacer mb={1} />

                          {this.hasMore && <ShowMoreButton />}
                        </Col>
                      </Row>
                    </Box>
                  </CVItems>
                </Col>
              </Row>
            </React.Fragment>
          )
        }}
      </Responsive>
    )
  }
}

export const CVPaginationContainer = createPaginationContainer(
  CVItem,
  {
    artist: graphql`
      fragment CVItem_artist on Artist
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 10 }
          cursor: { type: "String" }
          sort: { type: "PartnerShowSorts", defaultValue: "start_at_desc" }
          at_a_fair: { type: "Boolean", defaultValue: false }
          solo_show: { type: "Boolean", defaultValue: false }
          is_reference: { type: "Boolean", defaultValue: true }
          visible_to_public: { type: "Boolean", defaultValue: false }
        ) {
        id
        showsConnection(
          first: $count
          after: $cursor
          sort: $sort
          at_a_fair: $at_a_fair
          solo_show: $solo_show
          is_reference: $is_reference
          visible_to_public: $visible_to_public
        ) @connection(key: "Artist_showsConnection") {
          pageInfo {
            hasNextPage
          }
          edges {
            node {
              __id
              partner {
                ... on ExternalPartner {
                  name
                }
                ... on Partner {
                  name
                  href
                }
              }
              name
              start_at(format: "YYYY")
              city
              href
            }
          }
        }
      }
    `,
  },
  {
    direction: "forward",
    getConnectionFromProps(props) {
      return props.artist.showsConnection as any
    },
    getFragmentVariables(prevVars, totalCount) {
      return { ...prevVars, count: totalCount }
    },
    getVariables(props, { count, cursor }, fragmentVariables) {
      return {
        // in most cases, for variables other than connection filters like
        // `first`, `after`, etc. you may want to use the previous values.
        ...fragmentVariables,
        count,
        cursor,
        artistID: props.artist.id,
      }
    },
    query: graphql`
      query CVItemQuery(
        $count: Int
        $cursor: String
        $artistID: String!
        $sort: PartnerShowSorts
        $at_a_fair: Boolean
        $solo_show: Boolean
        $is_reference: Boolean
        $visible_to_public: Boolean
      ) {
        artist(id: $artistID) {
          ...CVItem_artist
            @arguments(
              sort: $sort
              count: $count
              cursor: $cursor
              at_a_fair: $at_a_fair
              solo_show: $solo_show
              is_reference: $is_reference
              visible_to_public: $visible_to_public
            )
        }
      }
    `,
  }
)

const CVItems = Box
const YearGroup = styled(Flex)``
const Year = Serif
const ShowGroup = styled.div``
const Category = Sans
