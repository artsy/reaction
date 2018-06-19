/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type Artworks_filtered_artworks = {
    readonly __id: string;
    readonly artworks: ({
        readonly pageInfo: {
            readonly hasNextPage: boolean;
            readonly endCursor: string | null;
        };
        readonly pageCursors: ({
            readonly around: ReadonlyArray<{
                readonly cursor: string;
                readonly page: number;
                readonly isCurrent: boolean;
            }>;
            readonly first: ({
                readonly cursor: string;
                readonly page: number;
                readonly isCurrent: boolean;
            }) | null;
            readonly last: ({
                readonly cursor: string;
                readonly page: number;
                readonly isCurrent: boolean;
            }) | null;
        }) | null;
        readonly edges: ReadonlyArray<({
            readonly node: ({
                readonly __id: string;
            }) | null;
        }) | null> | null;
    }) | null;
};



const node: ConcreteFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v1 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "cursor",
    "args": null,
    "storageKey": null
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "page",
    "args": null,
    "storageKey": null
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "isCurrent",
    "args": null,
    "storageKey": null
  }
];
return {
  "kind": "Fragment",
  "name": "Artworks_filtered_artworks",
  "type": "FilterArtworks",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "first",
      "type": "Int",
      "defaultValue": 10
    },
    {
      "kind": "LocalArgument",
      "name": "after",
      "type": "String",
      "defaultValue": ""
    }
  ],
  "selections": [
    v0,
    {
      "kind": "LinkedField",
      "alias": "artworks",
      "name": "artworks_connection",
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
          "name": "first",
          "variableName": "first",
          "type": "Int"
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
          "kind": "LinkedField",
          "alias": null,
          "name": "pageCursors",
          "storageKey": null,
          "args": null,
          "concreteType": "PageCursors",
          "plural": false,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "around",
              "storageKey": null,
              "args": null,
              "concreteType": "PageCursor",
              "plural": true,
              "selections": v1
            },
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "first",
              "storageKey": null,
              "args": null,
              "concreteType": "PageCursor",
              "plural": false,
              "selections": v1
            },
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "last",
              "storageKey": null,
              "args": null,
              "concreteType": "PageCursor",
              "plural": false,
              "selections": v1
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
                v0
              ]
            }
          ]
        }
      ]
    }
  ]
};
})();
(node as any).hash = '94cfa97000cde16ce76ce1cb64ad74fa';
export default node;
