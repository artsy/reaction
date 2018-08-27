import { Sans, Serif } from "@artsy/palette"
import { WorksForYouArtist_viewer } from "__generated__/WorksForYouArtist_viewer.graphql"
import { ContextProps } from "Components/Artsy"
import ArtworkGrid from "Components/ArtworkGrid"
import Spinner from "Components/Spinner"
import * as React from "react"
import {
  ConnectionData,
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"
import styled from "styled-components"
import { Box } from "Styleguide/Elements/Box"
import { Flex } from "Styleguide/Elements/Flex"
import { Image } from "Styleguide/Elements/Image"

interface Props extends ContextProps {
  relay?: RelayPaginationProp
  viewer: WorksForYouArtist_viewer
  artistID: string
  forSale?: boolean
}

interface State {
  loading: boolean
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

export class WorksForYouArtist extends React.Component<Props, State> {
  state = { loading: false }

  loadMoreArtworks() {
    const hasMore = this.props.viewer.artist.artworks_connection.pageInfo
      .hasNextPage

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
    const { artist } = this.props.viewer
    const { forSale } = this.props
    return (
      <Container>
        <div style={{ padding: "50px 0px 30px 0px" }}>
          <Flex>
            {artist.image && (
              <Avatar>
                <Image
                  src={artist.image.resized.url}
                  width={40}
                  height={40}
                  style={{ borderRadius: "20px" }}
                />
              </Avatar>
            )}
            <Box ml={2}>
              <Serif
                style={{ textDecoration: "none", display: "inline-block" }}
                weight="semibold"
                size={"3"}
              >
                <a
                  style={{ color: "black", textDecoration: "none" }}
                  href={artist.href}
                >
                  {artist.name}
                </a>
              </Serif>

              <Sans style={{ color: "#666" }} size={"2"}>
                {forSale
                  ? artist.counts.for_sale_artworks.toLocaleString()
                  : artist.counts.artworks.toLocaleString()}{" "}
                works
              </Sans>
            </Box>
          </Flex>
        </div>
        <ArtworkGrid
          artworks={artist.artworks_connection}
          columnCount={3}
          itemMargin={40}
          onLoadMore={() => this.loadMoreArtworks()}
          currentUser={this.props.currentUser}
        />
        <SpinnerContainer>
          {this.state.loading ? <Spinner /> : ""}
        </SpinnerContainer>
      </Container>
    )
  }
}

export default createPaginationContainer(
  WorksForYouArtist,
  {
    viewer: graphql`
      fragment WorksForYouArtist_viewer on Viewer
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 10 }
          cursor: { type: "String" }
          artistID: { type: "String!", defaultValue: "" }
          filter: {
            type: "[ArtistArtworksFilters]"
            defaultValue: [IS_FOR_SALE]
          }
        ) {
        artist(id: $artistID) {
          name
          href
          counts {
            artworks
            for_sale_artworks
          }
          image {
            resized(height: 80, width: 80) {
              url
            }
          }
          artworks_connection(
            sort: published_at_desc
            first: $count
            after: $cursor
            filter: $filter
          ) @connection(key: "WorksForYouArtist_artworks_connection") {
            pageInfo {
              hasNextPage
              endCursor
            }
            ...ArtworkGrid_artworks
            edges {
              node {
                __id
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
      return props.viewer.artist.artworks_connection as ConnectionData
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
      query WorksForYouArtistPaginationQuery(
        $artistID: String!
        $count: Int!
        $cursor: String
        $filter: [ArtistArtworksFilters]
      ) {
        viewer {
          ...WorksForYouArtist_viewer
            @arguments(
              artistID: $artistID
              count: $count
              cursor: $cursor
              filter: $filter
            )
        }
      }
    `,
  }
)
