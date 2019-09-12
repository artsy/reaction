/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ArtworkFilterArtworkGrid2_filtered_artworks$ref } from "./ArtworkFilterArtworkGrid2_filtered_artworks.graphql";
import { CollectionsHubRails_linkedCollections$ref } from "./CollectionsHubRails_linkedCollections.graphql";
import { Header_artworks$ref } from "./Header_artworks.graphql";
import { RelatedCollectionsRail_collections$ref } from "./RelatedCollectionsRail_collections.graphql";
import { SeoProductsForArtworks_artworks$ref } from "./SeoProductsForArtworks_artworks.graphql";
export type ArtworkAggregation = "COLOR" | "DIMENSION_RANGE" | "FOLLOWED_ARTISTS" | "GALLERY" | "INSTITUTION" | "MAJOR_PERIOD" | "MEDIUM" | "MERCHANDISABLE_ARTISTS" | "PARTNER_CITY" | "PERIOD" | "PRICE_RANGE" | "TOTAL" | "%future added value";
declare const _Collection_viewer$ref: unique symbol;
export type Collection_viewer$ref = typeof _Collection_viewer$ref;
export type Collection_viewer = {
    readonly category: string;
    readonly credit: string | null;
    readonly description: string | null;
    readonly headerImage: string | null;
    readonly id: string;
    readonly slug: string;
    readonly title: string;
    readonly query: {
        readonly artist_ids: ReadonlyArray<string> | null;
        readonly artist_id: string | null;
        readonly gene_id: string | null;
    };
    readonly relatedCollections: ReadonlyArray<{
        readonly " $fragmentRefs": RelatedCollectionsRail_collections$ref;
    }>;
    readonly linkedCollections: ReadonlyArray<{
        readonly " $fragmentRefs": CollectionsHubRails_linkedCollections$ref;
    }>;
    readonly artworks: ({
        readonly aggregations: ReadonlyArray<({
            readonly slice: ArtworkAggregation | null;
            readonly counts: ReadonlyArray<({
                readonly id: string;
                readonly name: string | null;
                readonly count: number | null;
            }) | null> | null;
        }) | null> | null;
        readonly " $fragmentRefs": Header_artworks$ref & SeoProductsForArtworks_artworks$ref;
    }) | null;
    readonly filtered_artworks: ({
        readonly " $fragmentRefs": ArtworkFilterArtworkGrid2_filtered_artworks$ref;
    }) | null;
    readonly " $refType": Collection_viewer$ref;
};



const node: ConcreteFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": "__id",
  "name": "id",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "Collection_viewer",
  "type": "MarketingCollection",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "acquireable",
      "type": "Boolean",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "aggregations",
      "type": "[ArtworkAggregation]",
      "defaultValue": [
        "MERCHANDISABLE_ARTISTS",
        "MEDIUM",
        "MAJOR_PERIOD",
        "TOTAL"
      ]
    },
    {
      "kind": "LocalArgument",
      "name": "at_auction",
      "type": "Boolean",
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
      "name": "major_periods",
      "type": "[String]",
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
      "kind": "ScalarField",
      "alias": null,
      "name": "title",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "category",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "description",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "headerImage",
      "args": null,
      "storageKey": null
    },
    v0,
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "slug",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "credit",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "query",
      "storageKey": null,
      "args": null,
      "concreteType": "MarketingCollectionQuery",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "artist_ids",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "artist_id",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "gene_id",
          "args": null,
          "storageKey": null
        },
        v1
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "relatedCollections",
      "storageKey": null,
      "args": null,
      "concreteType": "MarketingCollection",
      "plural": true,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "RelatedCollectionsRail_collections",
          "args": null
        },
        v1
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "linkedCollections",
      "storageKey": null,
      "args": null,
      "concreteType": "MarketingCollectionGroup",
      "plural": true,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "CollectionsHubRails_linkedCollections",
          "args": null
        }
      ]
    },
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
        },
        {
          "kind": "Literal",
          "name": "size",
          "value": 12,
          "type": "Int"
        },
        {
          "kind": "Literal",
          "name": "sort",
          "value": "-decayed_merch",
          "type": "String"
        }
      ],
      "concreteType": "FilterArtworks",
      "plural": false,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "Header_artworks",
          "args": null
        },
        {
          "kind": "FragmentSpread",
          "name": "SeoProductsForArtworks_artworks",
          "args": null
        },
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
                v0,
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
                v2
              ]
            }
          ]
        },
        v2
      ]
    },
    {
      "kind": "LinkedField",
      "alias": "filtered_artworks",
      "name": "artworks",
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
          "name": "at_auction",
          "variableName": "at_auction",
          "type": "Boolean"
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
          "name": "price_range",
          "variableName": "price_range",
          "type": "String"
        },
        {
          "kind": "Literal",
          "name": "size",
          "value": 0,
          "type": "Int"
        },
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
        v2
      ]
    },
    v1
  ]
};
})();
(node as any).hash = 'b7dd38a3e5ad007e338d304c95eb3463';
export default node;
