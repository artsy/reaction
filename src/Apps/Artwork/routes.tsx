import { graphql } from "react-relay"
import { ArtworkAppFragmentContainer as ArtworkApp } from "./ArtworkApp"

// @ts-ignore
import { ComponentClass, StatelessComponent } from "react"

// TODO: Investigate better error boundaries for runtime errors

export const routes = [
  {
    path: "/artwork/:artworkID/(confirm-bid)?",
    Component: ArtworkApp,
    query: graphql`
      query routes_ArtworkQuery($artworkID: String!) {
        artwork(id: $artworkID) {
          ...ArtworkApp_artwork
        }
      }
    `,
  },
]
