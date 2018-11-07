/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ItemReview_artwork$ref } from "./ItemReview_artwork.graphql";
import { ShippingAndPaymentReview_order$ref } from "./ShippingAndPaymentReview_order.graphql";
import { TransactionSummary_order$ref } from "./TransactionSummary_order.graphql";
export type OrderModeEnum = "BUY" | "OFFER" | "%future added value";
declare const _Review_order$ref: unique symbol;
export type Review_order$ref = typeof _Review_order$ref;
export type Review_order = {
    readonly id: string | null;
    readonly mode: OrderModeEnum | null;
    readonly lineItems: ({
        readonly edges: ReadonlyArray<({
            readonly node: ({
                readonly artwork: ({
                    readonly id: string;
                    readonly artists: ReadonlyArray<({
                        readonly id: string;
                    }) | null> | null;
                    readonly " $fragmentRefs": ItemReview_artwork$ref;
                }) | null;
            }) | null;
        }) | null> | null;
    }) | null;
    readonly " $fragmentRefs": TransactionSummary_order$ref & ShippingAndPaymentReview_order$ref;
    readonly " $refType": Review_order$ref;
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
  "name": "Review_order",
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
                    {
                      "kind": "FragmentSpread",
                      "name": "ItemReview_artwork",
                      "args": null
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
      "name": "TransactionSummary_order",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ShippingAndPaymentReview_order",
      "args": null
    },
    v2
  ]
};
})();
(node as any).hash = '8ed0c48e8b5169b670c63a98e1f83479';
export default node;
