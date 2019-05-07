import { Overview_artist } from "__generated__/Overview_artist.graphql"

export type OverviewRouteArtist = Overview_artist & { __fragments: object[] }

export const defaultArtist: OverviewRouteArtist = {
  is_consignable: true,
  __fragments: null,
  id: "juan-gris",
  counts: {
    partner_shows: 11,
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
            id: "cubism",
          },
        },
      ],
    },
    artists: null,
  },
  _id: "4d8b928e4eb68a1b2c000222",
  collections: [
    "Tate",
    "Museum of Modern Art (MoMA)",
    "National Gallery of Art, Washington, D.C.",
  ],
  highlights: {
    partners: {
      edges: [],
    },
  },
  insights: [],
  " $fragmentRefs": null,
  " $refType": null,
}

export const artistWithRelatedArtists: OverviewRouteArtist = {
  ...defaultArtist,
  related: {
    ...defaultArtist.related,
    artists: {
      edges: [
        {
          node: {
            __id: "123",
          },
        },
      ],
    },
  },
}
