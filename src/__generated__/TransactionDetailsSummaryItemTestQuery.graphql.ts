/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { TransactionDetailsSummaryItem_order$ref } from "./TransactionDetailsSummaryItem_order.graphql";
export type TransactionDetailsSummaryItemTestQueryVariables = {};
export type TransactionDetailsSummaryItemTestQueryResponse = {
    readonly order: ({
        readonly " $fragmentRefs": TransactionDetailsSummaryItem_order$ref;
    }) | null;
};
export type TransactionDetailsSummaryItemTestQuery = {
    readonly response: TransactionDetailsSummaryItemTestQueryResponse;
    readonly variables: TransactionDetailsSummaryItemTestQueryVariables;
};



/*
query TransactionDetailsSummaryItemTestQuery {
  order: ecommerceOrder(id: "whatevs") {
    __typename
    ...TransactionDetailsSummaryItem_order
    __id: id
  }
}

fragment TransactionDetailsSummaryItem_order on Order {
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
  __id: id
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "whatevs",
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
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "TransactionDetailsSummaryItemTestQuery",
  "id": null,
  "text": "query TransactionDetailsSummaryItemTestQuery {\n  order: ecommerceOrder(id: \"whatevs\") {\n    __typename\n    ...TransactionDetailsSummaryItem_order\n    __id: id\n  }\n}\n\nfragment TransactionDetailsSummaryItem_order on Order {\n  mode\n  shippingTotal(precision: 2)\n  shippingTotalCents\n  taxTotal(precision: 2)\n  taxTotalCents\n  itemsTotal(precision: 2)\n  totalListPrice(precision: 2)\n  buyerTotal(precision: 2)\n  lastOffer {\n    id\n    amountCents\n    __id: id\n  }\n  __id: id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "TransactionDetailsSummaryItemTestQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "order",
        "name": "ecommerceOrder",
        "storageKey": "ecommerceOrder(id:\"whatevs\")",
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
    "name": "TransactionDetailsSummaryItemTestQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "order",
        "name": "ecommerceOrder",
        "storageKey": "ecommerceOrder(id:\"whatevs\")",
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
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "shippingTotal",
            "args": v2,
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
            "args": v2,
            "storageKey": "taxTotal(precision:2)"
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "taxTotalCents",
            "args": null,
            "storageKey": null
          },
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
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "id",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "amountCents",
                "args": null,
                "storageKey": null
              },
              v1
            ]
          },
          v1
        ]
      }
    ]
  }
};
})();
(node as any).hash = 'b1a7f5efde4660e09dafc9038d6e6f20';
export default node;
