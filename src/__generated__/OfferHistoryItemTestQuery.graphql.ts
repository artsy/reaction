/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { OfferHistoryItem_order$ref } from "./OfferHistoryItem_order.graphql";
export type OfferHistoryItemTestQueryVariables = {};
export type OfferHistoryItemTestQueryResponse = {
    readonly order: ({
        readonly " $fragmentRefs": OfferHistoryItem_order$ref;
    }) | null;
};
export type OfferHistoryItemTestQuery = {
    readonly response: OfferHistoryItemTestQueryResponse;
    readonly variables: OfferHistoryItemTestQueryVariables;
};



/*
query OfferHistoryItemTestQuery {
  order: ecommerceOrder(id: "foo") {
    __typename
    ...OfferHistoryItem_order
    __id: id
  }
}

fragment OfferHistoryItem_order on Order {
  offers {
    edges {
      node {
        id
        from {
          __typename
          ... on Partner {
            id
          }
          ... on User {
            id
            __id
          }
          ... on Node {
            __id
          }
        }
        amount(precision: 2)
        createdAt(format: "MMM D")
        __id: id
      }
    }
  }
  lastOffer {
    from {
      __typename
      ... on Node {
        __id
      }
      ... on User {
        __id
      }
    }
    amount(precision: 2)
    shippingTotal(precision: 2)
    taxTotal(precision: 2)
    __id: id
  }
  totalListPrice(precision: 2)
  buyer {
    __typename
    ... on User {
      id
      __id
    }
    ... on Partner {
      id
    }
    ... on Node {
      __id
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
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v5 = [
  v3
],
v6 = {
  "kind": "InlineFragment",
  "type": "User",
  "selections": v5
},
v7 = {
  "kind": "InlineFragment",
  "type": "Partner",
  "selections": v5
},
v8 = [
  {
    "kind": "Literal",
    "name": "precision",
    "value": 2,
    "type": "Int"
  }
],
v9 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "amount",
  "args": v8,
  "storageKey": "amount(precision:2)"
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "OfferHistoryItemTestQuery",
  "id": null,
  "text": "query OfferHistoryItemTestQuery {\n  order: ecommerceOrder(id: \"foo\") {\n    __typename\n    ...OfferHistoryItem_order\n    __id: id\n  }\n}\n\nfragment OfferHistoryItem_order on Order {\n  offers {\n    edges {\n      node {\n        id\n        from {\n          __typename\n          ... on Partner {\n            id\n          }\n          ... on User {\n            id\n            __id\n          }\n          ... on Node {\n            __id\n          }\n        }\n        amount(precision: 2)\n        createdAt(format: \"MMM D\")\n        __id: id\n      }\n    }\n  }\n  lastOffer {\n    from {\n      __typename\n      ... on Node {\n        __id\n      }\n      ... on User {\n        __id\n      }\n    }\n    amount(precision: 2)\n    shippingTotal(precision: 2)\n    taxTotal(precision: 2)\n    __id: id\n  }\n  totalListPrice(precision: 2)\n  buyer {\n    __typename\n    ... on User {\n      id\n      __id\n    }\n    ... on Partner {\n      id\n    }\n    ... on Node {\n      __id\n    }\n  }\n  __id: id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "OfferHistoryItemTestQuery",
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
            "name": "OfferHistoryItem_order",
            "args": null
          },
          v1
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "OfferHistoryItemTestQuery",
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
          v2,
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
                      v3,
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "from",
                        "storageKey": null,
                        "args": null,
                        "concreteType": null,
                        "plural": false,
                        "selections": [
                          v2,
                          v4,
                          v6,
                          v7
                        ]
                      },
                      v9,
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
                      v1
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
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "from",
                "storageKey": null,
                "args": null,
                "concreteType": null,
                "plural": false,
                "selections": [
                  v2,
                  v4
                ]
              },
              v9,
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "shippingTotal",
                "args": v8,
                "storageKey": "shippingTotal(precision:2)"
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "taxTotal",
                "args": v8,
                "storageKey": "taxTotal(precision:2)"
              },
              v1
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "totalListPrice",
            "args": v8,
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
              v4,
              v7,
              v6
            ]
          },
          v1
        ]
      }
    ]
  }
};
})();
(node as any).hash = 'd05d067f54d6211be6cb79d01d5febc7';
export default node;
