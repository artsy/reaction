import { OverviewQueryRawResponse } from "__generated__/OverviewQuery.graphql"

export const defaultArtist: OverviewQueryRawResponse["artist"] = {
  is_consignable: true,
  id: "opaque-artist-id",
  slug: "juan-gris",
  name: "Juan Gris",
  counts: {
    follows: 42,
    partner_shows: 11,
    for_sale_artworks: 20,
    ecommerce_artworks: 30,
    auction_artworks: 40,
    artworks: 50,
    has_make_offer_artworks: true,
  },
  is_followed: true,
  sidebarAggregations: {
    id: "opaque-sidebar-aggregations",
    aggregations: [],
  },
  filtered_artworks: {
    id: "opaque-filtered-artworks-id",
    aggregations: [],
    edges: [],
    pageCursors: null,
    pageInfo: null,
  },
  href: "/artist/juan-gris",
  biography_blurb: {
    text:
      '<p>Originally trained in math and physics, Juan Gris moved to Paris in 1906, where he met <a href="/artist/pablo-picasso">Pablo Picasso</a> and <a href="/artist/georges-braque">Georges Braque</a> and became involved in the <a href="/gene/cubism">Cubist</a> movement. Gris took a highly mathematical approach to Cubist painting, rendering discrete forms with precision and exactitude, the resulting images almost resembling technical drawings. The composition of <em>Jar, Flask, and Glass</em> (1911), for example, was derived from an underlying grid structure, the different modules depicting different planar perspectives and yielding an overall composition that is both fractured and flattened. Gris also experimented with <a href="/gene/pointillism">Pointillism</a> in works such as <a href="/artwork/juan-gris-newspaper-and-fruit-dish"><em>Newspaper and Fruit Dish</em></a> (1916), and often alluded to earlier artists such as <a href="/artist/jean-baptiste-camille-corot">Jean-Baptiste-Camille Corot</a> and <a href="/artist/paul-cezanne">Paul Cézanne</a> through both style and subject matter.</p>\n',
    credit: null,
  },
  currentEvent: null,
  related: {
    genes: {
      edges: [
        {
          node: {
            id: "opaque-gene-id",
            slug: "cubism",
            name: "Cubism",
            href: "/gene/cubism",
          },
        },
      ],
    },
    artistsConnection: null,
  },
  internalID: "4d8b928e4eb68a1b2c000222",
  collections: [
    "Tate",
    "Museum of Modern Art (MoMA)",
    "National Gallery of Art, Washington, D.C.",
  ],
  highlights: {
    partnersConnection: {
      edges: [],
    },
  },
  insights: [],
  auctionResultsConnection: null,
  // __fragments: null,
  // " $fragmentRefs": null,
  // " $refType": null,
}

export const artistWithRelatedArtists: OverviewQueryRawResponse["artist"] = {
  ...defaultArtist,
  related: {
    ...defaultArtist.related,
    artistsConnection: {
      edges: [
        {
          node: {
            id: "123",
          },
        },
      ],
    },
  },
}
