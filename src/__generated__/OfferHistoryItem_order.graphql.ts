/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type OrderParticipantEnum = "BUYER" | "SELLER" | "%future added value";
declare const _OfferHistoryItem_order$ref: unique symbol;
export type OfferHistoryItem_order$ref = typeof _OfferHistoryItem_order$ref;
export type OfferHistoryItem_order = {
    readonly offers: ({
        readonly edges: ReadonlyArray<({
            readonly node: ({
                readonly id: string | null;
                readonly amount: string | null;
                readonly createdAt: string | null;
                readonly fromParticipant: OrderParticipantEnum | null;
            }) | null;
        }) | null> | null;
    }) | null;
    readonly lastOffer: ({
        readonly id: string | null;
        readonly fromParticipant: OrderParticipantEnum | null;
        readonly amount: string | null;
        readonly shippingTotal: string | null;
        readonly taxTotal: string | null;
    }) | null;
    readonly totalListPrice: string | null;
    readonly " $refType": OfferHistoryItem_order$ref;
};



const node: ConcreteFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v1 = [
  {
    "kind": "Literal",
    "name": "precision",
    "value": 2,
    "type": "Int"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "amount",
  "args": v1,
  "storageKey": "amount(precision:2)"
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "fromParticipant",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": "__id",
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "OfferHistoryItem_order",
  "type": "Order",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "offers",
      "storageKey": null,
      "args": null,
      "concreteType": "OfferConnection",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "edges",
          "storageKey": null,
          "args": null,
          "concreteType": "OfferEdge",
          "plural": true,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "node",
              "storageKey": null,
              "args": null,
              "concreteType": "Offer",
              "plural": false,
              "selections": [
                v0,
                v2,
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "createdAt",
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "format",
                      "value": "MMM D",
                      "type": "String"
                    }
                  ],
                  "storageKey": "createdAt(format:\"MMM D\")"
                },
                v3,
                v4
              ]
            }
          ]
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "lastOffer",
      "storageKey": null,
      "args": null,
      "concreteType": "Offer",
      "plural": false,
      "selections": [
        v0,
        v3,
        v2,
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "shippingTotal",
          "args": v1,
          "storageKey": "shippingTotal(precision:2)"
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "taxTotal",
          "args": v1,
          "storageKey": "taxTotal(precision:2)"
        },
        v4
      ]
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "totalListPrice",
      "args": v1,
      "storageKey": "totalListPrice(precision:2)"
    },
    v4
  ]
};
})();
(node as any).hash = 'c841ffcd36e26288c5d2d7b0fe6ac0c9';
export default node;
