/**
 * @generated SignedSource<<349d057f6f76ca854ad74467dbf1711c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type ArtworkSaleMessageQuery$variables = {
  artworkSlug: string;
};
export type ArtworkSaleMessageQueryVariables = ArtworkSaleMessageQuery$variables;
export type ArtworkSaleMessageQuery$data = {
  readonly artwork: {
    readonly saleMessage: string | null;
    readonly sale: {
      readonly isAuction: boolean | null;
      readonly isClosed: boolean | null;
    } | null;
    readonly saleArtwork: {
      readonly counts: {
        readonly bidderPositions: Int | null;
      } | null;
      readonly highestBid: {
        readonly display: string | null;
      } | null;
      readonly openingBid: {
        readonly display: string | null;
      } | null;
    } | null;
  } | null;
};
export type ArtworkSaleMessageQueryResponse = ArtworkSaleMessageQuery$data;
export type ArtworkSaleMessageQuery = {
  variables: ArtworkSaleMessageQueryVariables;
  response: ArtworkSaleMessageQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "artworkSlug"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artworkSlug"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "saleMessage",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isAuction",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isClosed",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "concreteType": "SaleArtworkCounts",
  "kind": "LinkedField",
  "name": "counts",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "bidderPositions",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v6 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "SaleArtworkHighestBid",
  "kind": "LinkedField",
  "name": "highestBid",
  "plural": false,
  "selections": (v6/*: any*/),
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "concreteType": "SaleArtworkOpeningBid",
  "kind": "LinkedField",
  "name": "openingBid",
  "plural": false,
  "selections": (v6/*: any*/),
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtworkSaleMessageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Sale",
            "kind": "LinkedField",
            "name": "sale",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "SaleArtwork",
            "kind": "LinkedField",
            "name": "saleArtwork",
            "plural": false,
            "selections": [
              (v5/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ArtworkSaleMessageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Sale",
            "kind": "LinkedField",
            "name": "sale",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v9/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "SaleArtwork",
            "kind": "LinkedField",
            "name": "saleArtwork",
            "plural": false,
            "selections": [
              (v5/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/)
            ],
            "storageKey": null
          },
          (v9/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "110491d8f0cc9a72ce023b7649228da6",
    "id": null,
    "metadata": {},
    "name": "ArtworkSaleMessageQuery",
    "operationKind": "query",
    "text": "query ArtworkSaleMessageQuery(\n  $artworkSlug: String!\n) {\n  artwork(id: $artworkSlug) {\n    saleMessage\n    sale {\n      isAuction\n      isClosed\n      id\n    }\n    saleArtwork {\n      counts {\n        bidderPositions\n      }\n      highestBid {\n        display\n      }\n      openingBid {\n        display\n      }\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "02a606b1af7ad3c72aa9e7fa4064577b";

export default node;
