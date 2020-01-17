/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type routes_PurchaseQueryVariables = {
    first: number;
};
export type routes_PurchaseQueryResponse = {
    readonly orders: {
        readonly " $fragmentRefs": FragmentRefs<"PurchaseApp_orders">;
    } | null;
};
export type routes_PurchaseQuery = {
    readonly response: routes_PurchaseQueryResponse;
    readonly variables: routes_PurchaseQueryVariables;
};



/*
query routes_PurchaseQuery(
  $first: Int!
) {
  orders: commerceMyOrders(first: $first) {
    ...PurchaseApp_orders
  }
}

fragment PurchaseApp_orders on CommerceOrderConnectionWithTotalCount {
  ...PurchaseHistory_orders
}

fragment PurchaseHistory_orders on CommerceOrderConnectionWithTotalCount {
  edges {
    node {
      __typename
      internalID
      code
      state
      mode
      buyerTotal
      lineItems {
        edges {
          node {
            artwork {
              date
              image {
                resized(width: 55) {
                  url
                }
              }
              internalID
              title
              artist_names: artistNames
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
};
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
        "alias": "orders",
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
        "alias": "orders",
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
                                        "kind": "LinkedField",
                                        "alias": null,
                                        "name": "resized",
                                        "storageKey": "resized(width:55)",
                                        "args": [
                                          {
                                            "kind": "Literal",
                                            "name": "width",
                                            "value": 55
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
                                  (v2/*: any*/),
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "name": "title",
                                    "args": null,
                                    "storageKey": null
                                  },
                                  {
                                    "kind": "ScalarField",
                                    "alias": "artist_names",
                                    "name": "artistNames",
                                    "args": null,
                                    "storageKey": null
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
    "text": "query routes_PurchaseQuery(\n  $first: Int!\n) {\n  orders: commerceMyOrders(first: $first) {\n    ...PurchaseApp_orders\n  }\n}\n\nfragment PurchaseApp_orders on CommerceOrderConnectionWithTotalCount {\n  ...PurchaseHistory_orders\n}\n\nfragment PurchaseHistory_orders on CommerceOrderConnectionWithTotalCount {\n  edges {\n    node {\n      __typename\n      internalID\n      code\n      state\n      mode\n      buyerTotal\n      lineItems {\n        edges {\n          node {\n            artwork {\n              date\n              image {\n                resized(width: 55) {\n                  url\n                }\n              }\n              internalID\n              title\n              artist_names: artistNames\n              id\n            }\n            id\n          }\n        }\n      }\n      id\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'd507231ca63a6ade1b4bda34bd6a6e29';
export default node;
