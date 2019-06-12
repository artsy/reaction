/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { NavigationTabs_searchableConnection$ref } from "./NavigationTabs_searchableConnection.graphql";
export type SearchAggregation = "TYPE" | "%future added value";
declare const _SearchApp_viewer$ref: unique symbol;
export type SearchApp_viewer$ref = typeof _SearchApp_viewer$ref;
export type SearchApp_viewer = {
    readonly search: {
        readonly aggregations: ReadonlyArray<{
            readonly slice: SearchAggregation | null;
            readonly counts: ReadonlyArray<{
                readonly count: number | null;
                readonly name: string | null;
            } | null> | null;
        } | null> | null;
        readonly edges: ReadonlyArray<{
            readonly node: ({
                readonly id?: string;
                readonly displayLabel?: string | null;
                readonly displayType?: string | null;
            } & ({
                readonly id: string;
                readonly displayLabel: string | null;
                readonly displayType: string | null;
            } | {
                /*This will never be '% other', but we need some
                value in case none of the concrete values match.*/
                readonly __typename: "%other";
            })) | null;
        } | null> | null;
        readonly " $fragmentRefs": NavigationTabs_searchableConnection$ref;
    } | null;
    readonly filter_artworks: {
        readonly counts: {
            readonly total: any | null;
        } | null;
    } | null;
    readonly " $refType": SearchApp_viewer$ref;
};



const node: ReaderFragment = {
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
          ]
        },
        {
          "kind": "Literal",
          "name": "first",
          "value": 1
        },
        {
          "kind": "Variable",
          "name": "query",
          "variableName": "term"
        }
      ],
      "concreteType": "SearchableConnection",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "aggregations",
          "storageKey": null,
          "args": null,
          "concreteType": "SearchAggregationResults",
          "plural": true,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "slice",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "counts",
              "storageKey": null,
              "args": null,
              "concreteType": "AggregationCount",
              "plural": true,
              "selections": [
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "count",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "name",
                  "args": null,
                  "storageKey": null
                }
              ]
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
        },
        {
          "kind": "FragmentSpread",
          "name": "NavigationTabs_searchableConnection",
          "args": null
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "filter_artworks",
      "storageKey": null,
      "args": [
        {
          "kind": "Literal",
          "name": "aggregations",
          "value": [
            "TOTAL"
          ]
        },
        {
          "kind": "Variable",
          "name": "keyword",
          "variableName": "term"
        },
        {
          "kind": "Literal",
          "name": "size",
          "value": 0
        }
      ],
      "concreteType": "FilterArtworks",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "counts",
          "storageKey": null,
          "args": null,
          "concreteType": "FilterArtworksCounts",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "total",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
    }
  ]
};
(node as any).hash = '671536b76e6625d241658d8cf32d9d68';
export default node;
