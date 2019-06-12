/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { CollectionFilterContainer_collection$ref } from "./CollectionFilterContainer_collection.graphql";
import { Header_artworks$ref } from "./Header_artworks.graphql";
import { SeoProductsForArtworks_artworks$ref } from "./SeoProductsForArtworks_artworks.graphql";
declare const _CollectionApp_collection$ref: unique symbol;
export type CollectionApp_collection$ref = typeof _CollectionApp_collection$ref;
export type CollectionApp_collection = {
    readonly id: string;
    readonly slug: string;
    readonly title: string;
    readonly description: string | null;
    readonly headerImage: string | null;
    readonly category: string;
    readonly credit: string | null;
    readonly query: {
        readonly artist_ids: ReadonlyArray<string> | null;
        readonly artist_id: string | null;
        readonly gene_id: string | null;
    };
    readonly artworks: {
        readonly " $fragmentRefs": Header_artworks$ref & SeoProductsForArtworks_artworks$ref;
    } | null;
    readonly " $fragmentRefs": CollectionFilterContainer_collection$ref;
    readonly " $refType": CollectionApp_collection$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "CollectionApp_collection",
  "type": "MarketingCollection",
  "metadata": null,
  "argumentDefinitions": [
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
      "name": "color",
      "type": "String",
      "defaultValue": null
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
      "name": "id",
      "args": null,
      "storageKey": null
    },
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
      "name": "title",
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
          "variableName": "aggregations"
        },
        {
          "kind": "Literal",
          "name": "include_medium_filter_in_aggregation",
          "value": true
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
        }
      ]
    },
    {
      "kind": "FragmentSpread",
      "name": "CollectionFilterContainer_collection",
      "args": [
        {
          "kind": "Variable",
          "name": "acquireable",
          "variableName": "acquireable"
        },
        {
          "kind": "Variable",
          "name": "at_auction",
          "variableName": "at_auction"
        },
        {
          "kind": "Variable",
          "name": "color",
          "variableName": "color"
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
(node as any).hash = '25467f46cd5b9dc0cec17ed9b0218272';
export default node;
