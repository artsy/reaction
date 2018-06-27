import { Sans, Serif } from "@artsy/palette"
import { CVItem_artist } from "__generated__/CVItem_artist.graphql"
import { groupBy } from "lodash"
import React from "react"
import styled from "styled-components"
import { themeGet } from "styled-system"
import { Box } from "Styleguide/Elements/Box"
import { Button } from "Styleguide/Elements/Button"
import { Flex } from "Styleguide/Elements/Flex"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Spacer } from "Styleguide/Elements/Spacer"
import { Responsive } from "Styleguide/Utils/Responsive"

import {
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"

export const PAGE_SIZE = 10

export interface CVItemProps {
  relay: RelayPaginationProp
  artist: CVItem_artist
  category: string
}

interface CVItemState {
  isLoading: boolean
}

class CVItem extends React.Component<CVItemProps, CVItemState> {
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

  // FIXME: Check for null links
  // FIXME: Figure out how to always point to artsy.net env? how to handle urls?
  renderShow(node, index) {
    const FIXME_DOMAIN = "https://www.artsy.net"

    return (
      <Show size="3" key={index}>
        <Serif size="3" display="inline" italic>
          {node.href ? (
            <a href={FIXME_DOMAIN + node.href} className="noUnderline">
              {node.name}
            </a>
          ) : (
            <span>{node.name}</span>
          )}
        </Serif>,{" "}
        {node.partner.href ? (
          <a href={FIXME_DOMAIN + node.partner.href} className="noUnderline">
            {node.partner.name}
          </a>
        ) : (
          <span>{node.partner.name}</span>
        )}
        {node.city && `, ${node.city}`}
      </Show>
    )
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
        {({ xs }) => {
          return (
            <React.Fragment>
              <Row>
                <Col>
                  <CVItems mb={3} pb={4}>
                    <Box>
                      <Row>
                        <Col sm={2}>
                          <Box mb={1}>
                            <Category size="3" weight="medium">
                              {this.props.category}
                            </Category>
                          </Box>
                        </Col>
                        <Col sm={10}>
                          {Object.keys(groupedByYear)
                            .sort()
                            .reverse()
                            .map((year, index) => {
                              return (
                                <YearGroup mb={1} key={index}>
                                  <Year size="3">{year}</Year>
                                  <Spacer mr={xs ? 1 : 4} />
                                  <ShowGroup>
                                    {groupedByYear[year].map(
                                      ({ node }, key) => {
                                        return this.renderShow(node, key)
                                      }
                                    )}
                                  </ShowGroup>
                                </YearGroup>
                              )
                            })}

                          {/* FIXME: Implement loading spinner */}
                          {/* {this.props.relay.isLoading() && (
                            <Box position="relative" pt={4} pb={0}>
                              <Spinner />
                            </Box>
                          )} */}

                          <Spacer mb={2} />

                          {this.hasMore && (
                            <Button
                              width={xs ? "100%" : ""}
                              variant="secondaryOutline"
                              onClick={() => this.loadMore()}
                              loading={this.state.isLoading ? true : false}
                            >
                              Show more
                            </Button>
                          )}
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

const CVItems = styled(Box)`
  border-bottom: 1px solid ${themeGet("colors.black10")};
`
const YearGroup = styled(Flex)``
const Year = Serif
const ShowGroup = styled.div``
const Show = Serif
const Category = Sans
