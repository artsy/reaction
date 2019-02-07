/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type OrderParticipantEnum = "BUYER" | "SELLER" | "%future added value";
declare const _OfferHistoryItem_order$ref: unique symbol;
export type OfferHistoryItem_order$ref = typeof _OfferHistoryItem_order$ref;
export type OfferHistoryItem_order = {
    readonly totalListPrice: string | null;
    readonly offers?: ({
        readonly edges: ReadonlyArray<({
            readonly node: ({
                readonly id: string | null;
                readonly amount: string | null;
                readonly createdAt: string | null;
                readonly fromParticipant: OrderParticipantEnum | null;
            }) | null;
        }) | null> | null;
    }) | null;
    readonly lastOffer?: ({
        readonly id: string | null;
        readonly fromParticipant: OrderParticipantEnum | null;
        readonly amount: string | null;
        readonly shippingTotal: string | null;
        readonly taxTotal: string | null;
        readonly note: string | null;
    }) | null;
    readonly " $refType": OfferHistoryItem_order$ref;
};



const node: ConcreteFragment = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "precision",
    "value": 2,
    "type": "Int"
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": "__id",
  "name": "id",
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
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "amount",
  "args": v0,
  "storageKey": "amount(precision:2)"
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "fromParticipant",
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
      "kind": "ScalarField",
      "alias": null,
      "name": "totalListPrice",
      "args": v0,
      "storageKey": "totalListPrice(precision:2)"
    },
    v1,
    {
      "kind": "InlineFragment",
      "type": "OfferOrder",
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
                    v2,
                    v3,
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
                    v4,
                    v1
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
            v2,
            v4,
            v3,
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "shippingTotal",
              "args": v0,
              "storageKey": "shippingTotal(precision:2)"
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "taxTotal",
              "args": v0,
              "storageKey": "taxTotal(precision:2)"
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "note",
              "args": null,
              "storageKey": null
            },
            v1
          ]
        }
      ]
    }
  ]
};
})();
(node as any).hash = '115498eb52f9e7edd8cd8dc0893efb8c';
export default node;
