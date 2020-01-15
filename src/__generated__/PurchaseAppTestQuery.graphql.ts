/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CommerceOrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type CommerceOrderStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "PENDING" | "REFUNDED" | "SUBMITTED" | "%future added value";
export type PurchaseAppTestQueryVariables = {};
export type PurchaseAppTestQueryResponse = {
    readonly orders: {
        readonly " $fragmentRefs": FragmentRefs<"PurchaseApp_orders">;
    } | null;
};
export type PurchaseAppTestQueryRawResponse = {
    readonly orders: ({
        readonly edges: ReadonlyArray<({
            readonly node: ({
                readonly __typename: string | null;
                readonly internalID: string;
                readonly code: string;
                readonly state: CommerceOrderStateEnum;
                readonly mode: CommerceOrderModeEnum | null;
                readonly buyerTotal: string | null;
                readonly lineItems: ({
                    readonly edges: ReadonlyArray<({
                        readonly node: ({
                            readonly artwork: ({
                                readonly date: string | null;
                                readonly image: ({
                                    readonly resized: ({
                                        readonly url: string | null;
                                    }) | null;
                                }) | null;
                                readonly internalID: string;
                                readonly title: string | null;
                                readonly artist_names: string | null;
                                readonly id: string | null;
                            }) | null;
                            readonly id: string | null;
                        }) | null;
                    }) | null> | null;
                }) | null;
                readonly id: string | null;
            }) | null;
        }) | null> | null;
    }) | null;
};
export type PurchaseAppTestQuery = {
    readonly response: PurchaseAppTestQueryResponse;
    readonly variables: PurchaseAppTestQueryVariables;
    readonly rawResponse: PurchaseAppTestQueryRawResponse;
};



/*
query PurchaseAppTestQuery {
  orders: commerceMyOrders(first: 20) {
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
                resized {
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
    "kind": "Literal",
    "name": "first",
    "value": 20
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "internalID",
  "args": null,
  "storageKey": null
},
v2 = {
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
    "name": "PurchaseAppTestQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "orders",
        "name": "commerceMyOrders",
        "storageKey": "commerceMyOrders(first:20)",
        "args": (v0/*: any*/),
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
    "name": "PurchaseAppTestQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "orders",
        "name": "commerceMyOrders",
        "storageKey": "commerceMyOrders(first:20)",
        "args": (v0/*: any*/),
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
                  (v1/*: any*/),
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
                                        "storageKey": null,
                                        "args": null,
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
                                  (v1/*: any*/),
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
                                  (v2/*: any*/)
                                ]
                              },
                              (v2/*: any*/)
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  (v2/*: any*/)
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
    "name": "PurchaseAppTestQuery",
    "id": null,
    "text": "query PurchaseAppTestQuery {\n  orders: commerceMyOrders(first: 20) {\n    ...PurchaseApp_orders\n  }\n}\n\nfragment PurchaseApp_orders on CommerceOrderConnectionWithTotalCount {\n  ...PurchaseHistory_orders\n}\n\nfragment PurchaseHistory_orders on CommerceOrderConnectionWithTotalCount {\n  edges {\n    node {\n      __typename\n      internalID\n      code\n      state\n      mode\n      buyerTotal\n      lineItems {\n        edges {\n          node {\n            artwork {\n              date\n              image {\n                resized {\n                  url\n                }\n              }\n              internalID\n              title\n              artist_names: artistNames\n              id\n            }\n            id\n          }\n        }\n      }\n      id\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'c1017f33f422cb91721c8e2fbff0b87e';
export default node;
