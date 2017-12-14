import * as React from "react"
import { ConnectionData } from "react-relay"
import { createPaginationContainer, graphql, RelayPaginationProp } from "react-relay"
import styled from "styled-components"

import * as fonts from "../../Assets/Fonts"
import Spinner from "../Spinner"
import ArtistRow from "./ArtistRow"

import Dropdown from "../ArtworkFilter/Dropdown"

import { ButtonState } from "../Buttons/Default"
import Button from "../Buttons/Ghost"

const PageSize = 10

interface Props extends RelayProps {
  relay?: RelayPaginationProp
  onDropdownSelected: (slice: string, value: string) => void
}

interface State {
  loading: boolean
}

const ArtistRowsContainer = styled.div`
  margin: 40px 0 20px;
`

const LoadMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const LoadMoreButton = styled.a`
  font-family: ${fonts.primary.fontFamily};
  font-size: 14px;
  cursor: pointer;
  text-transform: uppercase;
  border-bottom: 2px solid transparent;
  &:hover {
    border-bottom: 2px solid black;
  }
`

const SpinnerContainer = styled.div`
  width: 100%;
  height: 100px;
  position: relative;
`

const ArtistFilterButtons = styled.div`
  margin-right: 10px;
  button {
    height: 52px;
    padding: 16px;
  }
`

const FilterBar = styled.div`
  vertical-align: middle;
  text-align: center;

  > div {
    display: inline-block;
  }
`

export class Artists extends React.Component<Props, State> {
  state = {
    loading: false,
  }

  loadMoreArtists() {
    const hasMore = this.props.gene.artists.pageInfo.hasNextPage
    if (!this.state.loading && hasMore) {
      this.setState({ loading: true }, () => {
        this.props.relay.loadMore(PageSize, error => {
          this.setState({ loading: false })
        })
      })
    }
  }

  renderArtistFilter() {
    return (
      <ArtistFilterButtons>
        <span>By Artists:</span>
        <Button
          onClick={() => {
            return null
          }}
          state={ButtonState.Success}
        >
          All Artists
        </Button>
        <span>By Work:</span>
      </ArtistFilterButtons>
    )
  }

  renderArtistDropdown() {
    return this.props.gene.filter_aggregations.aggregations.map(aggregation => {
      return (
        <Dropdown
          aggregation={aggregation}
          key={aggregation.slice}
          selected={aggregation.slice && this.state[aggregation.slice.toLowerCase()]}
          onSelected={this.props.onDropdownSelected}
        />
      )
    })
  }

  render() {
    const artists = this.props.gene.artists

    const artistRows = artists.edges.map(edge => {
      return <ArtistRow artist={edge.node as any} key={edge.node.__id} />
    })

    const loadMoreButton = (
      <LoadMoreContainer>
        <LoadMoreButton onClick={() => this.loadMoreArtists()}>Load More</LoadMoreButton>
      </LoadMoreContainer>
    )

    return (
      <div>
        <FilterBar>
          {this.renderArtistFilter()}
          {this.renderArtistDropdown()}
        </FilterBar>
        <ArtistRowsContainer>
          {artistRows}
          <SpinnerContainer>{this.state.loading ? <Spinner /> : ""}</SpinnerContainer>
          {artists && artists.pageInfo.hasNextPage && !this.state.loading && loadMoreButton}
        </ArtistRowsContainer>
      </div>
    )
  }
}

export default createPaginationContainer(
  Artists,
  {
    gene: graphql.experimental`
      fragment Artists_gene on Gene
        @argumentDefinitions(
          aggregations: { type: "[ArtworkAggregation]", defaultValue: [MEDIUM, TOTAL, PRICE_RANGE, DIMENSION_RANGE] }
          count: { type: "Int", defaultValue: 10 }
          cursor: { type: "String", defaultValue: "" }
        ) {
        __id
        artists: artists_connection(first: $count, after: $cursor) @connection(key: "Artists_artists") {
          pageInfo {
            hasNextPage
          }
          edges {
            node {
              __id
              ...ArtistRow_artist
            }
          }
        }
        filter_aggregations: filtered_artworks(aggregations: $aggregations, size: 0) {
          ...TotalCount_filter_artworks
          aggregations {
            slice
            ...Dropdown_aggregation
          }
        }
      }
    `,
  },
  {
    direction: "forward",
    getConnectionFromProps(props) {
      return props.gene.artists as ConnectionData
    },
    getFragmentVariables(prevVars, totalCount) {
      return {
        ...prevVars,
        count: totalCount,
      }
    },
    getVariables(props, { count, cursor }, fragmentVariables) {
      return {
        // in most cases, for variables other than connection filters like
        // `first`, `after`, etc. you may want to use the previous values.
        ...fragmentVariables,
        count,
        cursor,
        geneNodeID: props.gene.__id,
      }
    },
    query: graphql.experimental`
      query ArtistsQuery($geneNodeID: ID!, $count: Int!, $cursor: String, $aggregations: [ArtworkAggregation]) {
        node(__id: $geneNodeID) {
          ...Artists_gene @arguments(count: $count, cursor: $cursor, aggregations: $aggregations)
        }
      }
    `,
  }
)

interface RelayProps {
  gene: {
    __id: string
    artists: {
      pageInfo: {
        hasNextPage: boolean
      }
      edges: Array<{
        node: {
          __id: string
        }
      }>
    }
    filter_aggregations: {
      aggregations: Array<{
        slice: string
      }>
    }
  }
}
