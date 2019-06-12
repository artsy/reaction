/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { ArtworkSummaryItem_order$ref } from "./ArtworkSummaryItem_order.graphql";
import { CreditCardSummaryItem_order$ref } from "./CreditCardSummaryItem_order.graphql";
import { ItemReview_artwork$ref } from "./ItemReview_artwork.graphql";
import { OfferSummaryItem_order$ref } from "./OfferSummaryItem_order.graphql";
import { ShippingSummaryItem_order$ref } from "./ShippingSummaryItem_order.graphql";
import { TransactionDetailsSummaryItem_order$ref } from "./TransactionDetailsSummaryItem_order.graphql";
export type OrderModeEnum = "BUY" | "OFFER" | "%future added value";
declare const _Review_order$ref: unique symbol;
export type Review_order$ref = typeof _Review_order$ref;
export type Review_order = {
    readonly id: string;
    readonly mode: OrderModeEnum | null;
    readonly itemsTotal: string | null;
    readonly lineItems: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly artwork: {
                    readonly id: string;
                    readonly _id: string;
                    readonly artists: ReadonlyArray<{
                        readonly id: string;
                    } | null> | null;
                    readonly " $fragmentRefs": ItemReview_artwork$ref;
                } | null;
            } | null;
        } | null> | null;
    } | null;
    readonly myLastOffer?: {
        readonly id: string;
    } | null;
    readonly " $fragmentRefs": ArtworkSummaryItem_order$ref & TransactionDetailsSummaryItem_order$ref & ShippingSummaryItem_order$ref & CreditCardSummaryItem_order$ref & OfferSummaryItem_order$ref;
    readonly " $refType": Review_order$ref;
} & ({
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
  (v0/*: any*/)
];
return {
  "kind": "Fragment",
  "name": "Review_order",
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
      "name": "itemsTotal",
      "args": [
        {
          "kind": "Literal",
          "name": "precision",
          "value": 2
        }
      ],
      "storageKey": "itemsTotal(precision:2)"
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
                    (v0/*: any*/),
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "_id",
                      "args": null,
                      "storageKey": null
                    },
                    {
                      "kind": "LinkedField",
                      "alias": null,
                      "name": "artists",
                      "storageKey": null,
                      "args": null,
                      "concreteType": "Artist",
                      "plural": true,
                      "selections": (v1/*: any*/)
                    },
                    {
                      "kind": "FragmentSpread",
                      "name": "ItemReview_artwork",
                      "args": null
                    }
                  ]
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
          "name": "myLastOffer",
          "storageKey": null,
          "args": null,
          "concreteType": "Offer",
          "plural": false,
          "selections": (v1/*: any*/)
        }
      ]
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
      "name": "OfferSummaryItem_order",
      "args": null
    }
  ]
};
})();
(node as any).hash = '0bffcc0a156da80f5e479655a11730d0';
export default node;
