/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { TransactionDetailsSummaryItem_order$ref } from "./TransactionDetailsSummaryItem_order.graphql";
export type TransactionDetailsSummaryItemStoryQueryVariables = {};
export type TransactionDetailsSummaryItemStoryQueryResponse = {
    readonly order: ({
        readonly " $fragmentRefs": TransactionDetailsSummaryItem_order$ref;
    }) | null;
};
export type TransactionDetailsSummaryItemStoryQuery = {
    readonly response: TransactionDetailsSummaryItemStoryQueryResponse;
    readonly variables: TransactionDetailsSummaryItemStoryQueryVariables;
};



/*
query TransactionDetailsSummaryItemStoryQuery {
  order: ecommerceOrder(id: "foo") {
    __typename
    ...TransactionDetailsSummaryItem_order
    __id: id
  }
}

fragment TransactionDetailsSummaryItem_order on Order {
  __typename
  mode
  shippingTotal(precision: 2)
  shippingTotalCents
  taxTotal(precision: 2)
  taxTotalCents
  itemsTotal(precision: 2)
  totalListPrice(precision: 2)
  buyerTotal(precision: 2)
  lastOffer {
    id
    amountCents
    __id: id
  }
  ... on OfferOrder {
    myLastOffer {
      id
      amount(precision: 2)
      amountCents
      shippingTotal(precision: 2)
      shippingTotalCents
      taxTotal(precision: 2)
      taxTotalCents
      __id: id
    }
  }
  __id: id
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "foo",
    "type": "String!"
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": "__id",
  "name": "id",
  "args": null,
  "storageKey": null
},
v2 = [
  {
    "kind": "Literal",
    "name": "precision",
    "value": 2,
    "type": "Int"
  }
],
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "shippingTotal",
  "args": v2,
  "storageKey": "shippingTotal(precision:2)"
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "shippingTotalCents",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "taxTotal",
  "args": v2,
  "storageKey": "taxTotal(precision:2)"
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "taxTotalCents",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "amountCents",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "TransactionDetailsSummaryItemStoryQuery",
  "id": null,
  "text": "query TransactionDetailsSummaryItemStoryQuery {\n  order: ecommerceOrder(id: \"foo\") {\n    __typename\n    ...TransactionDetailsSummaryItem_order\n    __id: id\n  }\n}\n\nfragment TransactionDetailsSummaryItem_order on Order {\n  __typename\n  mode\n  shippingTotal(precision: 2)\n  shippingTotalCents\n  taxTotal(precision: 2)\n  taxTotalCents\n  itemsTotal(precision: 2)\n  totalListPrice(precision: 2)\n  buyerTotal(precision: 2)\n  lastOffer {\n    id\n    amountCents\n    __id: id\n  }\n  ... on OfferOrder {\n    myLastOffer {\n      id\n      amount(precision: 2)\n      amountCents\n      shippingTotal(precision: 2)\n      shippingTotalCents\n      taxTotal(precision: 2)\n      taxTotalCents\n      __id: id\n    }\n  }\n  __id: id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "TransactionDetailsSummaryItemStoryQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "order",
        "name": "ecommerceOrder",
        "storageKey": "ecommerceOrder(id:\"foo\")",
        "args": v0,
        "concreteType": null,
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "TransactionDetailsSummaryItem_order",
            "args": null
          },
          v1
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "TransactionDetailsSummaryItemStoryQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "order",
        "name": "ecommerceOrder",
        "storageKey": "ecommerceOrder(id:\"foo\")",
        "args": v0,
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
            "kind": "ScalarField",
            "alias": null,
            "name": "mode",
            "args": null,
            "storageKey": null
          },
          v3,
          v4,
          v5,
          v6,
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "itemsTotal",
            "args": v2,
            "storageKey": "itemsTotal(precision:2)"
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "totalListPrice",
            "args": v2,
            "storageKey": "totalListPrice(precision:2)"
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "buyerTotal",
            "args": v2,
            "storageKey": "buyerTotal(precision:2)"
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
              v7,
              v8,
              v1
            ]
          },
          v1,
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
                "selections": [
                  v7,
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "amount",
                    "args": v2,
                    "storageKey": "amount(precision:2)"
                  },
                  v8,
                  v3,
                  v4,
                  v5,
                  v6,
                  v1
                ]
              }
            ]
          }
        ]
      }
    ]
  }
};
})();
(node as any).hash = '3a5232e28c1ac359d2d3335bdfd70648';
export default node;
