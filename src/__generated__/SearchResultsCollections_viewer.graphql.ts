/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { Pagination_pageCursors$ref } from "./Pagination_pageCursors.graphql";
declare const _SearchResultsCollections_viewer$ref: unique symbol;
export type SearchResultsCollections_viewer$ref = typeof _SearchResultsCollections_viewer$ref;
export type SearchResultsCollections_viewer = {
    readonly search: ({
        readonly pageInfo: {
            readonly hasNextPage: boolean;
            readonly endCursor: string | null;
        };
        readonly pageCursors: ({
            readonly " $fragmentRefs": Pagination_pageCursors$ref;
        }) | null;
        readonly edges: ReadonlyArray<({
            readonly node: ({
                readonly displayLabel: string | null;
            }) | null;
        }) | null> | null;
    }) | null;
    readonly " $refType": SearchResultsCollections_viewer$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "SearchResultsCollections_viewer",
  "type": "Viewer",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "term",
      "type": "String!",
      "defaultValue": ""
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
    }
  ],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "search",
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
          "kind": "Literal",
          "name": "entities",
          "value": [
            "COLLECTION"
          ],
          "type": "[SearchEntity]"
        },
        {
          "kind": "Variable",
          "name": "first",
          "variableName": "first",
          "type": "Int"
        },
        {
          "kind": "Variable",
          "name": "last",
          "variableName": "last",
          "type": "Int"
        },
        {
          "kind": "Variable",
          "name": "query",
          "variableName": "term",
          "type": "String!"
        }
      ],
      "concreteType": "SearchableConnection",
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
          "concreteType": "SearchableEdge",
          "plural": true,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "node",
              "storageKey": null,
              "args": null,
              "concreteType": null,
              "plural": false,
              "selections": [
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "displayLabel",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "__id",
                  "args": null,
                  "storageKey": null
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
(node as any).hash = '067f0fe12df1f0e94af9092dd10f5aeb';
export default node;
