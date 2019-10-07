/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type routes_BidQueryVariables = {
    readonly saleID: string;
    readonly artworkID: string;
};
export type routes_BidQueryResponse = {
    readonly artwork: ({
        readonly _id: string;
        readonly id: string;
        readonly title: string | null;
        readonly imageUrl: string | null;
        readonly artistNames: string | null;
        readonly saleArtwork: ({
            readonly _id: string;
            readonly id: string;
            readonly counts: ({
                readonly bidderPositions: any | null;
            }) | null;
            readonly lotLabel: string | null;
            readonly minimumNextBid: ({
                readonly amount: string | null;
                readonly cents: number | null;
                readonly display: string | null;
            }) | null;
            readonly openingBid: ({
                readonly amount: string | null;
                readonly cents: number | null;
                readonly display: string | null;
            }) | null;
            readonly sale: ({
                readonly _id: string;
                readonly id: string;
                readonly name: string | null;
            }) | null;
        }) | null;
    }) | null;
    readonly me: ({
        readonly has_qualified_credit_cards: boolean | null;
        readonly bidders: ReadonlyArray<({
            readonly qualified_for_bidding: boolean | null;
            readonly sale: ({
                readonly name: string | null;
            }) | null;
        }) | null> | null;
    }) | null;
};
export type routes_BidQuery = {
    readonly response: routes_BidQueryResponse;
    readonly variables: routes_BidQueryVariables;
};



/*
query routes_BidQuery(
  $saleID: String!
  $artworkID: String!
) {
  artwork(id: $artworkID) {
    _id
    id
    title
    imageUrl
    artistNames: artist_names
    saleArtwork: sale_artwork(sale_id: $saleID) {
      _id
      id
      counts {
        bidderPositions: bidder_positions
      }
      lotLabel: lot_label
      minimumNextBid: minimum_next_bid {
        amount
        cents
        display
      }
      openingBid: opening_bid {
        amount
        cents
        display
      }
      sale {
        _id
        id
        name
        __id
      }
      __id
    }
    __id
  }
  me {
    has_qualified_credit_cards
    bidders(sale_id: $saleID) {
      qualified_for_bidding
      sale {
        name
        __id
      }
      __id
    }
    __id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "saleID",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "artworkID",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "_id",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = [
  {
    "kind": "Variable",
    "name": "sale_id",
    "variableName": "saleID",
    "type": "String"
  }
],
v4 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "amount",
    "args": null,
    "storageKey": null
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "cents",
    "args": null,
    "storageKey": null
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "display",
    "args": null,
    "storageKey": null
  }
],
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v7 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "artwork",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "artworkID",
        "type": "String!"
      }
    ],
    "concreteType": "Artwork",
    "plural": false,
    "selections": [
      v1,
      v2,
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
        "name": "imageUrl",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": "artistNames",
        "name": "artist_names",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "LinkedField",
        "alias": "saleArtwork",
        "name": "sale_artwork",
        "storageKey": null,
        "args": v3,
        "concreteType": "SaleArtwork",
        "plural": false,
        "selections": [
          v1,
          v2,
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "counts",
            "storageKey": null,
            "args": null,
            "concreteType": "SaleArtworkCounts",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": "bidderPositions",
                "name": "bidder_positions",
                "args": null,
                "storageKey": null
              }
            ]
          },
          {
            "kind": "ScalarField",
            "alias": "lotLabel",
            "name": "lot_label",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": "minimumNextBid",
            "name": "minimum_next_bid",
            "storageKey": null,
            "args": null,
            "concreteType": "SaleArtworkMinimumNextBid",
            "plural": false,
            "selections": v4
          },
          {
            "kind": "LinkedField",
            "alias": "openingBid",
            "name": "opening_bid",
            "storageKey": null,
            "args": null,
            "concreteType": "SaleArtworkOpeningBid",
            "plural": false,
            "selections": v4
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "sale",
            "storageKey": null,
            "args": null,
            "concreteType": "Sale",
            "plural": false,
            "selections": [
              v1,
              v2,
              v5,
              v6
            ]
          },
          v6
        ]
      },
      v6
    ]
  },
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "me",
    "storageKey": null,
    "args": null,
    "concreteType": "Me",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "has_qualified_credit_cards",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "bidders",
        "storageKey": null,
        "args": v3,
        "concreteType": "Bidder",
        "plural": true,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "qualified_for_bidding",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "sale",
            "storageKey": null,
            "args": null,
            "concreteType": "Sale",
            "plural": false,
            "selections": [
              v5,
              v6
            ]
          },
          v6
        ]
      },
      v6
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "routes_BidQuery",
  "id": null,
  "text": "query routes_BidQuery(\n  $saleID: String!\n  $artworkID: String!\n) {\n  artwork(id: $artworkID) {\n    _id\n    id\n    title\n    imageUrl\n    artistNames: artist_names\n    saleArtwork: sale_artwork(sale_id: $saleID) {\n      _id\n      id\n      counts {\n        bidderPositions: bidder_positions\n      }\n      lotLabel: lot_label\n      minimumNextBid: minimum_next_bid {\n        amount\n        cents\n        display\n      }\n      openingBid: opening_bid {\n        amount\n        cents\n        display\n      }\n      sale {\n        _id\n        id\n        name\n        __id\n      }\n      __id\n    }\n    __id\n  }\n  me {\n    has_qualified_credit_cards\n    bidders(sale_id: $saleID) {\n      qualified_for_bidding\n      sale {\n        name\n        __id\n      }\n      __id\n    }\n    __id\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "routes_BidQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v7
  },
  "operation": {
    "kind": "Operation",
    "name": "routes_BidQuery",
    "argumentDefinitions": v0,
    "selections": v7
  }
};
})();
(node as any).hash = '0f482078b7849cbd54104cce83e0d056';
export default node;
