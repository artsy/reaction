/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ConfirmBidValidTestQueryVariables = {};
export type ConfirmBidValidTestQueryResponse = {
    readonly artwork: {
        readonly internalID: string;
        readonly slug: string;
        readonly saleArtwork: {
            readonly internalID: string;
            readonly slug: string;
            readonly sale: {
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
        readonly internalID: string;
        readonly hasQualifiedCreditCards: boolean | null;
    } | null;
};
export type ConfirmBidValidTestQuery = {
    readonly response: ConfirmBidValidTestQueryResponse;
    readonly variables: ConfirmBidValidTestQueryVariables;
};



/*
query ConfirmBidValidTestQuery {
  artwork(id: "artwork-id") {
    ...LotInfo_artwork
    internalID
    slug
    saleArtwork(saleID: "example-auction-id") {
      ...LotInfo_saleArtwork
      ...BidForm_saleArtwork
      internalID
      slug
      sale {
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
        id
      }
      id
    }
    id
  }
  me {
    internalID
    hasQualifiedCreditCards
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
    "kind": "Literal",
    "name": "id",
    "value": "artwork-id"
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "internalID",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "slug",
  "args": null,
  "storageKey": null
},
v3 = [
  {
    "kind": "Literal",
    "name": "saleID",
    "value": "example-auction-id"
  }
],
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "qualifiedForBidding",
  "args": null,
  "storageKey": null
},
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
  "name": "isClosed",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "isRegistrationClosed",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "hasQualifiedCreditCards",
  "args": null,
  "storageKey": null
},
v9 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "cents",
  "args": null,
  "storageKey": null
},
v10 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "display",
  "args": null,
  "storageKey": null
},
v11 = {
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
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "saleArtwork",
            "storageKey": "saleArtwork(saleID:\"example-auction-id\")",
            "args": (v3/*: any*/),
            "concreteType": "SaleArtwork",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              (v2/*: any*/),
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
                      (v1/*: any*/),
                      (v4/*: any*/)
                    ]
                  },
                  (v1/*: any*/),
                  (v2/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/)
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
          (v1/*: any*/),
          (v8/*: any*/)
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
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          (v1/*: any*/),
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
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "saleArtwork",
            "storageKey": "saleArtwork(saleID:\"example-auction-id\")",
            "args": (v3/*: any*/),
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
                  (v9/*: any*/),
                  (v10/*: any*/)
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
                  (v9/*: any*/),
                  (v10/*: any*/)
                ]
              },
              (v1/*: any*/),
              (v2/*: any*/),
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
                      (v1/*: any*/),
                      (v4/*: any*/),
                      (v11/*: any*/)
                    ]
                  },
                  (v1/*: any*/),
                  (v2/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v11/*: any*/)
                ]
              },
              (v11/*: any*/)
            ]
          },
          (v11/*: any*/)
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
          (v1/*: any*/),
          (v8/*: any*/),
          (v11/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "ConfirmBidValidTestQuery",
    "id": null,
    "text": "query ConfirmBidValidTestQuery {\n  artwork(id: \"artwork-id\") {\n    ...LotInfo_artwork\n    internalID\n    slug\n    saleArtwork(saleID: \"example-auction-id\") {\n      ...LotInfo_saleArtwork\n      ...BidForm_saleArtwork\n      internalID\n      slug\n      sale {\n        registrationStatus {\n          internalID\n          qualifiedForBidding\n          id\n        }\n        internalID\n        slug\n        name\n        isClosed\n        isRegistrationClosed\n        id\n      }\n      id\n    }\n    id\n  }\n  me {\n    internalID\n    hasQualifiedCreditCards\n    id\n  }\n}\n\nfragment LotInfo_artwork on Artwork {\n  internalID\n  date\n  title\n  imageUrl\n  artistNames\n}\n\nfragment LotInfo_saleArtwork on SaleArtwork {\n  counts {\n    bidderPositions\n  }\n  lotLabel\n  minimumNextBid {\n    amount\n    cents\n    display\n  }\n}\n\nfragment BidForm_saleArtwork on SaleArtwork {\n  minimumNextBid {\n    cents\n  }\n  increments(useMyMaxBid: true) {\n    cents\n    display\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'c02e72ce8a056ccff4e7889dd7a7f87e';
export default node;
