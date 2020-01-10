/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
export type CommerceOrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type CommerceOrderStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "PENDING" | "REFUNDED" | "SUBMITTED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type PurchaseApp_orders = {
    readonly edges: ReadonlyArray<{
        readonly node: {
            readonly stateExpiresAt: string | null;
            readonly internalID: string;
            readonly code: string;
            readonly state: CommerceOrderStateEnum;
            readonly mode: CommerceOrderModeEnum | null;
            readonly stateReason: string | null;
            readonly buyerTotal: string | null;
            readonly lineItems: {
                readonly edges: ReadonlyArray<{
                    readonly node: {
                        readonly artwork: {
                            readonly date: string | null;
                            readonly image: {
                                readonly url: string | null;
                            } | null;
                            readonly internalID: string;
                            readonly title: string | null;
                            readonly artist: {
                                readonly name: string | null;
                            } | null;
                            readonly partner: {
                                readonly name: string | null;
                            } | null;
                        } | null;
                    } | null;
                } | null> | null;
            } | null;
        } | null;
    } | null> | null;
    readonly " $refType": "PurchaseApp_orders";
};
export type PurchaseApp_orders$data = PurchaseApp_orders;
export type PurchaseApp_orders$key = {
    readonly " $data"?: PurchaseApp_orders$data;
    readonly " $fragmentRefs": FragmentRefs<"PurchaseApp_orders">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "internalID",
  "args": null,
  "storageKey": null
},
v1 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "name",
    "args": null,
    "storageKey": null
  }
];
return {
  "kind": "Fragment",
  "name": "PurchaseApp_orders",
  "type": "CommerceOrderConnectionWithTotalCount",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "edges",
      "storageKey": null,
      "args": null,
      "concreteType": "CommerceOrderEdge",
      "plural": true,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "node",
          "storageKey": null,
          "args": null,
          "concreteType": null,
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "stateExpiresAt",
              "args": null,
              "storageKey": null
            },
            (v0/*: any*/),
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
              "name": "buyerTotal",
              "args": null,
              "storageKey": null
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
                              "name": "date",
                              "args": null,
                              "storageKey": null
                            },
                            {
                              "kind": "LinkedField",
                              "alias": null,
                              "name": "image",
                              "storageKey": null,
                              "args": null,
                              "concreteType": "Image",
                              "plural": false,
                              "selections": [
                                {
                                  "kind": "ScalarField",
                                  "alias": null,
                                  "name": "url",
                                  "args": null,
                                  "storageKey": null
                                }
                              ]
                            },
                            (v0/*: any*/),
                            {
                              "kind": "ScalarField",
                              "alias": null,
                              "name": "title",
                              "args": null,
                              "storageKey": null
                            },
                            {
                              "kind": "LinkedField",
                              "alias": null,
                              "name": "artist",
                              "storageKey": null,
                              "args": null,
                              "concreteType": "Artist",
                              "plural": false,
                              "selections": (v1/*: any*/)
                            },
                            {
                              "kind": "LinkedField",
                              "alias": null,
                              "name": "partner",
                              "storageKey": null,
                              "args": null,
                              "concreteType": "Partner",
                              "plural": false,
                              "selections": (v1/*: any*/)
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
})();
(node as any).hash = 'c99e78d5fd057673b2b7a833878ca913';
export default node;
