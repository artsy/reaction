/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ArtworkSidebarClassification_artwork$ref } from "./ArtworkSidebarClassification_artwork.graphql";
import { ArtworkSidebarSizeInfo_piece$ref } from "./ArtworkSidebarSizeInfo_piece.graphql";
declare const _PricingContext_artwork$ref: unique symbol;
export type PricingContext_artwork$ref = typeof _PricingContext_artwork$ref;
export type PricingContext_artwork = {
    readonly priceCents: ({
        readonly min: number | null;
    }) | null;
    readonly artists: ReadonlyArray<({
        readonly id: string;
    }) | null> | null;
    readonly dimensions: ({
        readonly cm: string | null;
    }) | null;
    readonly category: string | null;
    readonly pricingContext?: ({
        readonly filterDescription: string;
        readonly bins: ReadonlyArray<{
            readonly maxPrice: string | null;
            readonly maxPriceCents: number;
            readonly minPrice: string | null;
            readonly minPriceCents: number;
            readonly numArtworks: number;
        }>;
    }) | null;
    readonly " $fragmentRefs": ArtworkSidebarSizeInfo_piece$ref & ArtworkSidebarClassification_artwork$ref;
    readonly " $refType": PricingContext_artwork$ref;
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
  "name": "PricingContext_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "enablePricingContext",
      "type": "Boolean"
    }
  ],
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
      "name": "artists",
      "storageKey": null,
      "args": null,
      "concreteType": "Artist",
      "plural": true,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "id",
          "args": null,
          "storageKey": null
        },
        v0
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "dimensions",
      "storageKey": null,
      "args": null,
      "concreteType": "dimensions",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "cm",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "category",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarSizeInfo_piece",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarClassification_artwork",
      "args": null
    },
    v0,
    {
      "kind": "Condition",
      "passingValue": true,
      "condition": "enablePricingContext",
      "selections": [
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
                  "name": "maxPrice",
                  "args": null,
                  "storageKey": null
                },
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
                  "name": "minPrice",
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
        }
      ]
    }
  ]
};
})();
(node as any).hash = 'ccd546a4e86a8a4a4b9e1bc47357ad0f';
export default node;
