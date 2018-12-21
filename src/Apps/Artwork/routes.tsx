import { Route } from "Artsy/Router/Route"
import { graphql } from "react-relay"
import { ArtworkAppFragmentContainer as ArtworkApp } from "./ArtworkApp"

// @ts-ignore
import { ComponentClass, StatelessComponent } from "react"

// TODO: Investigate better error boundaries for runtime errors

export const routes = [
  new Route({
    path: "/artwork2/:artworkID",
    Component: ArtworkApp,
    query: graphql`
      query routes_ArtworkQuery($artworkID: String!) {
        artwork(id: $artworkID) {
          ...ArtworkApp_artwork
        }
      }
    `,
  }),
]
