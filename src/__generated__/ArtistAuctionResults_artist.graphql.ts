/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistAuctionResults_artist = {
    readonly slug: string;
    readonly auctionResultsConnection: {
        readonly pageInfo: {
            readonly hasNextPage: boolean;
            readonly endCursor: string | null;
        };
        readonly pageCursors: {
            readonly " $fragmentRefs": FragmentRefs<"Pagination_pageCursors">;
        };
        readonly totalCount: number | null;
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly title: string | null;
                readonly dimension_text: string | null;
                readonly images: {
                    readonly thumbnail: {
                        readonly url: string | null;
                    } | null;
                } | null;
                readonly description: string | null;
                readonly date_text: string | null;
                readonly " $fragmentRefs": FragmentRefs<"ArtistAuctionResultItem_auctionResult">;
            } | null;
        } | null> | null;
        readonly " $fragmentRefs": FragmentRefs<"AuctionResultsCount_results">;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"AuctionResultHeader_results">;
    readonly " $refType": "ArtistAuctionResults_artist";
};
export type ArtistAuctionResults_artist$data = ArtistAuctionResults_artist;
export type ArtistAuctionResults_artist$key = {
    readonly " $data"?: ArtistAuctionResults_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistAuctionResults_artist">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ArtistAuctionResults_artist",
  "type": "Artist",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "sort",
      "type": "AuctionResultSorts",
      "defaultValue": "DATE_DESC"
    },
    {
      "kind": "LocalArgument",
      "name": "first",
      "type": "Int",
      "defaultValue": 10
    },
    {
      "kind": "LocalArgument",
      "name": "last",
      "type": "Int",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "after",
      "type": "String",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "before",
      "type": "String",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "organizations",
      "type": "[String]",
      "defaultValue": null
    }
  ],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "slug",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "auctionResultsConnection",
      "storageKey": null,
      "args": [
        {
          "kind": "Variable",
          "name": "after",
          "variableName": "after"
        },
        {
          "kind": "Variable",
          "name": "before",
          "variableName": "before"
        },
        {
          "kind": "Variable",
          "name": "first",
          "variableName": "first"
        },
        {
          "kind": "Variable",
          "name": "last",
          "variableName": "last"
        },
        {
          "kind": "Variable",
          "name": "organizations",
          "variableName": "organizations"
        },
        {
          "kind": "Variable",
          "name": "sort",
          "variableName": "sort"
        }
      ],
      "concreteType": "AuctionResultConnection",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "pageInfo",
          "storageKey": null,
          "args": null,
          "concreteType": "PageInfo",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "hasNextPage",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "endCursor",
              "args": null,
              "storageKey": null
            }
          ]
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "pageCursors",
          "storageKey": null,
          "args": null,
          "concreteType": "PageCursors",
          "plural": false,
          "selections": [
            {
              "kind": "FragmentSpread",
              "name": "Pagination_pageCursors",
              "args": null
            }
          ]
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "totalCount",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "edges",
          "storageKey": null,
          "args": null,
          "concreteType": "AuctionResultEdge",
          "plural": true,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "node",
              "storageKey": null,
              "args": null,
              "concreteType": "AuctionResult",
              "plural": false,
              "selections": [
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "title",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "ScalarField",
                  "alias": "dimension_text",
                  "name": "dimensionText",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "images",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "AuctionLotImages",
                  "plural": false,
                  "selections": [
                    {
                      "kind": "LinkedField",
                      "alias": null,
                      "name": "thumbnail",
                      "storageKey": null,
                      "args": null,
                      "concreteType": "Image",
                      "plural": false,
                      "selections": [
                        {
                          "kind": "ScalarField",
                          "alias": null,
                          "name": "url",
                          "args": null,
                          "storageKey": null
                        }
                      ]
                    }
                  ]
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "description",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "ScalarField",
                  "alias": "date_text",
                  "name": "dateText",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "FragmentSpread",
                  "name": "ArtistAuctionResultItem_auctionResult",
                  "args": null
                }
              ]
            }
          ]
        },
        {
          "kind": "FragmentSpread",
          "name": "AuctionResultsCount_results",
          "args": null
        }
      ]
    },
    {
      "kind": "FragmentSpread",
      "name": "AuctionResultHeader_results",
      "args": null
    }
  ]
};
(node as any).hash = '7dc5143f0b82602635a7fb21a0c1485d';
export default node;
