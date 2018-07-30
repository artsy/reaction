/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type RelatedArtistsList_artist = {
    readonly id: string;
    readonly related: ({
        readonly artists: ({
            readonly pageInfo: {
                readonly hasNextPage: boolean;
                readonly endCursor: string | null;
            };
            readonly pageCursors: ({}) | null;
            readonly edges: ReadonlyArray<({
                readonly node: ({}) | null;
            }) | null> | null;
        }) | null;
    }) | null;
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
  "name": "RelatedArtistsList_artist",
  "type": "Artist",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "first",
      "type": "Int",
      "defaultValue": 16
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
      "name": "kind",
      "type": "RelatedArtistsKind",
      "defaultValue": null
    }
  ],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "id",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "related",
      "storageKey": null,
      "args": null,
      "concreteType": "ArtistRelatedData",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "artists",
          "storageKey": null,
          "args": [
            {
              "kind": "Variable",
              "name": "after",
              "variableName": "after",
              "type": "String"
            },
            {
              "kind": "Variable",
              "name": "before",
              "variableName": "before",
              "type": "String"
            },
            {
              "kind": "Variable",
              "name": "first",
              "variableName": "first",
              "type": "Int"
            },
            {
              "kind": "Variable",
              "name": "kind",
              "variableName": "kind",
              "type": "RelatedArtistsKind"
            },
            {
              "kind": "Variable",
              "name": "last",
              "variableName": "last",
              "type": "Int"
            }
          ],
          "concreteType": "ArtistConnection",
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
              "kind": "LinkedField",
              "alias": null,
              "name": "edges",
              "storageKey": null,
              "args": null,
              "concreteType": "ArtistEdge",
              "plural": true,
              "selections": [
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "node",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "Artist",
                  "plural": false,
                  "selections": [
                    {
                      "kind": "FragmentSpread",
                      "name": "ArtistCard_artist",
                      "args": null
                    },
                    v0
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    v0
  ]
};
})();
(node as any).hash = '2731d30ea18089035d7ff40f4fb22e70';
export default node;
