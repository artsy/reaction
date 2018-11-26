/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ShippingAddress_ship$ref } from "./ShippingAddress_ship.graphql";
export type OrderModeEnum = "BUY" | "OFFER" | "%future added value";
declare const _ShippingAndPaymentReview_order$ref: unique symbol;
export type ShippingAndPaymentReview_order$ref = typeof _ShippingAndPaymentReview_order$ref;
export type ShippingAndPaymentReview_order = {
    readonly mode: OrderModeEnum | null;
    readonly totalListPrice: string | null;
    readonly itemsTotal: string | null;
    readonly requestedFulfillment: ({
        readonly __typename: string;
        readonly " $fragmentRefs": ShippingAddress_ship$ref;
    }) | null;
    readonly lineItems: ({
        readonly edges: ReadonlyArray<({
            readonly node: ({
                readonly artwork: ({
                    readonly shippingOrigin: string | null;
                }) | null;
            }) | null;
        }) | null> | null;
    }) | null;
    readonly creditCard: ({
        readonly brand: string;
        readonly last_digits: string;
        readonly expiration_year: number;
        readonly expiration_month: number;
    }) | null;
    readonly " $refType": ShippingAndPaymentReview_order$ref;
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
  "name": "ShippingAndPaymentReview_order",
  "type": "Order",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
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
      "args": v0,
      "storageKey": "totalListPrice(precision:2)"
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "itemsTotal",
      "args": v0,
      "storageKey": "itemsTotal(precision:2)"
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "requestedFulfillment",
      "storageKey": null,
      "args": null,
      "concreteType": null,
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "__typename",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "FragmentSpread",
          "name": "ShippingAddress_ship",
          "args": null
        }
      ]
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
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "shippingOrigin",
                      "args": null,
                      "storageKey": null
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
      "kind": "LinkedField",
      "alias": null,
      "name": "creditCard",
      "storageKey": null,
      "args": null,
      "concreteType": "CreditCard",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "brand",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "last_digits",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "expiration_year",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "expiration_month",
          "args": null,
          "storageKey": null
        },
        v1
      ]
    },
    v2
  ]
};
})();
(node as any).hash = '3af72e2b9be198f280057aaf588161ac';
export default node;
