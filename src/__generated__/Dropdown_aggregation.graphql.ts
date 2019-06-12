/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
export type ArtworkAggregation = "COLOR" | "DIMENSION_RANGE" | "FOLLOWED_ARTISTS" | "GALLERY" | "INSTITUTION" | "MAJOR_PERIOD" | "MEDIUM" | "MERCHANDISABLE_ARTISTS" | "PARTNER_CITY" | "PERIOD" | "PRICE_RANGE" | "TOTAL" | "%future added value";
declare const _Dropdown_aggregation$ref: unique symbol;
export type Dropdown_aggregation$ref = typeof _Dropdown_aggregation$ref;
export type Dropdown_aggregation = {
    readonly slice: ArtworkAggregation | null;
    readonly counts: ReadonlyArray<{
        readonly name: string | null;
        readonly id: string;
        readonly count: number | null;
    } | null> | null;
    readonly " $refType": Dropdown_aggregation$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "Dropdown_aggregation",
  "type": "ArtworksAggregationResults",
  "metadata": null,
  "argumentDefinitions": [],
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
          "name": "name",
          "args": null,
          "storageKey": null
        },
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
          "name": "count",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
(node as any).hash = '94a2813381cb263e699c9a26e40fcece';
export default node;
