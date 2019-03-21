/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { SearchResultsFilterContainer_viewer$ref } from "./SearchResultsFilterContainer_viewer.graphql";
declare const _SearchResultsArtworks_viewer$ref: unique symbol;
export type SearchResultsArtworks_viewer$ref = typeof _SearchResultsArtworks_viewer$ref;
export type SearchResultsArtworks_viewer = {
    readonly " $fragmentRefs": SearchResultsFilterContainer_viewer$ref;
    readonly " $refType": SearchResultsArtworks_viewer$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "SearchResultsArtworks_viewer",
  "type": "Viewer",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "keyword",
      "type": "String!",
      "defaultValue": ""
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
    }
  ],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "SearchResultsFilterContainer_viewer",
      "args": [
        {
          "kind": "Variable",
          "name": "acquireable",
          "variableName": "acquireable",
          "type": null
        },
        {
          "kind": "Variable",
          "name": "artist_id",
          "variableName": "artist_id",
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
          "name": "attribution_class",
          "variableName": "attribution_class",
          "type": null
        },
        {
          "kind": "Variable",
          "name": "color",
          "variableName": "color",
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
          "name": "height",
          "variableName": "height",
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
          "name": "keyword",
          "variableName": "keyword",
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
          "name": "partner_id",
          "variableName": "partner_id",
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
        },
        {
          "kind": "Variable",
          "name": "width",
          "variableName": "width",
          "type": null
        }
      ]
    }
  ]
};
(node as any).hash = '5c8094420b3578ef13b89361ba7a2fbd';
export default node;
