/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { NavigationTabs_searchableConnection$ref } from "./NavigationTabs_searchableConnection.graphql";
declare const _SearchApp_viewer$ref: unique symbol;
export type SearchApp_viewer$ref = typeof _SearchApp_viewer$ref;
export type SearchApp_viewer = {
    readonly search: ({
        readonly totalCount: number | null;
        readonly edges: ReadonlyArray<({
            readonly node: ({
                readonly id?: string;
                readonly displayLabel?: string | null;
                readonly displayType?: string | null;
            }) | null;
        }) | null> | null;
        readonly " $fragmentRefs": NavigationTabs_searchableConnection$ref;
    }) | null;
    readonly " $refType": SearchApp_viewer$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "SearchApp_viewer",
  "type": "Viewer",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "term",
      "type": "String!",
      "defaultValue": ""
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
          "kind": "Literal",
          "name": "aggregations",
          "value": [
            "TYPE"
          ],
          "type": "[SearchAggregation]"
        },
        {
          "kind": "Literal",
          "name": "first",
          "value": 1,
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
          "kind": "ScalarField",
          "alias": null,
          "name": "totalCount",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "FragmentSpread",
          "name": "NavigationTabs_searchableConnection",
          "args": null
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
                  "name": "__id",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "InlineFragment",
                  "type": "SearchableItem",
                  "selections": [
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "id",
                      "args": null,
                      "storageKey": null
                    },
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
                      "name": "displayType",
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
    }
  ]
};
(node as any).hash = 'f26d9caeace9103dd98b540e94ead020';
export default node;
