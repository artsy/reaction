/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _SuggestionsSearch_viewer$ref: unique symbol;
export type SuggestionsSearch_viewer$ref = typeof _SuggestionsSearch_viewer$ref;
export type SuggestionsSearch_viewer = {
    readonly search: ({
        readonly edges: ReadonlyArray<({
            readonly node: ({
                readonly displayLabel: string | null;
                readonly href: string | null;
                readonly searchableType?: string | null;
            }) | null;
        }) | null> | null;
    }) | null;
    readonly " $refType": SuggestionsSearch_viewer$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "SuggestionsSearch_viewer",
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
          "name": "first",
          "value": 5,
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
(node as any).hash = '6a778e464a7027583659259597cce94e';
export default node;
