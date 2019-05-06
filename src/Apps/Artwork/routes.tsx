import { graphql } from "react-relay"
import { ArtworkAppFragmentContainer as ArtworkApp } from "./ArtworkApp"

// @ts-ignore
import { ComponentClass, StatelessComponent } from "react"
import { get } from "Utils/get"

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
    prepareVariables: (params, { context }) => ({
      ...params,
      enablePricingContext: get(
        context,
        ctx => ctx.user.lab_features.includes("Pricing Context"),
        false
      ),
    }),
  },
]
