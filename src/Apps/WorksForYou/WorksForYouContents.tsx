import { Box, Flex, Image, Sans, Serif } from "@artsy/palette"
import { WorksForYouContents_viewer } from "__generated__/WorksForYouContents_viewer.graphql"
import { ContextProps } from "Artsy"
import ArtworkGrid from "Components/ArtworkGrid"
import Spinner from "Components/Spinner"
import * as React from "react"
import ReactDOM from "react-dom"
import {
  ConnectionData,
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"
import styled from "styled-components"

interface Props extends ContextProps {
  relay?: RelayPaginationProp
  user?: User
  viewer: WorksForYouContents_viewer
}

interface State {
  loading: boolean
  interval: any
}

const PageSize = 10

const SpinnerContainer = styled.div`
  width: 100%;
  height: 100px;
  position: relative;
`

const Avatar = styled.div`
  border-radius: 20px;
  width: 40px;
  height: 40px;
`

const Container = styled.div`
  &:first-child {
    margin-top: -10px;
  }
`

export class WorksForYouContent extends React.Component<Props, State> {
  state = { loading: false, interval: null }

  componentDidMount() {
    const interval = setInterval(() => {
      this.maybeLoadMore()
    }, 150)
    this.setState({ interval })
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
      <Container>
        {this.props.viewer.me.followsAndSaves.notifications.edges.map(
          ({ node }, index) => {
            return (
              <div style={{ borderBottom: "1px solid #e5e5e5" }} key={index}>
                <Box pt={6} pb={3}>
                  <Flex>
                    {node.image && (
                      <Avatar>
                        <a href={node.href}>
                          <Image
                            src={node.image.resized.url}
                            width={40}
                            height={40}
                            style={{ borderRadius: "20px" }}
                          />
                        </a>
                      </Avatar>
                    )}
                    <Box ml={2}>
                      <Serif
                        style={{
                          textDecoration: "none",
                          display: "inline-block",
                        }}
                        weight="semibold"
                        size={"3"}
                      >
                        <a
                          style={{ color: "black", textDecoration: "none" }}
                          href={node.href}
                        >
                          {node.artists}
                        </a>
                      </Serif>

                      <Sans style={{ color: "#666" }} size={"2"}>
                        {node.summary}, {node.published_at}
                      </Sans>
                    </Box>
                  </Flex>
                </Box>
                <Box pb={6}>
                  <ArtworkGrid
                    artworks={node.artworksConnection}
                    columnCount={3}
                    itemMargin={40}
                    user={this.props.user}
                  />
                </Box>
              </div>
            )
          }
        )}
        <SpinnerContainer>
          {this.state.loading ? <Spinner /> : ""}
        </SpinnerContainer>
      </Container>
    )
  }
}

export default createPaginationContainer(
  WorksForYouContent,
  {
    viewer: graphql`
      fragment WorksForYouContents_viewer on Viewer
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
      query WorksForYouContentsPaginationQuery($count: Int!, $cursor: String) {
        viewer {
          ...WorksForYouContents_viewer
            @arguments(count: $count, cursor: $cursor)
        }
      }
    `,
  }
)
