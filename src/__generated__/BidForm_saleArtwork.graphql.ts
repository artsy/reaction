/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _BidForm_saleArtwork$ref: unique symbol;
export type BidForm_saleArtwork$ref = typeof _BidForm_saleArtwork$ref;
export type BidForm_saleArtwork = {
    readonly minimumNextBid: ({
        readonly cents: number | null;
    }) | null;
    readonly increments: ReadonlyArray<({
        readonly cents: number | null;
        readonly display: string | null;
    }) | null> | null;
    readonly sale: ({
        readonly registrationStatus: ({
            readonly qualifiedForBidding: boolean | null;
        }) | null;
    }) | null;
    readonly " $refType": BidForm_saleArtwork$ref;
};



const node: ConcreteFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "cents",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "BidForm_saleArtwork",
  "type": "SaleArtwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": "minimumNextBid",
      "name": "minimum_next_bid",
      "storageKey": null,
      "args": null,
      "concreteType": "SaleArtworkMinimumNextBid",
      "plural": false,
      "selections": [
        v0
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
          "value": true,
          "type": "Boolean"
        }
      ],
      "concreteType": "BidIncrementsFormatted",
      "plural": true,
      "selections": [
        v0,
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "display",
          "args": null,
          "storageKey": null
        }
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
            v1
          ]
        },
        v1
      ]
    },
    v1
  ]
};
})();
(node as any).hash = '2b29986a93e0cc4abb6c031f75b05cd1';
export default node;
