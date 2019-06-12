/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { CollectFilterContainer_viewer$ref } from "./CollectFilterContainer_viewer.graphql";
import { SeoProductsForArtworks_artworks$ref } from "./SeoProductsForArtworks_artworks.graphql";
declare const _CollectApp_viewer$ref: unique symbol;
export type CollectApp_viewer$ref = typeof _CollectApp_viewer$ref;
export type CollectApp_viewer = {
    readonly filter_artworks: {
        readonly " $fragmentRefs": SeoProductsForArtworks_artworks$ref;
    } | null;
    readonly " $fragmentRefs": CollectFilterContainer_viewer$ref;
    readonly " $refType": CollectApp_viewer$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "CollectApp_viewer",
  "type": "Viewer",
  "metadata": null,
  "argumentDefinitions": [
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
      "name": "partner_id",
      "type": "ID",
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
      "name": "aggregations",
      "type": "[ArtworkAggregation]",
      "defaultValue": [
        "MEDIUM",
        "TOTAL"
      ]
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
    },
    {
      "kind": "LocalArgument",
      "name": "height",
      "type": "String",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "width",
      "type": "String",
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
      "name": "attribution_class",
      "type": "String",
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
      "name": "page",
      "type": "Int",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "dimension_range",
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
          "variableName": "aggregations"
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
          "kind": "FragmentSpread",
          "name": "SeoProductsForArtworks_artworks",
          "args": null
        }
      ]
    },
    {
      "kind": "FragmentSpread",
      "name": "CollectFilterContainer_viewer",
      "args": [
        {
          "kind": "Variable",
          "name": "acquireable",
          "variableName": "acquireable"
        },
        {
          "kind": "Variable",
          "name": "artist_id",
          "variableName": "artist_id"
        },
        {
          "kind": "Variable",
          "name": "at_auction",
          "variableName": "at_auction"
        },
        {
          "kind": "Variable",
          "name": "attribution_class",
          "variableName": "attribution_class"
        },
        {
          "kind": "Variable",
          "name": "color",
          "variableName": "color"
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
          "name": "height",
          "variableName": "height"
        },
        {
          "kind": "Variable",
          "name": "inquireable_only",
          "variableName": "inquireable_only"
        },
        {
          "kind": "Variable",
          "name": "major_periods",
          "variableName": "major_periods"
        },
        {
          "kind": "Variable",
          "name": "medium",
          "variableName": "medium"
        },
        {
          "kind": "Variable",
          "name": "offerable",
          "variableName": "offerable"
        },
        {
          "kind": "Variable",
          "name": "page",
          "variableName": "page"
        },
        {
          "kind": "Variable",
          "name": "partner_id",
          "variableName": "partner_id"
        },
        {
          "kind": "Variable",
          "name": "price_range",
          "variableName": "price_range"
        },
        {
          "kind": "Variable",
          "name": "sort",
          "variableName": "sort"
        },
        {
          "kind": "Variable",
          "name": "width",
          "variableName": "width"
        }
      ]
    }
  ]
};
(node as any).hash = '3bd6b91bb3994bb1fdc300d654a3a602';
export default node;
