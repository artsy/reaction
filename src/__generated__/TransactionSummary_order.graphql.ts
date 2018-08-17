/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _TransactionSummary_order$ref: unique symbol;
export type TransactionSummary_order$ref = typeof _TransactionSummary_order$ref;
export type TransactionSummary_order = {
    readonly shippingTotal: string | null;
    readonly taxTotal: string | null;
    readonly itemsTotal: string | null;
    readonly buyerTotal: string | null;
    readonly partner: ({
        readonly name: string | null;
    }) | null;
    readonly lineItems: ({
        readonly edges: ReadonlyArray<({
            readonly node: ({
                readonly artwork: ({
                    readonly artist_names: string | null;
                    readonly title: string | null;
                    readonly date: string | null;
                    readonly shippingOrigin: string | null;
                    readonly image: ({
                        readonly resized_transactionSummary: ({
                            readonly url: string | null;
                        }) | null;
                    }) | null;
                }) | null;
            }) | null;
        }) | null> | null;
    }) | null;
    readonly " $refType": TransactionSummary_order$ref;
};



const node: ConcreteFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": "__id",
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "TransactionSummary_order",
  "type": "Order",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "shippingTotal",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "taxTotal",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "itemsTotal",
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
      "name": "partner",
      "storageKey": null,
      "args": null,
      "concreteType": "Partner",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "name",
          "args": null,
          "storageKey": null
        },
        v0
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
                      "name": "artist_names",
                      "args": null,
                      "storageKey": null
                    },
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "title",
                      "args": null,
                      "storageKey": null
                    },
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "date",
                      "args": null,
                      "storageKey": null
                    },
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "shippingOrigin",
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
                          "kind": "LinkedField",
                          "alias": "resized_transactionSummary",
                          "name": "resized",
                          "storageKey": "resized(width:55)",
                          "args": [
                            {
                              "kind": "Literal",
                              "name": "width",
                              "value": 55,
                              "type": "Int"
                            }
                          ],
                          "concreteType": "ResizedImageUrl",
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
                        }
                      ]
                    },
                    v0
                  ]
                },
                v1
              ]
            }
          ]
        }
      ]
    },
    v1
  ]
};
})();
(node as any).hash = 'df6d9577c69cc1ffa4a5bb9ec4ae26af';
export default node;
