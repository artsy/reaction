/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ShippingAddress_ship$ref } from "./ShippingAddress_ship.graphql";
declare const _ShippingSummaryItem_order$ref: unique symbol;
export type ShippingSummaryItem_order$ref = typeof _ShippingSummaryItem_order$ref;
export type ShippingSummaryItem_order = {
    readonly state: string | null;
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
    readonly " $refType": ShippingSummaryItem_order$ref;
};



const node: ConcreteFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": "__id",
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "ShippingSummaryItem_order",
  "type": "Order",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "state",
      "args": null,
      "storageKey": null
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
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "__id",
                      "args": null,
                      "storageKey": null
                    }
                  ]
                },
                v0
              ]
            }
          ]
        }
      ]
    },
    v0
  ]
};
})();
(node as any).hash = '701e0a2e44b7ae043a9d459c9fda3bf3';
export default node;
