/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type SearchAggregation = "TYPE" | "%future added value";
declare const _NavigationTabs_searchableConnection$ref: unique symbol;
export type NavigationTabs_searchableConnection$ref = typeof _NavigationTabs_searchableConnection$ref;
export type NavigationTabs_searchableConnection = {
    readonly aggregations: ReadonlyArray<({
        readonly slice: SearchAggregation | null;
        readonly counts: ReadonlyArray<({
            readonly count: number | null;
            readonly name: string | null;
        }) | null> | null;
    }) | null> | null;
    readonly " $refType": NavigationTabs_searchableConnection$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "NavigationTabs_searchableConnection",
  "type": "SearchableConnection",
  "metadata": null,
  "argumentDefinitions": [],
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
};
(node as any).hash = '76f1af5fa568892ae22f4ba4840ff358';
export default node;
