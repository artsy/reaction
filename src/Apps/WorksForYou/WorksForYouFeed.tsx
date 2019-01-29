import { Box, EntityHeader, Separator, Spacer, Spinner } from "@artsy/palette"
import { WorksForYouFeed_viewer } from "__generated__/WorksForYouFeed_viewer.graphql"
import { ContextProps } from "Artsy"
import ArtworkGrid from "Components/ArtworkGrid"
import React, { Component } from "react"
import ReactDOM from "react-dom"
import styled from "styled-components"
import { get } from "Utils/get"

import {
  ConnectionData,
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"

interface Props extends ContextProps {
  relay?: RelayPaginationProp
  user?: User
  viewer: WorksForYouFeed_viewer
}

interface State {
  loading: boolean
  interval: any
}

const PageSize = 10
const RefreshInterval = 150 // ms

export class WorksForYouFeed extends Component<Props, State> {
  state = {
    loading: false,
    interval: null,
  }

  componentDidMount() {
    const interval = setInterval(() => {
      this.maybeLoadMore()
    }, RefreshInterval)

    this.setState({
      interval,
    })
  }

  componentWillUnmount() {
    if (this.state.interval) {
      clearInterval(this.state.interval)
    }
  }

  maybeLoadMore() {
    const threshold = window.innerHeight + window.scrollY
    const el = ReactDOM.findDOMNode(this) as Element
    if (threshold >= el.clientHeight + el.scrollTop) {
      this.loadMoreArtworks()
    }
  }

  loadMoreArtworks() {
    const hasMore = this.props.viewer.me.followsAndSaves.notifications.pageInfo
      .hasNextPage

    if (!hasMore && this.state.interval) {
      clearInterval(this.state.interval)
    }
    if (hasMore && !this.state.loading) {
      this.setState({ loading: true }, () => {
        this.props.relay.loadMore(PageSize, error => {
          if (error) {
            console.error(error)
          }

          this.setState({ loading: false })
        })
      })
    }
  }

  render() {
    return (
      <>
        {this.props.viewer.me.followsAndSaves.notifications.edges.map(
          ({ node }, index) => {
            const avatarImageUrl = get(node, p => p.image.resized.url)
            const meta = `${node.summary}, ${node.published_at}`

            return (
              <Box key={index}>
                <EntityHeader
                  name={node.artists}
                  meta={meta}
                  imageUrl={avatarImageUrl}
                  href={node.href}
                />

                <Spacer mb={3} />

                <ArtworkGrid
                  artworks={node.artworksConnection}
                  columnCount={3}
                  itemMargin={40}
                  user={this.props.user}
                />

                <Box mt={4} mb={3}>
                  <Separator />
                </Box>
              </Box>
            )
          }
        )}

        <SpinnerContainer>
          {this.state.loading ? <Spinner /> : ""}
        </SpinnerContainer>
      </>
    )
  }
}

export const WorksForYouFeedPaginationContainer = createPaginationContainer(
  WorksForYouFeed,
  {
    viewer: graphql`
      fragment WorksForYouFeed_viewer on Viewer
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 10 }
          cursor: { type: "String" }
          for_sale: { type: "Boolean", defaultValue: true }
        ) {
        me {
          followsAndSaves {
            notifications: bundledArtworksByArtist(
              sort: PUBLISHED_AT_DESC
              first: $count
              after: $cursor
              for_sale: $for_sale
            ) @connection(key: "WorksForYou_notifications") {
              pageInfo {
                hasNextPage
                endCursor
              }
              edges {
                node {
                  __id
                  href
                  summary
                  artists
                  published_at(format: "MMM DD")
                  artworksConnection {
                    ...ArtworkGrid_artworks
                  }
                  image {
                    resized(height: 80, width: 80) {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
  },
  {
    direction: "forward",
    getConnectionFromProps(props) {
      return props.viewer.me.followsAndSaves.notifications as ConnectionData
    },
    getFragmentVariables(prevVars, totalCount) {
      return {
        ...prevVars,
        count: totalCount,
      }
    },
    getVariables(_props, { count, cursor }, fragmentVariables) {
      return {
        // in most cases, for variables other than connection filters like
        // `first`, `after`, etc. you may want to use the previous values.
        ...fragmentVariables,
        count,
        cursor,
      }
    },
    query: graphql`
      query WorksForYouFeedPaginationQuery($count: Int!, $cursor: String) {
        viewer {
          ...WorksForYouFeed_viewer @arguments(count: $count, cursor: $cursor)
        }
      }
    `,
  }
)

const SpinnerContainer = styled.div`
  width: 100%;
  height: 100px;
  position: relative;
`
