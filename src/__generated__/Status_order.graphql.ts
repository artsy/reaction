/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ArtworkSummaryItem_order$ref } from "./ArtworkSummaryItem_order.graphql";
import { CreditCardSummaryItem_order$ref } from "./CreditCardSummaryItem_order.graphql";
import { ItemReview_artwork$ref } from "./ItemReview_artwork.graphql";
import { ShippingSummaryItem_order$ref } from "./ShippingSummaryItem_order.graphql";
import { TransactionDetailsSummaryItem_order$ref } from "./TransactionDetailsSummaryItem_order.graphql";
export type OrderModeEnum = "BUY" | "OFFER" | "%future added value";
declare const _Status_order$ref: unique symbol;
export type Status_order$ref = typeof _Status_order$ref;
export type Status_order = {
    readonly id: string | null;
    readonly code: string | null;
    readonly state: string | null;
    readonly mode: OrderModeEnum | null;
    readonly requestedFulfillment: ({
        readonly __typename: "Ship";
    } | {
        /*This will never be '% other', but we need some
        value in case none of the concrete values match.*/
        readonly __typename: "%other";
    }) | null;
    readonly lineItems: ({
        readonly edges: ReadonlyArray<({
            readonly node: ({
                readonly fulfillments: ({
                    readonly edges: ReadonlyArray<({
                        readonly node: ({
                            readonly courier: string | null;
                            readonly trackingId: string | null;
                            readonly estimatedDelivery: string | null;
                        }) | null;
                    }) | null> | null;
                }) | null;
                readonly artwork: ({
                    readonly id: string;
                    readonly is_acquireable: boolean | null;
                    readonly " $fragmentRefs": ItemReview_artwork$ref;
                }) | null;
            }) | null;
        }) | null> | null;
    }) | null;
    readonly __typename: "Order";
    readonly " $fragmentRefs": ArtworkSummaryItem_order$ref & TransactionDetailsSummaryItem_order$ref & ShippingSummaryItem_order$ref & CreditCardSummaryItem_order$ref;
    readonly " $refType": Status_order$ref;
};



const node: ConcreteFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v1 = [
  v0
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": "__id",
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "Status_order",
  "type": "Order",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "ArtworkSummaryItem_order",
      "args": null
    },
    v0,
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "code",
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
      "name": "mode",
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
          "kind": "InlineFragment",
          "type": "Pickup",
          "selections": v1
        },
        {
          "kind": "InlineFragment",
          "type": "Ship",
          "selections": v1
        }
      ]
    },
    v2,
    {
      "kind": "FragmentSpread",
      "name": "TransactionDetailsSummaryItem_order",
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
                  "name": "fulfillments",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "OrderFulfillmentConnection",
                  "plural": false,
                  "selections": [
                    {
                      "kind": "LinkedField",
                      "alias": null,
                      "name": "edges",
                      "storageKey": null,
                      "args": null,
                      "concreteType": "OrderFulfillmentEdge",
                      "plural": true,
                      "selections": [
                        {
                          "kind": "LinkedField",
                          "alias": null,
                          "name": "node",
                          "storageKey": null,
                          "args": null,
                          "concreteType": "OrderFulfillment",
                          "plural": false,
                          "selections": [
                            {
                              "kind": "ScalarField",
                              "alias": null,
                              "name": "courier",
                              "args": null,
                              "storageKey": null
                            },
                            {
                              "kind": "ScalarField",
                              "alias": null,
                              "name": "trackingId",
                              "args": null,
                              "storageKey": null
                            },
                            {
                              "kind": "ScalarField",
                              "alias": null,
                              "name": "estimatedDelivery",
                              "args": [
                                {
                                  "kind": "Literal",
                                  "name": "format",
                                  "value": "MMM Do, YYYY",
                                  "type": "String"
                                }
                              ],
                              "storageKey": "estimatedDelivery(format:\"MMM Do, YYYY\")"
                            },
                            v3
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "artwork",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "Artwork",
                  "plural": false,
                  "selections": [
                    v2,
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "is_acquireable",
                      "args": null,
                      "storageKey": null
                    },
                    {
                      "kind": "FragmentSpread",
                      "name": "ItemReview_artwork",
                      "args": null
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
                v3
              ]
            }
          ]
        }
      ]
    },
    v3
  ]
};
})();
(node as any).hash = 'b8029530d6a6538ad36dfad5ee1c6542';
export default node;
