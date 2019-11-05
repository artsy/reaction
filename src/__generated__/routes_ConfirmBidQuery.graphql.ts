/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type routes_ConfirmBidQueryVariables = {
    saleID: string;
    artworkID: string;
};
export type routes_ConfirmBidQueryResponse = {
    readonly artwork: {
        readonly internalID: string;
        readonly slug: string;
        readonly saleArtwork: {
            readonly internalID: string;
            readonly slug: string;
            readonly sale: {
                readonly registrationStatus: {
                    readonly internalID: string;
                    readonly qualified_for_bidding: boolean | null;
                } | null;
                readonly internalID: string;
                readonly slug: string;
                readonly name: string | null;
                readonly is_closed: boolean | null;
                readonly is_registration_closed: boolean | null;
            } | null;
            readonly " $fragmentRefs": FragmentRefs<"LotInfo_saleArtwork" | "BidForm_saleArtwork">;
        } | null;
        readonly " $fragmentRefs": FragmentRefs<"LotInfo_artwork">;
    } | null;
    readonly me: {
        readonly internalID: string;
        readonly has_qualified_credit_cards: boolean | null;
    } | null;
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
    internalID
    slug
    saleArtwork(saleID: $saleID) {
      ...LotInfo_saleArtwork
      ...BidForm_saleArtwork
      internalID
      slug
      sale {
        registrationStatus {
          internalID
          qualified_for_bidding: qualifiedForBidding
          id
        }
        internalID
        slug
        name
        is_closed: isClosed
        is_registration_closed: isRegistrationClosed
        id
      }
      id
    }
    id
  }
  me {
    internalID
    has_qualified_credit_cards: hasQualifiedCreditCards
    id
  }
}

fragment LotInfo_artwork on Artwork {
  internalID
  date
  title
  imageUrl
  artistNames
}

fragment LotInfo_saleArtwork on SaleArtwork {
  counts {
    bidderPositions
  }
  lotLabel
  minimumNextBid {
    amount
    cents
    display
  }
}

fragment BidForm_saleArtwork on SaleArtwork {
  minimumNextBid {
    cents
  }
  increments(useMyMaxBid: true) {
    cents
    display
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
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artworkID"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "internalID",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "slug",
  "args": null,
  "storageKey": null
},
v4 = [
  {
    "kind": "Variable",
    "name": "saleID",
    "variableName": "saleID"
  }
],
v5 = {
  "kind": "ScalarField",
  "alias": "qualified_for_bidding",
  "name": "qualifiedForBidding",
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
  "alias": "is_closed",
  "name": "isClosed",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": "is_registration_closed",
  "name": "isRegistrationClosed",
  "args": null,
  "storageKey": null
},
v9 = {
  "kind": "ScalarField",
  "alias": "has_qualified_credit_cards",
  "name": "hasQualifiedCreditCards",
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
},
v12 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "routes_ConfirmBidQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "saleArtwork",
            "storageKey": null,
            "args": (v4/*: any*/),
            "concreteType": "SaleArtwork",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
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
                      (v2/*: any*/),
                      (v5/*: any*/)
                    ]
                  },
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/)
                ]
              },
              {
                "kind": "FragmentSpread",
                "name": "LotInfo_saleArtwork",
                "args": null
              },
              {
                "kind": "FragmentSpread",
                "name": "BidForm_saleArtwork",
                "args": null
              }
            ]
          },
          {
            "kind": "FragmentSpread",
            "name": "LotInfo_artwork",
            "args": null
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
          (v2/*: any*/),
          (v9/*: any*/)
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "routes_ConfirmBidQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
            "alias": null,
            "name": "artistNames",
            "args": null,
            "storageKey": null
          },
          (v3/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "saleArtwork",
            "storageKey": null,
            "args": (v4/*: any*/),
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
                    "alias": null,
                    "name": "bidderPositions",
                    "args": null,
                    "storageKey": null
                  }
                ]
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "lotLabel",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "minimumNextBid",
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
                  (v10/*: any*/),
                  (v11/*: any*/)
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "increments",
                "storageKey": "increments(useMyMaxBid:true)",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "useMyMaxBid",
                    "value": true
                  }
                ],
                "concreteType": "BidIncrementsFormatted",
                "plural": true,
                "selections": [
                  (v10/*: any*/),
                  (v11/*: any*/)
                ]
              },
              (v2/*: any*/),
              (v3/*: any*/),
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
                      (v2/*: any*/),
                      (v5/*: any*/),
                      (v12/*: any*/)
                    ]
                  },
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  (v12/*: any*/)
                ]
              },
              (v12/*: any*/)
            ]
          },
          (v12/*: any*/)
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
          (v2/*: any*/),
          (v9/*: any*/),
          (v12/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "routes_ConfirmBidQuery",
    "id": null,
    "text": "query routes_ConfirmBidQuery(\n  $saleID: String!\n  $artworkID: String!\n) {\n  artwork(id: $artworkID) {\n    ...LotInfo_artwork\n    internalID\n    slug\n    saleArtwork(saleID: $saleID) {\n      ...LotInfo_saleArtwork\n      ...BidForm_saleArtwork\n      internalID\n      slug\n      sale {\n        registrationStatus {\n          internalID\n          qualified_for_bidding: qualifiedForBidding\n          id\n        }\n        internalID\n        slug\n        name\n        is_closed: isClosed\n        is_registration_closed: isRegistrationClosed\n        id\n      }\n      id\n    }\n    id\n  }\n  me {\n    internalID\n    has_qualified_credit_cards: hasQualifiedCreditCards\n    id\n  }\n}\n\nfragment LotInfo_artwork on Artwork {\n  internalID\n  date\n  title\n  imageUrl\n  artistNames\n}\n\nfragment LotInfo_saleArtwork on SaleArtwork {\n  counts {\n    bidderPositions\n  }\n  lotLabel\n  minimumNextBid {\n    amount\n    cents\n    display\n  }\n}\n\nfragment BidForm_saleArtwork on SaleArtwork {\n  minimumNextBid {\n    cents\n  }\n  increments(useMyMaxBid: true) {\n    cents\n    display\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '65b98892f65e6ae055143217738376b0';
export default node;
