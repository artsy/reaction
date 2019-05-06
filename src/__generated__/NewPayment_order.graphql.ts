/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ArtworkSummaryItem_order$ref } from "./ArtworkSummaryItem_order.graphql";
import { PaymentPicker_order$ref } from "./PaymentPicker_order.graphql";
import { TransactionDetailsSummaryItem_order$ref } from "./TransactionDetailsSummaryItem_order.graphql";
export type OrderModeEnum = "BUY" | "OFFER" | "%future added value";
declare const _NewPayment_order$ref: unique symbol;
export type NewPayment_order$ref = typeof _NewPayment_order$ref;
export type NewPayment_order = {
    readonly id: string | null;
    readonly mode: OrderModeEnum | null;
    readonly stateExpiresAt: string | null;
    readonly lineItems: ({
        readonly edges: ReadonlyArray<({
            readonly node: ({
                readonly artwork: ({
                    readonly id: string;
                    readonly artists: ReadonlyArray<({
                        readonly id: string;
                    }) | null> | null;
                }) | null;
            }) | null;
        }) | null> | null;
    }) | null;
    readonly lastOffer?: ({
        readonly createdAt: string | null;
        readonly id: string | null;
        readonly note: string | null;
    }) | null;
    readonly " $fragmentRefs": PaymentPicker_order$ref & ArtworkSummaryItem_order$ref & TransactionDetailsSummaryItem_order$ref;
    readonly " $refType": NewPayment_order$ref;
};



const node: ConcreteFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": "__id",
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "NewPayment_order",
  "type": "Order",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    v0,
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
                  "selections": [
                    v0,
                    {
                      "kind": "LinkedField",
                      "alias": null,
                      "name": "artists",
                      "storageKey": null,
                      "args": null,
                      "concreteType": "Artist",
                      "plural": true,
                      "selections": [
                        v0,
                        v1
                      ]
                    },
                    v1
                  ]
                },
                v2
              ]
            }
          ]
        }
      ]
    },
    {
      "kind": "FragmentSpread",
      "name": "PaymentPicker_order",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkSummaryItem_order",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "TransactionDetailsSummaryItem_order",
      "args": null
    },
    v2,
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
            },
            v0,
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "note",
              "args": null,
              "storageKey": null
            },
            v2
          ]
        }
      ]
    }
  ]
};
})();
(node as any).hash = 'c1d8ea8dd0ca3f423f366ab055ae317b';
export default node;
