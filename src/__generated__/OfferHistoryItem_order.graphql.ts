/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _OfferHistoryItem_order$ref: unique symbol;
export type OfferHistoryItem_order$ref = typeof _OfferHistoryItem_order$ref;
export type OfferHistoryItem_order = {
    readonly offers: ({
        readonly edges: ReadonlyArray<({
            readonly node: ({
                readonly id: string | null;
                readonly from: ({
                    readonly __typename: "Partner";
                    readonly id: string;
                } | {
                    /*This will never be '% other', but we need some
                    value in case none of the concrete values match.*/
                    readonly __typename: "%other";
                }) | null;
                readonly amount: string | null;
                readonly createdAt: string | null;
            }) | null;
        }) | null> | null;
    }) | null;
    readonly lastOffer: ({
        readonly id: string | null;
        readonly from: ({
            readonly __typename: string;
        }) | null;
        readonly amount: string | null;
        readonly shippingTotal: string | null;
        readonly taxTotal: string | null;
    }) | null;
    readonly totalListPrice: string | null;
    readonly buyer: ({
        readonly id?: string;
    }) | null;
    readonly " $refType": OfferHistoryItem_order$ref;
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
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v3 = [
  v0
],
v4 = {
  "kind": "InlineFragment",
  "type": "User",
  "selections": v3
},
v5 = {
  "kind": "InlineFragment",
  "type": "Partner",
  "selections": v3
},
v6 = [
  {
    "kind": "Literal",
    "name": "precision",
    "value": 2,
    "type": "Int"
  }
],
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "amount",
  "args": v6,
  "storageKey": "amount(precision:2)"
},
v8 = {
  "kind": "ScalarField",
  "alias": "__id",
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "OfferHistoryItem_order",
  "type": "Order",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "offers",
      "storageKey": null,
      "args": null,
      "concreteType": "OfferConnection",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "edges",
          "storageKey": null,
          "args": null,
          "concreteType": "OfferEdge",
          "plural": true,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "node",
              "storageKey": null,
              "args": null,
              "concreteType": "Offer",
              "plural": false,
              "selections": [
                v0,
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "from",
                  "storageKey": null,
                  "args": null,
                  "concreteType": null,
                  "plural": false,
                  "selections": [
                    v1,
                    v2,
                    v4,
                    v5
                  ]
                },
                v7,
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "createdAt",
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "format",
                      "value": "MMM D",
                      "type": "String"
                    }
                  ],
                  "storageKey": "createdAt(format:\"MMM D\")"
                },
                v8
              ]
            }
          ]
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "lastOffer",
      "storageKey": null,
      "args": null,
      "concreteType": "Offer",
      "plural": false,
      "selections": [
        v0,
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "from",
          "storageKey": null,
          "args": null,
          "concreteType": null,
          "plural": false,
          "selections": [
            v1,
            v2
          ]
        },
        v7,
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "shippingTotal",
          "args": v6,
          "storageKey": "shippingTotal(precision:2)"
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "taxTotal",
          "args": v6,
          "storageKey": "taxTotal(precision:2)"
        },
        v8
      ]
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "totalListPrice",
      "args": v6,
      "storageKey": "totalListPrice(precision:2)"
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "buyer",
      "storageKey": null,
      "args": null,
      "concreteType": null,
      "plural": false,
      "selections": [
        v2,
        v5,
        v4
      ]
    },
    v8
  ]
};
})();
(node as any).hash = '0ec2ab467712414dcc6655279a926db4';
export default node;
