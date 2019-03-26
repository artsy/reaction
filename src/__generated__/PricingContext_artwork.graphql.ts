/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _PricingContext_artwork$ref: unique symbol;
export type PricingContext_artwork$ref = typeof _PricingContext_artwork$ref;
export type PricingContext_artwork = {
    readonly priceCents: ({
        readonly min: number | null;
    }) | null;
    readonly pricingContext: ({
        readonly filterDescription: string;
        readonly bins: ReadonlyArray<{
            readonly maxPriceCents: number;
            readonly minPriceCents: number;
            readonly numArtworks: number;
        }>;
    }) | null;
    readonly " $refType": PricingContext_artwork$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "PricingContext_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "priceCents",
      "storageKey": null,
      "args": null,
      "concreteType": "PriceCents",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "min",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "pricingContext",
      "storageKey": null,
      "args": null,
      "concreteType": "AnalyticsPricingContext",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "filterDescription",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "bins",
          "storageKey": null,
          "args": null,
          "concreteType": "AnalyticsHistogramBin",
          "plural": true,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "maxPriceCents",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "minPriceCents",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "numArtworks",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "__id",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '5f107eb659ec5c7547bfe1097a56ca6d';
export default node;
