import { graphql } from "react-relay"
import { ArtworkAppFragmentContainer as ArtworkApp } from "./ArtworkApp"

// @ts-ignore
import { ComponentClass, StatelessComponent } from "react"

export const routes = [
  {
    path: "/artwork2/:artworkID",
    Component: ArtworkApp,
    query: graphql`
      query routes_ArtworkQuery(
        $artworkID: String!
        $showFollowSuggestions: Boolean!
      ) {
        artwork(id: $artworkID) {
          ...ArtworkApp_artwork
            @arguments(showFollowSuggestions: $showFollowSuggestions)
        }
      }
    `,
    prepareVariables: params => {
      const newParams = {
        showFollowSuggestions: true,
        ...params,
      }
      return newParams
    },
  },
]
