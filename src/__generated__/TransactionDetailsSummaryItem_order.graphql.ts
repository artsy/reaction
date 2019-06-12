/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
export type OrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type OrderParticipantEnum = "BUYER" | "SELLER" | "%future added value";
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
    readonly lastOffer?: {
        readonly id: string;
        readonly amount: string | null;
        readonly amountCents: number | null;
        readonly shippingTotal: string | null;
        readonly shippingTotalCents: number | null;
        readonly taxTotal: string | null;
        readonly taxTotalCents: number | null;
        readonly buyerTotal: string | null;
        readonly buyerTotalCents: number | null;
        readonly fromParticipant: OrderParticipantEnum | null;
        readonly note: string | null;
    } | null;
    readonly myLastOffer?: {
        readonly id: string;
        readonly amount: string | null;
        readonly amountCents: number | null;
        readonly shippingTotal: string | null;
        readonly shippingTotalCents: number | null;
        readonly taxTotal: string | null;
        readonly taxTotalCents: number | null;
        readonly buyerTotal: string | null;
        readonly buyerTotalCents: number | null;
        readonly fromParticipant: OrderParticipantEnum | null;
        readonly note: string | null;
    } | null;
    readonly " $refType": TransactionDetailsSummaryItem_order$ref;
} & ({
    readonly __typename: "OfferOrder";
    readonly lastOffer: {
        readonly id: string;
        readonly amount: string | null;
        readonly amountCents: number | null;
        readonly shippingTotal: string | null;
        readonly shippingTotalCents: number | null;
        readonly taxTotal: string | null;
        readonly taxTotalCents: number | null;
        readonly buyerTotal: string | null;
        readonly buyerTotalCents: number | null;
        readonly fromParticipant: OrderParticipantEnum | null;
        readonly note: string | null;
    } | null;
    readonly myLastOffer: {
        readonly id: string;
        readonly amount: string | null;
        readonly amountCents: number | null;
        readonly shippingTotal: string | null;
        readonly shippingTotalCents: number | null;
        readonly taxTotal: string | null;
        readonly taxTotalCents: number | null;
        readonly buyerTotal: string | null;
        readonly buyerTotalCents: number | null;
        readonly fromParticipant: OrderParticipantEnum | null;
        readonly note: string | null;
    } | null;
} | {
    /*This will never be '% other', but we need some
    value in case none of the concrete values match.*/
    readonly __typename: "%other";
});



const node: ReaderFragment = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "precision",
    "value": 2
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "shippingTotal",
  "args": (v0/*: any*/),
  "storageKey": "shippingTotal(precision:2)"
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "shippingTotalCents",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "taxTotal",
  "args": (v0/*: any*/),
  "storageKey": "taxTotal(precision:2)"
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "taxTotalCents",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "buyerTotal",
  "args": (v0/*: any*/),
  "storageKey": "buyerTotal(precision:2)"
},
v6 = [
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
    "args": (v0/*: any*/),
    "storageKey": "amount(precision:2)"
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "amountCents",
    "args": null,
    "storageKey": null
  },
  (v1/*: any*/),
  (v2/*: any*/),
  (v3/*: any*/),
  (v4/*: any*/),
  (v5/*: any*/),
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
    "alias": null,
    "name": "note",
    "args": null,
    "storageKey": null
  }
];
return {
  "kind": "Fragment",
  "name": "TransactionDetailsSummaryItem_order",
  "type": "Order",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
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
    (v1/*: any*/),
    (v2/*: any*/),
    (v3/*: any*/),
    (v4/*: any*/),
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "itemsTotal",
      "args": (v0/*: any*/),
      "storageKey": "itemsTotal(precision:2)"
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "totalListPrice",
      "args": (v0/*: any*/),
      "storageKey": "totalListPrice(precision:2)"
    },
    (v5/*: any*/),
    {
      "kind": "InlineFragment",
      "type": "OfferOrder",
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "lastOffer",
          "storageKey": null,
          "args": null,
          "concreteType": "Offer",
          "plural": false,
          "selections": (v6/*: any*/)
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "myLastOffer",
          "storageKey": null,
          "args": null,
          "concreteType": "Offer",
          "plural": false,
          "selections": (v6/*: any*/)
        }
      ]
    }
  ]
};
})();
(node as any).hash = '0a089f0405da382d428db51dfd1fe013';
export default node;
