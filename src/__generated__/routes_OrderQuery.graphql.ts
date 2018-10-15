/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type routes_OrderQueryVariables = {
    readonly orderID: string;
};
export type routes_OrderQueryResponse = {
    readonly me: ({
        readonly name: string | null;
    }) | null;
    readonly order: ({
        readonly state: string | null;
        readonly requestedFulfillment: ({
            readonly __typename: string;
        }) | null;
        readonly creditCard: ({
            readonly id: string;
        }) | null;
        readonly lineItems: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly artwork: ({
                        readonly href: string | null;
                    }) | null;
                }) | null;
            }) | null> | null;
        }) | null;
    }) | null;
};
export type routes_OrderQuery = {
    readonly response: routes_OrderQueryResponse;
    readonly variables: routes_OrderQueryVariables;
};



/*
query routes_OrderQuery(
  $orderID: String!
) {
  me {
    name
    __id
  }
  order: ecommerceOrder(id: $orderID) {
    state
    requestedFulfillment {
      __typename
    }
    creditCard {
      id
      __id
    }
    lineItems {
      edges {
        node {
          artwork {
            href
            __id
          }
          __id: id
        }
      }
    }
    __id: id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "orderID",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": "__id",
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "me",
    "storageKey": null,
    "args": null,
    "concreteType": "Me",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "name",
        "args": null,
        "storageKey": null
      },
      v1
    ]
  },
  {
    "kind": "LinkedField",
    "alias": "order",
    "name": "ecommerceOrder",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "orderID",
        "type": "String!"
      }
    ],
    "concreteType": "Order",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "state",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "requestedFulfillment",
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
          }
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "creditCard",
        "storageKey": null,
        "args": null,
        "concreteType": "CreditCard",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          },
          v1
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
                        "name": "href",
                        "args": null,
                        "storageKey": null
                      },
                      v1
                    ]
                  },
                  v2
                ]
              }
            ]
          }
        ]
      },
      v2
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "routes_OrderQuery",
  "id": null,
  "text": "query routes_OrderQuery(\n  $orderID: String!\n) {\n  me {\n    name\n    __id\n  }\n  order: ecommerceOrder(id: $orderID) {\n    state\n    requestedFulfillment {\n      __typename\n    }\n    creditCard {\n      id\n      __id\n    }\n    lineItems {\n      edges {\n        node {\n          artwork {\n            href\n            __id\n          }\n          __id: id\n        }\n      }\n    }\n    __id: id\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "routes_OrderQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v3
  },
  "operation": {
    "kind": "Operation",
    "name": "routes_OrderQuery",
    "argumentDefinitions": v0,
    "selections": v3
  }
};
})();
(node as any).hash = 'e4681af7c5ebbafe89186e1b4afd2ebc';
export default node;
