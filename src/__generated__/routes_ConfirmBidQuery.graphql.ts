/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { BidForm_me$ref } from "./BidForm_me.graphql";
import { BidForm_saleArtwork$ref } from "./BidForm_saleArtwork.graphql";
import { LotInfo_artwork$ref } from "./LotInfo_artwork.graphql";
import { LotInfo_saleArtwork$ref } from "./LotInfo_saleArtwork.graphql";
export type routes_ConfirmBidQueryVariables = {
    readonly saleID: string;
    readonly artworkID: string;
};
export type routes_ConfirmBidQueryResponse = {
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
export type routes_ConfirmBidQuery = {
    readonly response: routes_ConfirmBidQueryResponse;
    readonly variables: routes_ConfirmBidQueryVariables;
};



/*
query routes_ConfirmBidQuery(
  $saleID: String!
  $artworkID: String!
) {
  artwork(id: $artworkID) {
    ...LotInfo_artwork
    _id
    id
    saleArtwork: sale_artwork(sale_id: $saleID) {
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
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artworkID",
    "type": "String!"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "_id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v4 = [
  {
    "kind": "Variable",
    "name": "sale_id",
    "variableName": "saleID",
    "type": "String"
  }
],
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "qualified_for_bidding",
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
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "is_closed",
  "args": null,
  "storageKey": null
},
v9 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "is_registration_closed",
  "args": null,
  "storageKey": null
},
v10 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "has_qualified_credit_cards",
  "args": null,
  "storageKey": null
},
v11 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "cents",
  "args": null,
  "storageKey": null
},
v12 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "display",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "routes_ConfirmBidQuery",
  "id": null,
  "text": "query routes_ConfirmBidQuery(\n  $saleID: String!\n  $artworkID: String!\n) {\n  artwork(id: $artworkID) {\n    ...LotInfo_artwork\n    _id\n    id\n    saleArtwork: sale_artwork(sale_id: $saleID) {\n      ...LotInfo_saleArtwork\n      ...BidForm_saleArtwork\n      _id\n      id\n      sale {\n        registrationStatus {\n          id\n          qualified_for_bidding\n          __id\n        }\n        _id\n        id\n        name\n        is_closed\n        is_registration_closed\n        __id\n      }\n      __id\n    }\n    __id\n  }\n  me {\n    ...BidForm_me\n    id\n    has_qualified_credit_cards\n    __id\n  }\n}\n\nfragment LotInfo_artwork on Artwork {\n  _id\n  date\n  title\n  imageUrl\n  artistNames: artist_names\n  __id\n}\n\nfragment LotInfo_saleArtwork on SaleArtwork {\n  counts {\n    bidderPositions: bidder_positions\n  }\n  lotLabel: lot_label\n  minimumNextBid: minimum_next_bid {\n    amount\n    cents\n    display\n  }\n  __id\n}\n\nfragment BidForm_saleArtwork on SaleArtwork {\n  minimumNextBid: minimum_next_bid {\n    cents\n  }\n  increments(useMyMaxBid: true) {\n    cents\n    display\n  }\n  sale {\n    registrationStatus {\n      qualifiedForBidding: qualified_for_bidding\n      __id\n    }\n    __id\n  }\n  __id\n}\n\nfragment BidForm_me on Me {\n  hasQualifiedCreditCards: has_qualified_credit_cards\n  __id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "routes_ConfirmBidQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": null,
        "args": v1,
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "LotInfo_artwork",
            "args": null
          },
          v2,
          v3,
          {
            "kind": "LinkedField",
            "alias": "saleArtwork",
            "name": "sale_artwork",
            "storageKey": null,
            "args": v4,
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
              v2,
              v3,
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
                      v3,
                      v5,
                      v6
                    ]
                  },
                  v2,
                  v3,
                  v7,
                  v8,
                  v9,
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
            "kind": "FragmentSpread",
            "name": "BidForm_me",
            "args": null
          },
          v3,
          v10,
          v6
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "routes_ConfirmBidQuery",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": null,
        "args": v1,
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          v2,
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
          v6,
          v3,
          {
            "kind": "LinkedField",
            "alias": "saleArtwork",
            "name": "sale_artwork",
            "storageKey": null,
            "args": v4,
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
                  v11,
                  v12
                ]
              },
              v6,
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
                  v11,
                  v12
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
                      v6,
                      v3,
                      v5
                    ]
                  },
                  v6,
                  v2,
                  v3,
                  v7,
                  v8,
                  v9
                ]
              },
              v2,
              v3
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
          v6,
          v3,
          v10
        ]
      }
    ]
  }
};
})();
(node as any).hash = 'd98d9bac49c62c2b73eec0cba15eb1c7';
export default node;
