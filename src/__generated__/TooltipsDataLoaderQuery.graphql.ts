/* tslint:disable */

import { ConcreteRequest } from "relay-runtime"
export type TooltipsDataLoaderQueryVariables = {
  readonly artistSlugs?: ReadonlyArray<string> | null
}
export type TooltipsDataLoaderQueryResponse = {
  readonly artists: ReadonlyArray<
    | ({
        readonly id: string
      })
    | null
  > | null
}

/*
query TooltipsDataLoaderQuery(
  $artistSlugs: [String!]
) {
  artists(slugs: $artistSlugs) {
    id
    ...ArtistToolTip_artist
    __id
  }
}

fragment ArtistToolTip_artist on Artist {
  name
  formatted_nationality_and_birthday
  href
  blurb
  carousel {
    images {
      resized(height: 200) {
        url
        width
        height
      }
    }
  }
  collections
  highlights {
    partners(first: 5, display_on_partner_profile: true, represented_by: true, partner_category: ["blue-chip", "top-established", "top-emerging"]) {
      edges {
        node {
          categories {
            id
          }
          __id
        }
        __id
      }
    }
  }
  auctionResults(recordsTrusted: true, first: 1, sort: PRICE_AND_DATE_DESC) {
    edges {
      node {
        price_realized {
          display
        }
        __id
      }
    }
  }
  __id
}
*/

const node: ConcreteRequest = (function() {
  var v0 = [
      {
        kind: "LocalArgument",
        name: "artistSlugs",
        type: "[String!]",
        defaultValue: null,
      },
    ],
    v1 = [
      {
        kind: "Variable",
        name: "slugs",
        variableName: "artistSlugs",
        type: "[String]",
      },
    ],
    v2 = {
      kind: "ScalarField",
      alias: null,
      name: "id",
      args: null,
      storageKey: null,
    },
    v3 = {
      kind: "ScalarField",
      alias: null,
      name: "__id",
      args: null,
      storageKey: null,
    }
  return {
    kind: "Request",
    operationKind: "query",
    name: "TooltipsDataLoaderQuery",
    id: null,
    text:
      'query TooltipsDataLoaderQuery(\n  $artistSlugs: [String!]\n) {\n  artists(slugs: $artistSlugs) {\n    id\n    ...ArtistToolTip_artist\n    __id\n  }\n}\n\nfragment ArtistToolTip_artist on Artist {\n  name\n  formatted_nationality_and_birthday\n  href\n  blurb\n  carousel {\n    images {\n      resized(height: 200) {\n        url\n        width\n        height\n      }\n    }\n  }\n  collections\n  highlights {\n    partners(first: 5, display_on_partner_profile: true, represented_by: true, partner_category: ["blue-chip", "top-established", "top-emerging"]) {\n      edges {\n        node {\n          categories {\n            id\n          }\n          __id\n        }\n        __id\n      }\n    }\n  }\n  auctionResults(recordsTrusted: true, first: 1, sort: PRICE_AND_DATE_DESC) {\n    edges {\n      node {\n        price_realized {\n          display\n        }\n        __id\n      }\n    }\n  }\n  __id\n}\n',
    metadata: {},
    fragment: {
      kind: "Fragment",
      name: "TooltipsDataLoaderQuery",
      type: "Query",
      metadata: null,
      argumentDefinitions: v0,
      selections: [
        {
          kind: "LinkedField",
          alias: null,
          name: "artists",
          storageKey: null,
          args: v1,
          concreteType: "Artist",
          plural: true,
          selections: [
            v2,
            {
              kind: "FragmentSpread",
              name: "ArtistToolTip_artist",
              args: null,
            },
            v3,
          ],
        },
      ],
    },
    operation: {
      kind: "Operation",
      name: "TooltipsDataLoaderQuery",
      argumentDefinitions: v0,
      selections: [
        {
          kind: "LinkedField",
          alias: null,
          name: "artists",
          storageKey: null,
          args: v1,
          concreteType: "Artist",
          plural: true,
          selections: [
            v2,
            {
              kind: "ScalarField",
              alias: null,
              name: "name",
              args: null,
              storageKey: null,
            },
            {
              kind: "ScalarField",
              alias: null,
              name: "formatted_nationality_and_birthday",
              args: null,
              storageKey: null,
            },
            {
              kind: "ScalarField",
              alias: null,
              name: "href",
              args: null,
              storageKey: null,
            },
            {
              kind: "ScalarField",
              alias: null,
              name: "blurb",
              args: null,
              storageKey: null,
            },
            {
              kind: "LinkedField",
              alias: null,
              name: "carousel",
              storageKey: null,
              args: null,
              concreteType: "ArtistCarousel",
              plural: false,
              selections: [
                {
                  kind: "LinkedField",
                  alias: null,
                  name: "images",
                  storageKey: null,
                  args: null,
                  concreteType: "Image",
                  plural: true,
                  selections: [
                    {
                      kind: "LinkedField",
                      alias: null,
                      name: "resized",
                      storageKey: "resized(height:200)",
                      args: [
                        {
                          kind: "Literal",
                          name: "height",
                          value: 200,
                          type: "Int",
                        },
                      ],
                      concreteType: "ResizedImageUrl",
                      plural: false,
                      selections: [
                        {
                          kind: "ScalarField",
                          alias: null,
                          name: "url",
                          args: null,
                          storageKey: null,
                        },
                        {
                          kind: "ScalarField",
                          alias: null,
                          name: "width",
                          args: null,
                          storageKey: null,
                        },
                        {
                          kind: "ScalarField",
                          alias: null,
                          name: "height",
                          args: null,
                          storageKey: null,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              kind: "ScalarField",
              alias: null,
              name: "collections",
              args: null,
              storageKey: null,
            },
            {
              kind: "LinkedField",
              alias: null,
              name: "highlights",
              storageKey: null,
              args: null,
              concreteType: "ArtistHighlights",
              plural: false,
              selections: [
                {
                  kind: "LinkedField",
                  alias: null,
                  name: "partners",
                  storageKey:
                    'partners(display_on_partner_profile:true,first:5,partner_category:["blue-chip","top-established","top-emerging"],represented_by:true)',
                  args: [
                    {
                      kind: "Literal",
                      name: "display_on_partner_profile",
                      value: true,
                      type: "Boolean",
                    },
                    {
                      kind: "Literal",
                      name: "first",
                      value: 5,
                      type: "Int",
                    },
                    {
                      kind: "Literal",
                      name: "partner_category",
                      value: ["blue-chip", "top-established", "top-emerging"],
                      type: "[String]",
                    },
                    {
                      kind: "Literal",
                      name: "represented_by",
                      value: true,
                      type: "Boolean",
                    },
                  ],
                  concreteType: "PartnerArtistConnection",
                  plural: false,
                  selections: [
                    {
                      kind: "LinkedField",
                      alias: null,
                      name: "edges",
                      storageKey: null,
                      args: null,
                      concreteType: "PartnerArtistEdge",
                      plural: true,
                      selections: [
                        {
                          kind: "LinkedField",
                          alias: null,
                          name: "node",
                          storageKey: null,
                          args: null,
                          concreteType: "Partner",
                          plural: false,
                          selections: [
                            {
                              kind: "LinkedField",
                              alias: null,
                              name: "categories",
                              storageKey: null,
                              args: null,
                              concreteType: "Category",
                              plural: true,
                              selections: [v2],
                            },
                            v3,
                          ],
                        },
                        v3,
                      ],
                    },
                  ],
                },
              ],
            },
            {
              kind: "LinkedField",
              alias: null,
              name: "auctionResults",
              storageKey:
                'auctionResults(first:1,recordsTrusted:true,sort:"PRICE_AND_DATE_DESC")',
              args: [
                {
                  kind: "Literal",
                  name: "first",
                  value: 1,
                  type: "Int",
                },
                {
                  kind: "Literal",
                  name: "recordsTrusted",
                  value: true,
                  type: "Boolean",
                },
                {
                  kind: "Literal",
                  name: "sort",
                  value: "PRICE_AND_DATE_DESC",
                  type: "AuctionResultSorts",
                },
              ],
              concreteType: "AuctionResultConnection",
              plural: false,
              selections: [
                {
                  kind: "LinkedField",
                  alias: null,
                  name: "edges",
                  storageKey: null,
                  args: null,
                  concreteType: "AuctionResultEdge",
                  plural: true,
                  selections: [
                    {
                      kind: "LinkedField",
                      alias: null,
                      name: "node",
                      storageKey: null,
                      args: null,
                      concreteType: "AuctionResult",
                      plural: false,
                      selections: [
                        {
                          kind: "LinkedField",
                          alias: null,
                          name: "price_realized",
                          storageKey: null,
                          args: null,
                          concreteType: "AuctionResultPriceRealized",
                          plural: false,
                          selections: [
                            {
                              kind: "ScalarField",
                              alias: null,
                              name: "display",
                              args: null,
                              storageKey: null,
                            },
                          ],
                        },
                        v3,
                      ],
                    },
                  ],
                },
              ],
            },
            v3,
          ],
        },
      ],
    },
  }
})()
;(node as any).hash = "31feb2591c5deb76227613e0e0480b74"
export default node
