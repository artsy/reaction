/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type routes_ConfirmBidQueryVariables = {
    saleID: string;
    artworkID: string;
};
export type routes_ConfirmBidQueryResponse = {
    readonly artwork: {
        readonly id: string;
        readonly internalID: string;
        readonly slug: string;
        readonly saleArtwork: {
            readonly id: string;
            readonly internalID: string;
            readonly slug: string;
            readonly sale: {
                readonly id: string;
                readonly registrationStatus: {
                    readonly internalID: string;
                    readonly qualifiedForBidding: boolean | null;
                } | null;
                readonly internalID: string;
                readonly slug: string;
                readonly name: string | null;
                readonly isClosed: boolean | null;
                readonly isRegistrationClosed: boolean | null;
            } | null;
            readonly " $fragmentRefs": FragmentRefs<"LotInfo_saleArtwork" | "BidForm_saleArtwork">;
        } | null;
        readonly " $fragmentRefs": FragmentRefs<"LotInfo_artwork">;
    } | null;
    readonly me: {
        readonly id: string;
        readonly internalID: string;
        readonly hasQualifiedCreditCards: boolean | null;
    } | null;
};
export type routes_ConfirmBidQueryRawResponse = {
    readonly artwork: ({
        readonly internalID: string;
        readonly date: string | null;
        readonly title: string | null;
        readonly imageUrl: string | null;
        readonly artistNames: string | null;
        readonly id: string;
        readonly slug: string;
        readonly saleArtwork: ({
            readonly counts: ({
                readonly bidderPositions: number | null;
            }) | null;
            readonly lotLabel: string | null;
            readonly minimumNextBid: ({
                readonly amount: string | null;
                readonly cents: number | null;
                readonly display: string | null;
            }) | null;
            readonly increments: ReadonlyArray<({
                readonly cents: number | null;
                readonly display: string | null;
            }) | null> | null;
            readonly id: string;
            readonly internalID: string;
            readonly slug: string;
            readonly sale: ({
                readonly id: string;
                readonly registrationStatus: ({
                    readonly internalID: string;
                    readonly qualifiedForBidding: boolean | null;
                    readonly id: string | null;
                }) | null;
                readonly internalID: string;
                readonly slug: string;
                readonly name: string | null;
                readonly isClosed: boolean | null;
                readonly isRegistrationClosed: boolean | null;
            }) | null;
        }) | null;
    }) | null;
    readonly me: ({
        readonly id: string;
        readonly internalID: string;
        readonly hasQualifiedCreditCards: boolean | null;
    }) | null;
};
export type routes_ConfirmBidQuery = {
    readonly response: routes_ConfirmBidQueryResponse;
    readonly variables: routes_ConfirmBidQueryVariables;
    readonly rawResponse: routes_ConfirmBidQueryRawResponse;
};



/*
query routes_ConfirmBidQuery(
  $saleID: String!
  $artworkID: String!
) {
  artwork(id: $artworkID) {
    ...LotInfo_artwork
    id
    internalID
    slug
    saleArtwork(saleID: $saleID) {
      ...LotInfo_saleArtwork
      ...BidForm_saleArtwork
      id
      internalID
      slug
      sale {
        id
        registrationStatus {
          internalID
          qualifiedForBidding
          id
        }
        internalID
        slug
        name
        isClosed
        isRegistrationClosed
      }
    }
  }
  me {
    id
    internalID
    hasQualifiedCreditCards
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
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "internalID",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "slug",
  "args": null,
  "storageKey": null
},
v5 = [
  {
    "kind": "Variable",
    "name": "saleID",
    "variableName": "saleID"
  }
],
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "qualifiedForBidding",
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
  "name": "isClosed",
  "args": null,
  "storageKey": null
},
v9 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "isRegistrationClosed",
  "args": null,
  "storageKey": null
},
v10 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "me",
  "storageKey": null,
  "args": null,
  "concreteType": "Me",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    (v3/*: any*/),
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "hasQualifiedCreditCards",
      "args": null,
      "storageKey": null
    }
  ]
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
          (v4/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "saleArtwork",
            "storageKey": null,
            "args": (v5/*: any*/),
            "concreteType": "SaleArtwork",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "sale",
                "storageKey": null,
                "args": null,
                "concreteType": "Sale",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "registrationStatus",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Bidder",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      (v6/*: any*/)
                    ]
                  },
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/)
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
      (v10/*: any*/)
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
          (v3/*: any*/),
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
          (v2/*: any*/),
          (v4/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "saleArtwork",
            "storageKey": null,
            "args": (v5/*: any*/),
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
                  (v11/*: any*/),
                  (v12/*: any*/)
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
                  (v11/*: any*/),
                  (v12/*: any*/)
                ]
              },
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "sale",
                "storageKey": null,
                "args": null,
                "concreteType": "Sale",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "registrationStatus",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Bidder",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      (v6/*: any*/),
                      (v2/*: any*/)
                    ]
                  },
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/)
                ]
              }
            ]
          }
        ]
      },
      (v10/*: any*/)
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "routes_ConfirmBidQuery",
    "id": null,
    "text": "query routes_ConfirmBidQuery(\n  $saleID: String!\n  $artworkID: String!\n) {\n  artwork(id: $artworkID) {\n    ...LotInfo_artwork\n    id\n    internalID\n    slug\n    saleArtwork(saleID: $saleID) {\n      ...LotInfo_saleArtwork\n      ...BidForm_saleArtwork\n      id\n      internalID\n      slug\n      sale {\n        id\n        registrationStatus {\n          internalID\n          qualifiedForBidding\n          id\n        }\n        internalID\n        slug\n        name\n        isClosed\n        isRegistrationClosed\n      }\n    }\n  }\n  me {\n    id\n    internalID\n    hasQualifiedCreditCards\n  }\n}\n\nfragment BidForm_saleArtwork on SaleArtwork {\n  minimumNextBid {\n    cents\n  }\n  increments(useMyMaxBid: true) {\n    cents\n    display\n  }\n}\n\nfragment LotInfo_artwork on Artwork {\n  internalID\n  date\n  title\n  imageUrl\n  artistNames\n}\n\nfragment LotInfo_saleArtwork on SaleArtwork {\n  counts {\n    bidderPositions\n  }\n  lotLabel\n  minimumNextBid {\n    amount\n    cents\n    display\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'f5270b1663262ae28c6dd19035b6b258';
export default node;
