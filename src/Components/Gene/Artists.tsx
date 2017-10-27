import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay/compat"
import styled from "styled-components"

import * as fonts from "../../Assets/Fonts"
import ArtistRow from "./ArtistRow"

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

export class Artists extends React.Component<RelayProps, null> {
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
      <ArtistRowsContainer>
        {artistRows}
        <SpinnerContainer>{this.state.loading ? <Spinner /> : ""}</SpinnerContainer>
        {artists && artists.pageInfo.hasNextPage && !this.state.loading && loadMoreButton}
      </ArtistRowsContainer>
    )
  }
}

export default createFragmentContainer(
  Artists,
  graphql`
    fragment Artists_gene on Gene {
      artists: artists_connection(first: $artistsSize) {
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
    }
  `
)

interface RelayProps {
  gene: {
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
  }
}
