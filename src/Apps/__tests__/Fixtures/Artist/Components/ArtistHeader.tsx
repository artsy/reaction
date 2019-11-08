import { ArtistHeader_Test_QueryRawResponse } from "__generated__/ArtistHeader_Test_Query.graphql"

export const ArtistHeaderFixture = {
  internalID: "4d8b92884eb68a1b2c0001d8",
  slug: "cecily-brown",
  name: "Cecily Brown",
  nationality: "British",
  years: "born 1969",
  counts: { follows: 9135 },
  carousel: {
    images: [
      {
        href: "/show/two-palms-two-palms-at-the-armory-show-2016",
        resized: {
          url:
            "https://d7hftxdivxxvm.cloudfront.net?resize_to=fit&width=359&height=200&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FlL-b8v9q-GLBENMOg9pVGQ%2Flarge.jpg",
          width: 359,
          height: 200,
        },
      },
    ],
  },
  id: "QXJ0aXN0OmNlY2lseS1icm93bg==",
  is_followed: true,
  statuses: {
    shows: true,
    artists: true,
    articles: false,
    cv: true,
    auction_lots: true,
  },
} as ArtistHeader_Test_QueryRawResponse["artist"]
