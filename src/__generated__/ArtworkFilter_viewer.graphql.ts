/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ArtworkFilterArtworkGrid2_filtered_artworks$ref } from "./ArtworkFilterArtworkGrid2_filtered_artworks.graphql";
export type ArtworkAggregation = "COLOR" | "DIMENSION_RANGE" | "FOLLOWED_ARTISTS" | "GALLERY" | "INSTITUTION" | "MAJOR_PERIOD" | "MEDIUM" | "MERCHANDISABLE_ARTISTS" | "PARTNER_CITY" | "PERIOD" | "PRICE_RANGE" | "TOTAL" | "%future added value";
declare const _ArtworkFilter_viewer$ref: unique symbol;
export type ArtworkFilter_viewer$ref = typeof _ArtworkFilter_viewer$ref;
export type ArtworkFilter_viewer = {
    readonly filter_artworks: ({
        readonly aggregations: ReadonlyArray<({
            readonly slice: ArtworkAggregation | null;
            readonly counts: ReadonlyArray<({
                readonly name: string | null;
                readonly id: string;
            }) | null> | null;
        }) | null> | null;
    }) | null;
    readonly filtered_artworks: ({
        readonly " $fragmentRefs": ArtworkFilterArtworkGrid2_filtered_artworks$ref;
    }) | null;
    readonly " $refType": ArtworkFilter_viewer$ref;
};



const node: ConcreteFragment = (function(){
var v0 = {
  "kind": "Literal",
  "name": "size",
  "value": 0,
  "type": "Int"
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "ArtworkFilter_viewer",
  "type": "Viewer",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "aggregations",
      "type": "[ArtworkAggregation]",
      "defaultValue": [
        "MEDIUM",
        "TOTAL"
      ]
    },
    {
      "kind": "LocalArgument",
      "name": "acquireable",
      "type": "Boolean",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "artist_id",
      "type": "String",
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
      "name": "attribution_class",
      "type": "[String]",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "color",
      "type": "String",
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
      "name": "height",
      "type": "String",
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
      "name": "keyword",
      "type": "String!",
      "defaultValue": ""
    },
    {
      "kind": "LocalArgument",
      "name": "major_periods",
      "type": "[String]",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "medium",
      "type": "String",
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
      "name": "page",
      "type": "Int",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "partner_id",
      "type": "ID",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "price_range",
      "type": "String",
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
      "name": "width",
      "type": "String",
      "defaultValue": null
    }
  ],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "filter_artworks",
      "storageKey": null,
      "args": [
        {
          "kind": "Variable",
          "name": "aggregations",
          "variableName": "aggregations",
          "type": "[ArtworkAggregation]"
        },
        v0
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
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "id",
                  "args": null,
                  "storageKey": null
                },
                v1
              ]
            }
          ]
        },
        v1
      ]
    },
    {
      "kind": "LinkedField",
      "alias": "filtered_artworks",
      "name": "filter_artworks",
      "storageKey": null,
      "args": [
        {
          "kind": "Variable",
          "name": "acquireable",
          "variableName": "acquireable",
          "type": "Boolean"
        },
        {
          "kind": "Literal",
          "name": "aggregations",
          "value": [
            "TOTAL"
          ],
          "type": "[ArtworkAggregation]"
        },
        {
          "kind": "Variable",
          "name": "artist_id",
          "variableName": "artist_id",
          "type": "String"
        },
        {
          "kind": "Variable",
          "name": "at_auction",
          "variableName": "at_auction",
          "type": "Boolean"
        },
        {
          "kind": "Variable",
          "name": "attribution_class",
          "variableName": "attribution_class",
          "type": "[String]"
        },
        {
          "kind": "Variable",
          "name": "color",
          "variableName": "color",
          "type": "String"
        },
        {
          "kind": "Variable",
          "name": "for_sale",
          "variableName": "for_sale",
          "type": "Boolean"
        },
        {
          "kind": "Variable",
          "name": "height",
          "variableName": "height",
          "type": "String"
        },
        {
          "kind": "Variable",
          "name": "inquireable_only",
          "variableName": "inquireable_only",
          "type": "Boolean"
        },
        {
          "kind": "Variable",
          "name": "keyword",
          "variableName": "keyword",
          "type": "String"
        },
        {
          "kind": "Variable",
          "name": "major_periods",
          "variableName": "major_periods",
          "type": "[String]"
        },
        {
          "kind": "Variable",
          "name": "medium",
          "variableName": "medium",
          "type": "String"
        },
        {
          "kind": "Variable",
          "name": "offerable",
          "variableName": "offerable",
          "type": "Boolean"
        },
        {
          "kind": "Variable",
          "name": "page",
          "variableName": "page",
          "type": "Int"
        },
        {
          "kind": "Variable",
          "name": "partner_id",
          "variableName": "partner_id",
          "type": "ID"
        },
        {
          "kind": "Variable",
          "name": "price_range",
          "variableName": "price_range",
          "type": "String"
        },
        v0,
        {
          "kind": "Variable",
          "name": "sort",
          "variableName": "sort",
          "type": "String"
        },
        {
          "kind": "Variable",
          "name": "width",
          "variableName": "width",
          "type": "String"
        }
      ],
      "concreteType": "FilterArtworks",
      "plural": false,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "ArtworkFilterArtworkGrid2_filtered_artworks",
          "args": null
        },
        v1
      ]
    }
  ]
};
})();
(node as any).hash = '58c18a92fab06059404f33933ddc517b';
export default node;
