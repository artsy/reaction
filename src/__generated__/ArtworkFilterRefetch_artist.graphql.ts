/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { ArtworkFilterArtworkGrid_filtered_artworks$ref } from "./ArtworkFilterArtworkGrid_filtered_artworks.graphql";
declare const _ArtworkFilterRefetch_artist$ref: unique symbol;
export type ArtworkFilterRefetch_artist$ref = typeof _ArtworkFilterRefetch_artist$ref;
export type ArtworkFilterRefetch_artist = {
    readonly __id: string;
    readonly grid: {
        readonly " $fragmentRefs": ArtworkFilterArtworkGrid_filtered_artworks$ref;
    } | null;
    readonly " $refType": ArtworkFilterRefetch_artist$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ArtworkFilterRefetch_artist",
  "type": "Artist",
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
      "name": "inquireable_only",
      "type": "Boolean",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "sort",
      "type": "String",
      "defaultValue": "-decayed_merch"
    },
    {
      "kind": "LocalArgument",
      "name": "offerable",
      "type": "Boolean",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "price_range",
      "type": "String",
      "defaultValue": "*-*"
    },
    {
      "kind": "LocalArgument",
      "name": "page",
      "type": "Int",
      "defaultValue": null
    }
  ],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "__id",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": "grid",
      "name": "filtered_artworks",
      "storageKey": null,
      "args": [
        {
          "kind": "Variable",
          "name": "acquireable",
          "variableName": "acquireable"
        },
        {
          "kind": "Literal",
          "name": "aggregations",
          "value": [
            "TOTAL"
          ]
        },
        {
          "kind": "Variable",
          "name": "at_auction",
          "variableName": "at_auction"
        },
        {
          "kind": "Variable",
          "name": "for_sale",
          "variableName": "for_sale"
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
          "kind": "Literal",
          "name": "size",
          "value": 0
        },
        {
          "kind": "Variable",
          "name": "sort",
          "variableName": "sort"
        }
      ],
      "concreteType": "FilterArtworks",
      "plural": false,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "ArtworkFilterArtworkGrid_filtered_artworks",
          "args": null
        }
      ]
    }
  ]
};
(node as any).hash = 'e8f19166da037c573aa4928e3fcb1194';
export default node;
