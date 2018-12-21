/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type OrderParticipantEnum = "BUYER" | "SELLER" | "%future added value";
declare const _TransactionDetailsSummaryItemOfferProperties$ref: unique symbol;
export type TransactionDetailsSummaryItemOfferProperties$ref = typeof _TransactionDetailsSummaryItemOfferProperties$ref;
export type TransactionDetailsSummaryItemOfferProperties = {
    readonly id: string | null;
    readonly amount: string | null;
    readonly amountCents: number | null;
    readonly shippingTotal: string | null;
    readonly shippingTotalCents: number | null;
    readonly taxTotal: string | null;
    readonly taxTotalCents: number | null;
    readonly buyerTotal: string | null;
    readonly buyerTotalCents: number | null;
    readonly fromParticipant: OrderParticipantEnum | null;
    readonly " $refType": TransactionDetailsSummaryItemOfferProperties$ref;
};



const node: ConcreteFragment = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "precision",
    "value": 2,
    "type": "Int"
  }
];
return {
  "kind": "Fragment",
  "name": "TransactionDetailsSummaryItemOfferProperties",
  "type": "Offer",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "id",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "amount",
      "args": v0,
      "storageKey": "amount(precision:2)"
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "amountCents",
      "args": null,
      "storageKey": null
    },
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
      "name": "shippingTotalCents",
      "args": null,
      "storageKey": null
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
      "name": "taxTotalCents",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "buyerTotal",
      "args": v0,
      "storageKey": "buyerTotal(precision:2)"
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "buyerTotalCents",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "fromParticipant",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": "__id",
      "name": "id",
      "args": null,
      "storageKey": null
    }
  ]
};
})();
(node as any).hash = 'c45ddea44a1696761a4198d99433c0f6';
export default node;
