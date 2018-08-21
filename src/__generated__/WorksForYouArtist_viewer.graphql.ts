/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ArtworkGrid_artworks$ref } from "./ArtworkGrid_artworks.graphql";
declare const _WorksForYouArtist_viewer$ref: unique symbol;
export type WorksForYouArtist_viewer$ref = typeof _WorksForYouArtist_viewer$ref;
export type WorksForYouArtist_viewer = {
    readonly artist: ({
        readonly name: string | null;
        readonly artworks_connection: ({
            readonly pageInfo: {
                readonly hasNextPage: boolean;
                readonly endCursor: string | null;
            };
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly __id: string;
                }) | null;
            }) | null> | null;
            readonly " $fragmentRefs": ArtworkGrid_artworks$ref;
        }) | null;
    }) | null;
    readonly " $refType": WorksForYouArtist_viewer$ref;
};



const node: ConcreteFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "WorksForYouArtist_viewer",
  "type": "Viewer",
  "metadata": {
    "connection": [
      {
        "count": "count",
        "cursor": "cursor",
        "direction": "forward",
        "path": [
          "artist",
          "artworks_connection"
        ]
      }
    ]
  },
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "count",
      "type": "Int",
      "defaultValue": 10
    },
    {
      "kind": "LocalArgument",
      "name": "cursor",
      "type": "String",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "artistID",
      "type": "String!",
      "defaultValue": ""
    },
    {
      "kind": "LocalArgument",
      "name": "filter",
      "type": "[ArtistArtworksFilters]",
      "defaultValue": [
        "IS_FOR_SALE"
      ]
    }
  ],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "artist",
      "storageKey": null,
      "args": [
        {
          "kind": "Variable",
          "name": "id",
          "variableName": "artistID",
          "type": "String!"
        }
      ],
      "concreteType": "Artist",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "name",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "LinkedField",
          "alias": "artworks_connection",
          "name": "__WorksForYouArtist_artworks_connection_connection",
          "storageKey": null,
          "args": [
            {
              "kind": "Variable",
              "name": "filter",
              "variableName": "filter",
              "type": "[ArtistArtworksFilters]"
            },
            {
              "kind": "Literal",
              "name": "sort",
              "value": "published_at_desc",
              "type": "ArtworkSorts"
            }
          ],
          "concreteType": "ArtworkConnection",
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
              "kind": "FragmentSpread",
              "name": "ArtworkGrid_artworks",
              "args": null
            },
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "edges",
              "storageKey": null,
              "args": null,
              "concreteType": "ArtworkEdge",
              "plural": true,
              "selections": [
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "node",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "Artwork",
                  "plural": false,
                  "selections": [
                    v0,
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "__typename",
                      "args": null,
                      "storageKey": null
                    }
                  ]
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "cursor",
                  "args": null,
                  "storageKey": null
                }
              ]
            }
          ]
        },
        v0
      ]
    }
  ]
};
})();
(node as any).hash = 'c9c5bf19aee2ee03dc0e3926ec290ef3';
export default node;
