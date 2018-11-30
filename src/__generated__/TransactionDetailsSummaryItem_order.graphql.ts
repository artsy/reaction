/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type OrderModeEnum = "BUY" | "OFFER" | "%future added value";
declare const _TransactionDetailsSummaryItem_order$ref: unique symbol;
export type TransactionDetailsSummaryItem_order$ref = typeof _TransactionDetailsSummaryItem_order$ref;
export type TransactionDetailsSummaryItem_order = {
    readonly __typename: string;
    readonly mode: OrderModeEnum | null;
    readonly shippingTotal: string | null;
    readonly shippingTotalCents: number | null;
    readonly taxTotal: string | null;
    readonly taxTotalCents: number | null;
    readonly itemsTotal: string | null;
    readonly totalListPrice: string | null;
    readonly buyerTotal: string | null;
    readonly myLastOffer?: ({
        readonly id: string | null;
        readonly amount: string | null;
        readonly amountCents: number | null;
        readonly shippingTotal: string | null;
        readonly shippingTotalCents: number | null;
        readonly taxTotal: string | null;
        readonly taxTotalCents: number | null;
        readonly buyerTotal: string | null;
        readonly buyerTotalCents: number | null;
    }) | null;
    readonly lastOffer?: ({
        readonly id: string | null;
        readonly amountCents: number | null;
    }) | null;
    readonly " $refType": TransactionDetailsSummaryItem_order$ref;
};



const node: ConcreteFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "taxTotalCents",
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
  "name": "shippingTotal",
  "args": v1,
  "storageKey": "shippingTotal(precision:2)"
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "shippingTotalCents",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "taxTotal",
  "args": v1,
  "storageKey": "taxTotal(precision:2)"
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "buyerTotal",
  "args": v1,
  "storageKey": "buyerTotal(precision:2)"
},
v6 = {
  "kind": "ScalarField",
  "alias": "__id",
  "name": "id",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "amountCents",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "TransactionDetailsSummaryItem_order",
  "type": "Order",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    v0,
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "itemsTotal",
      "args": v0,
      "storageKey": "itemsTotal(precision:2)"
    },
    v2,
    v3,
    v4,
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "__typename",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "mode",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "totalListPrice",
      "args": v1,
      "storageKey": "totalListPrice(precision:2)"
    },
    v5,
    v6,
    {
      "kind": "InlineFragment",
      "type": "OfferOrder",
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "myLastOffer",
          "storageKey": null,
          "args": null,
          "concreteType": "Offer",
          "plural": false,
          "selections": [
            v7,
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "amount",
              "args": v1,
              "storageKey": "amount(precision:2)"
            },
            v8,
            v2,
            v3,
            v4,
            v0,
            v5,
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "buyerTotalCents",
              "args": null,
              "storageKey": null
            },
            v6
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
            v7,
            v8,
            v6
          ]
        }
      ]
    }
  ]
};
})();
(node as any).hash = 'ee91d7e2098228c5dc2dc7435d4bf997';
export default node;
