/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type ArtworkSaleMessageQueryVariables = {
    artworkSlug: string;
};
export type ArtworkSaleMessageQueryResponse = {
    readonly artwork: {
        readonly saleMessage: string | null;
        readonly sale: {
            readonly isAuction: boolean | null;
            readonly isClosed: boolean | null;
        } | null;
        readonly saleArtwork: {
            readonly counts: {
                readonly bidderPositions: number | null;
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
export type ArtworkSaleMessageQuery = {
    readonly response: ArtworkSaleMessageQueryResponse;
    readonly variables: ArtworkSaleMessageQueryVariables;
};



/*
query ArtworkSaleMessageQuery(
  $artworkSlug: String!
) {
  artwork(id: $artworkSlug) {
    saleMessage
    sale {
      isAuction
      isClosed
      id
    }
    saleArtwork {
      counts {
        bidderPositions
      }
      highestBid {
        display
      }
      openingBid {
        display
      }
      id
    }
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "artworkSlug",
    "type": "String!"
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
    "type": "Query"
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
    "id": null,
    "metadata": {},
    "name": "ArtworkSaleMessageQuery",
    "operationKind": "query",
    "text": "query ArtworkSaleMessageQuery(\n  $artworkSlug: String!\n) {\n  artwork(id: $artworkSlug) {\n    saleMessage\n    sale {\n      isAuction\n      isClosed\n      id\n    }\n    saleArtwork {\n      counts {\n        bidderPositions\n      }\n      highestBid {\n        display\n      }\n      openingBid {\n        display\n      }\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '46be897dd7a9af62e73a4f1b0ea895a9';
export default node;
