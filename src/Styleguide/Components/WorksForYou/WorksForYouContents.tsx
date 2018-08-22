import { Sans, Serif } from "@artsy/palette"
import { WorksForYouContents_viewer } from "__generated__/WorksForYouContents_viewer.graphql"
import { ChevronIcon } from "Assets/Icons/ChevronIcon"
import ArtworkGrid from "Components/ArtworkGrid"
import * as React from "react"
import ReactDOM from "react-dom"
import {
  ConnectionData,
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"

interface Props {
  relay?: RelayPaginationProp
  viewer: WorksForYouContents_viewer
}

interface State {
  loading: boolean
  interval: any
}

const PageSize = 10

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
      <div>
        {this.props.viewer.me.followsAndSaves.notifications.edges.map(
          ({ node }) => {
            return (
              <div>
                <hr />
                <div style={{ padding: "32px 0px" }}>
                  <Sans
                    style={{
                      textDecoration: "none",
                      textTransform: "uppercase",
                    }}
                    weight="medium"
                    size={"2"}
                  >
                    <a
                      style={{ color: "black", textDecoration: "none" }}
                      href={node.href}
                    >
                      {node.artists}
                      <span style={{ position: "relative", top: "3px" }}>
                        <ChevronIcon width={16} height={16} />
                      </span>
                    </a>
                  </Sans>

                  <Serif style={{ color: "#666" }} size={"2"}>
                    {node.summary}, {node.published_at}
                  </Serif>
                </div>
                <ArtworkGrid
                  artworks={node.artworksConnection}
                  columnCount={4}
                  itemMargin={40}
                />
              </div>
            )
          }
        )}
      </div>
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
