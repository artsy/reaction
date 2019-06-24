import { MarketDataSummary_artist } from "__generated__/MarketDataSummary_artist.graphql"
import { MarketInsights_artist } from "__generated__/MarketInsights_artist.graphql"

export const MarketDataSummaryArtists: MarketDataSummary_artist[] = [
  {
    " $refType": null,
    _id: "589a6291275b2410d1beb6a5",
    collections: ["Museum of Modern Art (MoMA)"],
    highlights: {
      partners: {
        edges: [
          {
            node: {
              categories: [
                { id: "contemporary" },
                { id: "established" },
                { id: "top-established" },
              ],
            },
          },
        ],
      },
    },
    auctionResults: {
      edges: [
        {
          node: {
            price_realized: {
              display: "$63m",
            },
          },
        },
      ],
    },
  },
  {
    " $refType": null,
    _id: "551361eb72616903f6d50300",
    collections: null,
    highlights: {
      partners: {
        edges: [],
      },
    },
    auctionResults: null,
  },
]

export const MarketInsightsArtists: MarketInsights_artist[] = [
  {
    " $refType": null,
    _id: "4d8b92b34eb68a1b2c0003f4",
    collections: ["Tate", "Museum of Modern Art (MoMA)"],
    highlights: {
      partners: {
        edges: [
          {
            node: {
              categories: [
                { id: "contemporary" },
                { id: "established" },
                { id: "modern" },
                { id: "painting" },
                { id: "blue-chip" },
              ],
            },
          },
          { node: { categories: [{ id: "blue-chip" }] } },
          {
            node: {
              categories: [
                { id: "contemporary" },
                { id: "modern" },
                { id: "top-established" },
              ],
            },
          },
          { node: { categories: [{ id: "blue-chip" }] } },
          {
            node: {
              categories: [
                { id: "contemporary" },
                { id: "established" },
                { id: "top-established" },
              ],
            },
          },
        ],
      },
    },
    auctionResults: {
      edges: [{ node: { price_realized: { display: "$63m" } } }],
    },
  },
  {
    " $refType": null,
    _id: "4d8b92b34eb68a1b2c0003f4",
    collections: null,
    highlights: { partners: { edges: [] } },
    auctionResults: null,
  },
]
