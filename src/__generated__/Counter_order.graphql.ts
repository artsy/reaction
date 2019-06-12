/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { ArtworkSummaryItem_order$ref } from "./ArtworkSummaryItem_order.graphql";
import { CreditCardSummaryItem_order$ref } from "./CreditCardSummaryItem_order.graphql";
import { OfferHistoryItem_order$ref } from "./OfferHistoryItem_order.graphql";
import { ShippingSummaryItem_order$ref } from "./ShippingSummaryItem_order.graphql";
import { TransactionDetailsSummaryItem_order$ref } from "./TransactionDetailsSummaryItem_order.graphql";
export type OrderModeEnum = "BUY" | "OFFER" | "%future added value";
declare const _Counter_order$ref: unique symbol;
export type Counter_order$ref = typeof _Counter_order$ref;
export type Counter_order = {
    readonly id: string;
    readonly mode: OrderModeEnum | null;
    readonly state: string | null;
    readonly itemsTotal: string | null;
    readonly totalListPrice: string | null;
    readonly stateExpiresAt: string | null;
    readonly lineItems: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly artwork: {
                    readonly id: string;
                } | null;
            } | null;
        } | null> | null;
    } | null;
    readonly lastOffer?: {
        readonly createdAt: string | null;
    } | null;
    readonly myLastOffer?: {
        readonly id: string;
    } | null;
    readonly " $fragmentRefs": TransactionDetailsSummaryItem_order$ref & ArtworkSummaryItem_order$ref & ShippingSummaryItem_order$ref & CreditCardSummaryItem_order$ref & OfferHistoryItem_order$ref;
    readonly " $refType": Counter_order$ref;
} & ({
    readonly lastOffer: {
        readonly createdAt: string | null;
    } | null;
    readonly myLastOffer: {
        readonly id: string;
    } | null;
} | {
    /*This will never be '% other', but we need some
    value in case none of the concrete values match.*/
    readonly __typename: "%other";
});



const node: ReaderFragment = (function(){
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
    "value": 2
  }
],
v2 = [
  (v0/*: any*/)
];
return {
  "kind": "Fragment",
  "name": "Counter_order",
  "type": "Order",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    (v0/*: any*/),
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
      "name": "state",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "itemsTotal",
      "args": (v1/*: any*/),
      "storageKey": "itemsTotal(precision:2)"
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "totalListPrice",
      "args": (v1/*: any*/),
      "storageKey": "totalListPrice(precision:2)"
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "stateExpiresAt",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "lineItems",
      "storageKey": null,
      "args": null,
      "concreteType": "OrderLineItemConnection",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "edges",
          "storageKey": null,
          "args": null,
          "concreteType": "OrderLineItemEdge",
          "plural": true,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "node",
              "storageKey": null,
              "args": null,
              "concreteType": "OrderLineItem",
              "plural": false,
              "selections": [
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "artwork",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "Artwork",
                  "plural": false,
                  "selections": (v2/*: any*/)
                }
              ]
            }
          ]
        }
      ]
    },
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
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "createdAt",
              "args": null,
              "storageKey": null
            }
          ]
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "myLastOffer",
          "storageKey": null,
          "args": null,
          "concreteType": "Offer",
          "plural": false,
          "selections": (v2/*: any*/)
        }
      ]
    },
    {
      "kind": "FragmentSpread",
      "name": "TransactionDetailsSummaryItem_order",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkSummaryItem_order",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ShippingSummaryItem_order",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "CreditCardSummaryItem_order",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "OfferHistoryItem_order",
      "args": null
    }
  ]
};
})();
(node as any).hash = '47b18edb5f1aee678efb095fd0d19ccc';
export default node;
