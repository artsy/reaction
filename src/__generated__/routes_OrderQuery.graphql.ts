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
v2 = [
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
        "kind": "ScalarField",
        "alias": "__id",
        "name": "id",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "routes_OrderQuery",
  "id": null,
  "text": "query routes_OrderQuery(\n  $orderID: String!\n) {\n  me {\n    name\n    __id\n  }\n  order: ecommerceOrder(id: $orderID) {\n    state\n    requestedFulfillment {\n      __typename\n    }\n    creditCard {\n      id\n      __id\n    }\n    __id: id\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "routes_OrderQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v2
  },
  "operation": {
    "kind": "Operation",
    "name": "routes_OrderQuery",
    "argumentDefinitions": v0,
    "selections": v2
  }
};
})();
(node as any).hash = 'a3058d3342922022ac9960c0e813b8d9';
export default node;
