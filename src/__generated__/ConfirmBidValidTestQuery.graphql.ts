/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { BidForm_me$ref } from "./BidForm_me.graphql";
import { BidForm_saleArtwork$ref } from "./BidForm_saleArtwork.graphql";
import { LotInfo_artwork$ref } from "./LotInfo_artwork.graphql";
import { LotInfo_saleArtwork$ref } from "./LotInfo_saleArtwork.graphql";
export type ConfirmBidValidTestQueryVariables = {};
export type ConfirmBidValidTestQueryResponse = {
    readonly artwork: ({
        readonly _id: string;
        readonly id: string;
        readonly saleArtwork: ({
            readonly _id: string;
            readonly id: string;
            readonly sale: ({
                readonly registrationStatus: ({
                    readonly id: string;
                    readonly qualified_for_bidding: boolean | null;
                }) | null;
                readonly _id: string;
                readonly id: string;
                readonly name: string | null;
                readonly is_closed: boolean | null;
                readonly is_registration_closed: boolean | null;
            }) | null;
            readonly " $fragmentRefs": LotInfo_saleArtwork$ref & BidForm_saleArtwork$ref;
        }) | null;
        readonly " $fragmentRefs": LotInfo_artwork$ref;
    }) | null;
    readonly me: ({
        readonly id: string;
        readonly has_qualified_credit_cards: boolean | null;
        readonly " $fragmentRefs": BidForm_me$ref;
    }) | null;
};
export type ConfirmBidValidTestQuery = {
    readonly response: ConfirmBidValidTestQueryResponse;
    readonly variables: ConfirmBidValidTestQueryVariables;
};



/*
query ConfirmBidValidTestQuery {
  artwork(id: "artwork-id") {
    ...LotInfo_artwork
    _id
    id
    saleArtwork: sale_artwork(sale_id: "example-auction-id") {
      ...LotInfo_saleArtwork
      ...BidForm_saleArtwork
      _id
      id
      sale {
        registrationStatus {
          id
          qualified_for_bidding
          __id
        }
        _id
        id
        name
        is_closed
        is_registration_closed
        __id
      }
      __id
    }
    __id
  }
  me {
    ...BidForm_me
    id
    has_qualified_credit_cards
    __id
  }
}

fragment LotInfo_artwork on Artwork {
  _id
  date
  title
  imageUrl
  artistNames: artist_names
  __id
}

fragment LotInfo_saleArtwork on SaleArtwork {
  counts {
    bidderPositions: bidder_positions
  }
  lotLabel: lot_label
  minimumNextBid: minimum_next_bid {
    amount
    cents
    display
  }
  __id
}

fragment BidForm_saleArtwork on SaleArtwork {
  minimumNextBid: minimum_next_bid {
    cents
  }
  increments(useMyMaxBid: true) {
    cents
    display
  }
  sale {
    registrationStatus {
      qualifiedForBidding: qualified_for_bidding
      __id
    }
    __id
  }
  __id
}

fragment BidForm_me on Me {
  hasQualifiedCreditCards: has_qualified_credit_cards
  __id
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "artwork-id",
    "type": "String!"
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
    "kind": "Literal",
    "name": "sale_id",
    "value": "example-auction-id",
    "type": "String"
  }
],
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "qualified_for_bidding",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "is_closed",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "is_registration_closed",
  "args": null,
  "storageKey": null
},
v9 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "has_qualified_credit_cards",
  "args": null,
  "storageKey": null
},
v10 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "cents",
  "args": null,
  "storageKey": null
},
v11 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "display",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "ConfirmBidValidTestQuery",
  "id": null,
  "text": "query ConfirmBidValidTestQuery {\n  artwork(id: \"artwork-id\") {\n    ...LotInfo_artwork\n    _id\n    id\n    saleArtwork: sale_artwork(sale_id: \"example-auction-id\") {\n      ...LotInfo_saleArtwork\n      ...BidForm_saleArtwork\n      _id\n      id\n      sale {\n        registrationStatus {\n          id\n          qualified_for_bidding\n          __id\n        }\n        _id\n        id\n        name\n        is_closed\n        is_registration_closed\n        __id\n      }\n      __id\n    }\n    __id\n  }\n  me {\n    ...BidForm_me\n    id\n    has_qualified_credit_cards\n    __id\n  }\n}\n\nfragment LotInfo_artwork on Artwork {\n  _id\n  date\n  title\n  imageUrl\n  artistNames: artist_names\n  __id\n}\n\nfragment LotInfo_saleArtwork on SaleArtwork {\n  counts {\n    bidderPositions: bidder_positions\n  }\n  lotLabel: lot_label\n  minimumNextBid: minimum_next_bid {\n    amount\n    cents\n    display\n  }\n  __id\n}\n\nfragment BidForm_saleArtwork on SaleArtwork {\n  minimumNextBid: minimum_next_bid {\n    cents\n  }\n  increments(useMyMaxBid: true) {\n    cents\n    display\n  }\n  sale {\n    registrationStatus {\n      qualifiedForBidding: qualified_for_bidding\n      __id\n    }\n    __id\n  }\n  __id\n}\n\nfragment BidForm_me on Me {\n  hasQualifiedCreditCards: has_qualified_credit_cards\n  __id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "ConfirmBidValidTestQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"artwork-id\")",
        "args": v0,
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "LotInfo_artwork",
            "args": null
          },
          v1,
          v2,
          {
            "kind": "LinkedField",
            "alias": "saleArtwork",
            "name": "sale_artwork",
            "storageKey": "sale_artwork(sale_id:\"example-auction-id\")",
            "args": v3,
            "concreteType": "SaleArtwork",
            "plural": false,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "LotInfo_saleArtwork",
                "args": null
              },
              {
                "kind": "FragmentSpread",
                "name": "BidForm_saleArtwork",
                "args": null
              },
              v1,
              v2,
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "sale",
                "storageKey": null,
                "args": null,
                "concreteType": "Sale",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "registrationStatus",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Bidder",
                    "plural": false,
                    "selections": [
                      v2,
                      v4,
                      v5
                    ]
                  },
                  v1,
                  v2,
                  v6,
                  v7,
                  v8,
                  v5
                ]
              },
              v5
            ]
          },
          v5
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
            "kind": "FragmentSpread",
            "name": "BidForm_me",
            "args": null
          },
          v2,
          v9,
          v5
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ConfirmBidValidTestQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"artwork-id\")",
        "args": v0,
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          v1,
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "date",
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
          v5,
          v2,
          {
            "kind": "LinkedField",
            "alias": "saleArtwork",
            "name": "sale_artwork",
            "storageKey": "sale_artwork(sale_id:\"example-auction-id\")",
            "args": v3,
            "concreteType": "SaleArtwork",
            "plural": false,
            "selections": [
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
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "amount",
                    "args": null,
                    "storageKey": null
                  },
                  v10,
                  v11
                ]
              },
              v5,
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "increments",
                "storageKey": "increments(useMyMaxBid:true)",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "useMyMaxBid",
                    "value": true,
                    "type": "Boolean"
                  }
                ],
                "concreteType": "BidIncrementsFormatted",
                "plural": true,
                "selections": [
                  v10,
                  v11
                ]
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
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "registrationStatus",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Bidder",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": "qualifiedForBidding",
                        "name": "qualified_for_bidding",
                        "args": null,
                        "storageKey": null
                      },
                      v5,
                      v2,
                      v4
                    ]
                  },
                  v5,
                  v1,
                  v2,
                  v6,
                  v7,
                  v8
                ]
              },
              v1,
              v2
            ]
          }
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
            "alias": "hasQualifiedCreditCards",
            "name": "has_qualified_credit_cards",
            "args": null,
            "storageKey": null
          },
          v5,
          v2,
          v9
        ]
      }
    ]
  }
};
})();
(node as any).hash = 'ad6e68f098a2b2396f392475bbf96e5e';
export default node;
