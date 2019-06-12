/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { Dropdown_aggregation$ref } from "./Dropdown_aggregation.graphql";
import { Headline_facet$ref } from "./Headline_facet.graphql";
import { TagArtworksContent_filtered_artworks$ref } from "./TagArtworksContent_filtered_artworks.graphql";
import { TotalCount_filter_artworks$ref } from "./TotalCount_filter_artworks.graphql";
export type ArtworkAggregation = "COLOR" | "DIMENSION_RANGE" | "FOLLOWED_ARTISTS" | "GALLERY" | "INSTITUTION" | "MAJOR_PERIOD" | "MEDIUM" | "MERCHANDISABLE_ARTISTS" | "PARTNER_CITY" | "PERIOD" | "PRICE_RANGE" | "TOTAL" | "%future added value";
declare const _TagArtworks_tag$ref: unique symbol;
export type TagArtworks_tag$ref = typeof _TagArtworks_tag$ref;
export type TagArtworks_tag = {
    readonly id: string;
    readonly filtered_artworks: {
        readonly aggregations: ReadonlyArray<{
            readonly slice: ArtworkAggregation | null;
            readonly counts: ReadonlyArray<{
                readonly name: string | null;
                readonly id: string;
            } | null> | null;
            readonly " $fragmentRefs": Dropdown_aggregation$ref;
        } | null> | null;
        readonly facet: {
            readonly " $fragmentRefs": Headline_facet$ref;
        } | null;
        readonly " $fragmentRefs": TotalCount_filter_artworks$ref & TagArtworksContent_filtered_artworks$ref;
    } | null;
    readonly " $refType": TagArtworks_tag$ref;
};



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "TagArtworks_tag",
  "type": "Tag",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "for_sale",
      "type": "Boolean",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "medium",
      "type": "String",
      "defaultValue": "*"
    },
    {
      "kind": "LocalArgument",
      "name": "aggregations",
      "type": "[ArtworkAggregation]",
      "defaultValue": [
        "MEDIUM",
        "TOTAL",
        "PRICE_RANGE",
        "DIMENSION_RANGE"
      ]
    },
    {
      "kind": "LocalArgument",
      "name": "price_range",
      "type": "String",
      "defaultValue": "*"
    },
    {
      "kind": "LocalArgument",
      "name": "dimension_range",
      "type": "String",
      "defaultValue": "*"
    }
  ],
  "selections": [
    (v0/*: any*/),
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "filtered_artworks",
      "storageKey": null,
      "args": [
        {
          "kind": "Variable",
          "name": "aggregations",
          "variableName": "aggregations"
        },
        {
          "kind": "Variable",
          "name": "dimension_range",
          "variableName": "dimension_range"
        },
        {
          "kind": "Variable",
          "name": "for_sale",
          "variableName": "for_sale"
        },
        {
          "kind": "Variable",
          "name": "medium",
          "variableName": "medium"
        },
        {
          "kind": "Variable",
          "name": "price_range",
          "variableName": "price_range"
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
                  "name": "name",
                  "args": null,
                  "storageKey": null
                },
                (v0/*: any*/)
              ]
            },
            {
              "kind": "FragmentSpread",
              "name": "Dropdown_aggregation",
              "args": null
            }
          ]
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "facet",
          "storageKey": null,
          "args": null,
          "concreteType": null,
          "plural": false,
          "selections": [
            {
              "kind": "FragmentSpread",
              "name": "Headline_facet",
              "args": null
            }
          ]
        },
        {
          "kind": "FragmentSpread",
          "name": "TotalCount_filter_artworks",
          "args": null
        },
        {
          "kind": "FragmentSpread",
          "name": "TagArtworksContent_filtered_artworks",
          "args": null
        }
      ]
    }
  ]
};
})();
(node as any).hash = 'e338dce3de7771de5f87d5d3605e6c19';
export default node;
