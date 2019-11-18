/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
export type CommerceOrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type CommerceOrderStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "PENDING" | "REFUNDED" | "SUBMITTED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type Shipping_order = {
    readonly internalID: string;
    readonly mode: CommerceOrderModeEnum | null;
    readonly state: CommerceOrderStateEnum;
    readonly requestedFulfillment: ({
        readonly __typename: "CommerceShip";
        readonly name: string | null;
        readonly addressLine1: string | null;
        readonly addressLine2: string | null;
        readonly city: string | null;
        readonly region: string | null;
        readonly country: string | null;
        readonly postalCode: string | null;
        readonly phoneNumber: string | null;
    } | {
        /*This will never be '%other', but we need some
        value in case none of the concrete values match.*/
        readonly __typename: "%other";
    }) | null;
    readonly lineItems: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly artwork: {
                    readonly slug: string;
                    readonly pickup_available: boolean | null;
                    readonly onlyShipsDomestically: boolean | null;
                    readonly shippingCountry: string | null;
                } | null;
            } | null;
        } | null> | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkSummaryItem_order" | "TransactionDetailsSummaryItem_order">;
    readonly " $refType": "Shipping_order";
};
export type Shipping_order$data = Shipping_order;
export type Shipping_order$key = {
    readonly " $data"?: Shipping_order$data;
    readonly " $fragmentRefs": FragmentRefs<"Shipping_order">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "Shipping_order",
  "type": "CommerceOrder",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "internalID",
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
          "kind": "InlineFragment",
          "type": "CommerceShip",
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "name",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "addressLine1",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "addressLine2",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "city",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "region",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "country",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "postalCode",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "phoneNumber",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
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
                      "name": "slug",
                      "args": null,
                      "storageKey": null
                    },
                    {
                      "kind": "ScalarField",
                      "alias": "pickup_available",
                      "name": "pickupAvailable",
                      "args": null,
                      "storageKey": null
                    },
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "onlyShipsDomestically",
                      "args": null,
                      "storageKey": null
                    },
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "shippingCountry",
                      "args": null,
                      "storageKey": null
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
      "kind": "FragmentSpread",
      "name": "ArtworkSummaryItem_order",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "TransactionDetailsSummaryItem_order",
      "args": null
    }
  ]
};
(node as any).hash = 'a4f4398ad5fddb05c06e6fba20a78582';
export default node;
