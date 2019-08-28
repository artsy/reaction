/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ArtworkSummaryItem_order$ref } from "./ArtworkSummaryItem_order.graphql";
import { CreditCardSummaryItem_order$ref } from "./CreditCardSummaryItem_order.graphql";
import { ItemReview_lineItem$ref } from "./ItemReview_lineItem.graphql";
import { ShippingSummaryItem_order$ref } from "./ShippingSummaryItem_order.graphql";
import { TransactionDetailsSummaryItem_order$ref } from "./TransactionDetailsSummaryItem_order.graphql";
export type CommerceOrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type CommerceOrderStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "PENDING" | "REFUNDED" | "SUBMITTED" | "%future added value";
declare const _Status_order$ref: unique symbol;
export type Status_order$ref = typeof _Status_order$ref;
export type Status_order = {
    readonly __typename: string;
    readonly id: string;
    readonly code: string;
    readonly state: CommerceOrderStateEnum;
    readonly mode: CommerceOrderModeEnum | null;
    readonly stateReason: string | null;
    readonly stateExpiresAt: string | null;
    readonly requestedFulfillment: ({
        readonly __typename: "CommerceShip";
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
                            readonly courier: string;
                            readonly trackingId: string | null;
                            readonly estimatedDelivery: string | null;
                        }) | null;
                    }) | null> | null;
                }) | null;
                readonly artwork: ({
                    readonly id: string;
                    readonly is_acquireable: boolean | null;
                }) | null;
                readonly " $fragmentRefs": ItemReview_lineItem$ref;
            }) | null;
        }) | null> | null;
    }) | null;
    readonly myLastOffer?: ({
        readonly id: string;
        readonly amount: string | null;
        readonly amountCents: number;
        readonly shippingTotal: string | null;
        readonly shippingTotalCents: number | null;
        readonly taxTotal: string | null;
        readonly taxTotalCents: number | null;
    }) | null;
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
},
v4 = [
  {
    "kind": "Literal",
    "name": "precision",
    "value": 2,
    "type": "Int"
  }
];
return {
  "kind": "Fragment",
  "name": "Status_order",
  "type": "CommerceOrder",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
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
          "type": "CommercePickup",
          "selections": v1
        },
        {
          "kind": "InlineFragment",
          "type": "CommerceShip",
          "selections": v1
        }
      ]
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
      "kind": "ScalarField",
      "alias": null,
      "name": "stateReason",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "stateExpiresAt",
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "MMM D",
          "type": "String"
        }
      ],
      "storageKey": "stateExpiresAt(format:\"MMM D\")"
    },
    v2,
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
      "concreteType": "CommerceLineItemConnection",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "edges",
          "storageKey": null,
          "args": null,
          "concreteType": "CommerceLineItemEdge",
          "plural": true,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "node",
              "storageKey": null,
              "args": null,
              "concreteType": "CommerceLineItem",
              "plural": false,
              "selections": [
                {
                  "kind": "FragmentSpread",
                  "name": "ItemReview_lineItem",
                  "args": null
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "fulfillments",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "CommerceFulfillmentConnection",
                  "plural": false,
                  "selections": [
                    {
                      "kind": "LinkedField",
                      "alias": null,
                      "name": "edges",
                      "storageKey": null,
                      "args": null,
                      "concreteType": "CommerceFulfillmentEdge",
                      "plural": true,
                      "selections": [
                        {
                          "kind": "LinkedField",
                          "alias": null,
                          "name": "node",
                          "storageKey": null,
                          "args": null,
                          "concreteType": "CommerceFulfillment",
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
    v3,
    {
      "kind": "InlineFragment",
      "type": "CommerceOfferOrder",
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "myLastOffer",
          "storageKey": null,
          "args": null,
          "concreteType": "CommerceOffer",
          "plural": false,
          "selections": [
            v2,
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "amount",
              "args": v4,
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
              "args": v4,
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
              "args": v4,
              "storageKey": "taxTotal(precision:2)"
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "taxTotalCents",
              "args": null,
              "storageKey": null
            },
            v3
          ]
        }
      ]
    }
  ]
};
})();
(node as any).hash = '5b2c1fde3aa98f22666e0244a934893e';
export default node;
