/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CommerceOrderConnectionSortEnum = "STATE_EXPIRES_AT_ASC" | "STATE_EXPIRES_AT_DESC" | "STATE_UPDATED_AT_ASC" | "STATE_UPDATED_AT_DESC" | "UPDATED_AT_ASC" | "UPDATED_AT_DESC" | "%future added value";
export type CommerceOrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type CommerceOrderStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "PENDING" | "REFUNDED" | "SUBMITTED" | "%future added value";
export type routes_PurchaseQueryVariables = {
    sellerId?: string | null;
    state?: CommerceOrderStateEnum | null;
    mode?: CommerceOrderModeEnum | null;
    sort?: CommerceOrderConnectionSortEnum | null;
    first: number;
};
export type routes_PurchaseQueryResponse = {
    readonly commerceMyOrders: {
        readonly " $fragmentRefs": FragmentRefs<"PurchaseApp_orders">;
    } | null;
};
export type routes_PurchaseQuery = {
    readonly response: routes_PurchaseQueryResponse;
    readonly variables: routes_PurchaseQueryVariables;
};



/*
query routes_PurchaseQuery(
  $sellerId: String
  $state: CommerceOrderStateEnum
  $mode: CommerceOrderModeEnum
  $sort: CommerceOrderConnectionSortEnum
  $first: Int!
) {
  commerceMyOrders(sellerId: $sellerId, state: $state, mode: $mode, sort: $sort, first: $first) {
    ...PurchaseApp_orders
  }
}

fragment PurchaseApp_orders on CommerceOrderConnectionWithTotalCount {
  edges {
    node {
      __typename
      internalID
      state
      buyerTotal
      lineItems {
        edges {
          node {
            artwork {
              image {
                url
              }
              internalID
              title
              artist {
                name
                id
              }
              partner {
                name
                id
              }
              id
            }
            id
          }
        }
      }
      id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "sellerId",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "state",
    "type": "CommerceOrderStateEnum",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "mode",
    "type": "CommerceOrderModeEnum",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "sort",
    "type": "CommerceOrderConnectionSortEnum",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "first",
    "type": "Int!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  },
  {
    "kind": "Variable",
    "name": "mode",
    "variableName": "mode"
  },
  {
    "kind": "Variable",
    "name": "sellerId",
    "variableName": "sellerId"
  },
  {
    "kind": "Variable",
    "name": "sort",
    "variableName": "sort"
  },
  {
    "kind": "Variable",
    "name": "state",
    "variableName": "state"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "internalID",
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
v4 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "name",
    "args": null,
    "storageKey": null
  },
  (v3/*: any*/)
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "routes_PurchaseQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "commerceMyOrders",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CommerceOrderConnectionWithTotalCount",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "PurchaseApp_orders",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "routes_PurchaseQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "commerceMyOrders",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CommerceOrderConnectionWithTotalCount",
        "plural": false,
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
                    "name": "__typename",
                    "args": null,
                    "storageKey": null
                  },
                  (v2/*: any*/),
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
                                  (v2/*: any*/),
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
                                    "selections": (v4/*: any*/)
                                  },
                                  {
                                    "kind": "LinkedField",
                                    "alias": null,
                                    "name": "partner",
                                    "storageKey": null,
                                    "args": null,
                                    "concreteType": "Partner",
                                    "plural": false,
                                    "selections": (v4/*: any*/)
                                  },
                                  (v3/*: any*/)
                                ]
                              },
                              (v3/*: any*/)
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  (v3/*: any*/)
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "routes_PurchaseQuery",
    "id": null,
    "text": "query routes_PurchaseQuery(\n  $sellerId: String\n  $state: CommerceOrderStateEnum\n  $mode: CommerceOrderModeEnum\n  $sort: CommerceOrderConnectionSortEnum\n  $first: Int!\n) {\n  commerceMyOrders(sellerId: $sellerId, state: $state, mode: $mode, sort: $sort, first: $first) {\n    ...PurchaseApp_orders\n  }\n}\n\nfragment PurchaseApp_orders on CommerceOrderConnectionWithTotalCount {\n  edges {\n    node {\n      __typename\n      internalID\n      state\n      buyerTotal\n      lineItems {\n        edges {\n          node {\n            artwork {\n              image {\n                url\n              }\n              internalID\n              title\n              artist {\n                name\n                id\n              }\n              partner {\n                name\n                id\n              }\n              id\n            }\n            id\n          }\n        }\n      }\n      id\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '82aca670dd2d0529d145d75b7a6c0796';
export default node;
