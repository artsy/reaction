import { graphql } from "react-relay"
import sd from "sharify"
import { ArtworkAppFragmentContainer as ArtworkApp } from "./ArtworkApp"

// @ts-ignore
import { ComponentClass, StatelessComponent } from "react"

// TODO: Investigate better error boundaries for runtime errors

export const routes = [
  {
    path: "/artwork/:artworkID/(confirm-bid)?",
    Component: ArtworkApp,
    query: graphql`
      query routes_ArtworkQuery(
        $artworkID: String!
        $enablePricingContext: Boolean!
      ) {
        artwork(id: $artworkID) {
          ...ArtworkApp_artwork
        }
      }
    `,
    prepareVariables: params => ({
      ...params,
      // @ts-ignore
      enablePricingContext: sd.CURRENT_USER.lab_features.includes(
        "Pricing Context"
      ),
    }),
  },
]
