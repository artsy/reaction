import { RouteConfig } from "found"
import React from "react"
import { graphql } from "react-relay"
import AnalyticsProvider from "./AnalyticsProvider"
import { CollectAppFragmentContainer as CollectApp } from "./CollectApp"
import { CollectionApp } from "./CollectionApp"

export const routes: RouteConfig[] = [
  {
    path: "/collect/:medium?",
    Component: CollectApp,
    query: graphql`
      query routes_CollectAppQuery(
        $medium: String
        $major_periods: [String]
        $partner_id: ID
        $for_sale: Boolean
        $sort: String
        $at_auction: Boolean
        $ecommerce: Boolean
        $inquireable_only: Boolean
        $price_range: String
      ) {
        viewer {
          ...CollectApp_viewer
            @arguments(
              medium: $medium
              major_periods: $major_periods
              partner_id: $partner_id
              for_sale: $for_sale
              sort: $sort
              at_auction: $at_auction
              ecommerce: $ecommerce
              inquireable_only: $inquireable_only
              price_range: $price_range
            )
        }
      }
    `,
    render: ({ props, Component }) => {
      if (!props) {
        return null
      }

      return <AnalyticsProvider {...props} Component={Component} />
    },
    prepareVariables: (params, props) => {
      const initialFilterState = props.location ? props.location.query : {}
      if (params.medium) {
        initialFilterState.medium = params.medium
        if (props.location.query) {
          props.location.query.medium = params.medium
        }
      }
      return { ...initialFilterState, ...params }
    },
  },
  {
    path: "/collection/:slug",
    Component: CollectionApp,
    query: graphql`
      query routes_CollectionAppQuery($slug: String) {
        ...CollectionApp_collection @arguments(slug: $slug)
      }
    `,
    render: ({ props, Component }) => {
      if (!props) {
        return null
      }

      const collection = {
        slug: "minimalist-prints",
        title: "minimalist prints",
        image:
          "https://d32dm0rphc51dk.cloudfront.net/fde__iLARRKC1fKVHILzAQ/untouched-png.png",
        image_caption: "",
        description:
          "Brian Donnelly, better known as KAWS, spent the first year of his career as an animator for Disney. After leaving in 1997, KAWS took inspiration from the company’s signature cartoon, Mickey Mouse, to create his own set of characters that he named “Companions.” With gloved hands and X’s for eyes, “Companions” first appeared in KAWS’s graffiti works across New York City in the late 1990s. By the end of the decade, the street artist created his first three-dimensional version, and his characters have since taken on a variety of colors, sizes, and poses. In 2017, his four-foot-tall Seated Companion (2011) broke the auction record for the series, selling for over $400,000. However, many of KAWS’s “Companions” are considerably more affordable, such as his vinyl toys produced in collaboration with esteemed manufacturers including Bounty Hunter, Bape, Medicom, and his own brand OriginalFake, which was active between 2006 and 2013.",
        medium: "prints",
        major_periods: [],
        gene_ids: [],
        artist_ids: [],
      }

      return <Component {...props} {...collection} />
    },
  },
]
