/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _SearchBar_viewer$ref: unique symbol;
export type SearchBar_viewer$ref = typeof _SearchBar_viewer$ref;
export type SearchBar_viewer = {
    readonly search?: ({
        readonly edges: ReadonlyArray<({
            readonly node: ({
                readonly displayLabel: string | null;
                readonly href: string | null;
                readonly searchableType?: string | null;
                readonly id?: string;
            }) | null;
        }) | null> | null;
    }) | null;
    readonly " $refType": SearchBar_viewer$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "SearchBar_viewer",
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
      "name": "hasTerm",
      "type": "Boolean!",
      "defaultValue": false
    }
  ],
  "selections": [
    {
      "kind": "Condition",
      "passingValue": true,
      "condition": "hasTerm",
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "search",
          "storageKey": null,
          "args": [
            {
              "kind": "Literal",
              "name": "first",
              "value": 7,
              "type": "Int"
            },
            {
              "kind": "Literal",
              "name": "mode",
              "value": "AUTOSUGGEST",
              "type": "SearchMode"
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
                      "name": "href",
                      "args": null,
                      "storageKey": null
                    },
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
                          "name": "searchableType",
                          "args": null,
                          "storageKey": null
                        },
                        {
                          "kind": "ScalarField",
                          "alias": null,
                          "name": "id",
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
    }
  ]
};
(node as any).hash = 'd5c878b4c5fc01c702d6fe74e63075b9';
export default node;
