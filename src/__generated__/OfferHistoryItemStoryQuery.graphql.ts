/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { OfferHistoryItem_order$ref } from "./OfferHistoryItem_order.graphql";
export type OfferHistoryItemStoryQueryVariables = {};
export type OfferHistoryItemStoryQueryResponse = {
    readonly order: ({
        readonly " $fragmentRefs": OfferHistoryItem_order$ref;
    }) | null;
};
export type OfferHistoryItemStoryQuery = {
    readonly response: OfferHistoryItemStoryQueryResponse;
    readonly variables: OfferHistoryItemStoryQueryVariables;
};



/*
query OfferHistoryItemStoryQuery {
  order: ecommerceOrder(id: "foo") {
    __typename
    ...OfferHistoryItem_order
    __id: id
  }
}

fragment OfferHistoryItem_order on Order {
  ... on OfferOrder {
    offers {
      edges {
        node {
          id
          amount(precision: 2)
          createdAt(format: "MMM D")
          fromParticipant
          __id: id
        }
      }
    }
    lastOffer {
      id
      fromParticipant
      amount(precision: 2)
      shippingTotal(precision: 2)
      taxTotal(precision: 2)
      note
      __id: id
    }
  }
  totalListPrice(precision: 2)
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
  "name": "id",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "amount",
  "args": v2,
  "storageKey": "amount(precision:2)"
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "fromParticipant",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "OfferHistoryItemStoryQuery",
  "id": null,
  "text": "query OfferHistoryItemStoryQuery {\n  order: ecommerceOrder(id: \"foo\") {\n    __typename\n    ...OfferHistoryItem_order\n    __id: id\n  }\n}\n\nfragment OfferHistoryItem_order on Order {\n  ... on OfferOrder {\n    offers {\n      edges {\n        node {\n          id\n          amount(precision: 2)\n          createdAt(format: \"MMM D\")\n          fromParticipant\n          __id: id\n        }\n      }\n    }\n    lastOffer {\n      id\n      fromParticipant\n      amount(precision: 2)\n      shippingTotal(precision: 2)\n      taxTotal(precision: 2)\n      note\n      __id: id\n    }\n  }\n  totalListPrice(precision: 2)\n  __id: id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "OfferHistoryItemStoryQuery",
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
    "name": "OfferHistoryItemStoryQuery",
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
            "name": "totalListPrice",
            "args": v2,
            "storageKey": "totalListPrice(precision:2)"
          },
          v1,
          {
            "kind": "InlineFragment",
            "type": "OfferOrder",
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
                          v3,
                          v4,
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
                          v5,
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
                  v3,
                  v5,
                  v4,
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
                    "name": "taxTotal",
                    "args": v2,
                    "storageKey": "taxTotal(precision:2)"
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "note",
                    "args": null,
                    "storageKey": null
                  },
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
(node as any).hash = '3d596a9c7c367d788a8201a9305a80df';
export default node;
