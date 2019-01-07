/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { CollectionRefetch_collection$ref } from "./CollectionRefetch_collection.graphql";
export type ArtworkAggregation = "COLOR" | "DIMENSION_RANGE" | "FOLLOWED_ARTISTS" | "GALLERY" | "INSTITUTION" | "MAJOR_PERIOD" | "MEDIUM" | "MERCHANDISABLE_ARTISTS" | "PARTNER_CITY" | "PERIOD" | "PRICE_RANGE" | "TOTAL" | "%future added value";
declare const _CollectionFilterContainer_collection$ref: unique symbol;
export type CollectionFilterContainer_collection$ref = typeof _CollectionFilterContainer_collection$ref;
export type CollectionFilterContainer_collection = {
    readonly artworks: ({
        readonly aggregations: ReadonlyArray<({
            readonly slice: ArtworkAggregation | null;
            readonly counts: ReadonlyArray<({
                readonly id: string;
                readonly name: string | null;
                readonly count: number | null;
            }) | null> | null;
        }) | null> | null;
    }) | null;
    readonly " $fragmentRefs": CollectionRefetch_collection$ref;
    readonly " $refType": CollectionFilterContainer_collection$ref;
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
  "name": "CollectionFilterContainer_collection",
  "type": "MarketingCollection",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "aggregations",
      "type": "[ArtworkAggregation]",
      "defaultValue": [
        "MEDIUM",
        "MAJOR_PERIOD",
        "TOTAL"
      ]
    },
    {
      "kind": "LocalArgument",
      "name": "medium",
      "type": "String",
      "defaultValue": "*"
    },
    {
      "kind": "LocalArgument",
      "name": "major_periods",
      "type": "[String]",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "for_sale",
      "type": "Boolean",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "at_auction",
      "type": "Boolean",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "acquireable",
      "type": "Boolean",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "offerable",
      "type": "Boolean",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "inquireable_only",
      "type": "Boolean",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "sort",
      "type": "String",
      "defaultValue": "-partner_updated_at"
    },
    {
      "kind": "LocalArgument",
      "name": "price_range",
      "type": "String",
      "defaultValue": null
    }
  ],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "artworks",
      "storageKey": null,
      "args": [
        {
          "kind": "Variable",
          "name": "aggregations",
          "variableName": "aggregations",
          "type": "[ArtworkAggregation]"
        },
        {
          "kind": "Literal",
          "name": "include_medium_filter_in_aggregation",
          "value": true,
          "type": "Boolean"
        }
      ],
      "concreteType": "FilterArtworks",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "aggregations",
          "storageKey": null,
          "args": null,
          "concreteType": "ArtworksAggregationResults",
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
                  "name": "id",
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
                  "name": "count",
                  "args": null,
                  "storageKey": null
                },
                v0
              ]
            }
          ]
        },
        v0
      ]
    },
    {
      "kind": "FragmentSpread",
      "name": "CollectionRefetch_collection",
      "args": [
        {
          "kind": "Variable",
          "name": "acquireable",
          "variableName": "acquireable",
          "type": null
        },
        {
          "kind": "Variable",
          "name": "at_auction",
          "variableName": "at_auction",
          "type": null
        },
        {
          "kind": "Variable",
          "name": "for_sale",
          "variableName": "for_sale",
          "type": null
        },
        {
          "kind": "Variable",
          "name": "inquireable_only",
          "variableName": "inquireable_only",
          "type": null
        },
        {
          "kind": "Variable",
          "name": "major_periods",
          "variableName": "major_periods",
          "type": null
        },
        {
          "kind": "Variable",
          "name": "medium",
          "variableName": "medium",
          "type": null
        },
        {
          "kind": "Variable",
          "name": "offerable",
          "variableName": "offerable",
          "type": null
        },
        {
          "kind": "Variable",
          "name": "price_range",
          "variableName": "price_range",
          "type": null
        },
        {
          "kind": "Variable",
          "name": "sort",
          "variableName": "sort",
          "type": null
        }
      ]
    },
    {
      "kind": "ScalarField",
      "alias": "__id",
      "name": "id",
      "args": null,
      "storageKey": null
    }
  ]
};
})();
(node as any).hash = '62d2d9d676f68f795b315eeb3af0b26a';
export default node;
