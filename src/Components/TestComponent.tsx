import React from "react"
import { RootQueryRenderer } from "Relay/RootQueryRenderer"
import { graphql } from "react-relay"
import ArtworkGrid from "Components/ArtworkGrid"

export const query = graphql`
  query TestComponentQuery($artistID: String!) {
    artist(id: $artistID) {
      artworks: artworks_connection(first: 10) {
        ...ArtworkGrid_artworks
      }
    }
  }
`

export const TestComponent = props => {
  return (
    <RootQueryRenderer
      isomorphic
      query={query}
      variables={{ artistID: "andy-warhol" }}
      render={readyState => {
        return (
          readyState.props && (
            <ArtworkGrid {...readyState.props.artist as any} />
          )
        )
      }}
      {...props}
    />
  )
}
