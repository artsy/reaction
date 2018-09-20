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
  order(id: $orderID) {
    state
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
v1 = [
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
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "__id",
        "args": null,
        "storageKey": null
      }
    ]
  },
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "order",
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
  "text": "query routes_OrderQuery(\n  $orderID: String!\n) {\n  me {\n    name\n    __id\n  }\n  order(id: $orderID) {\n    state\n    __id: id\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "routes_OrderQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "routes_OrderQuery",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
(node as any).hash = '6c572cf997bad6b3db2c0ed5ee00f090';
export default node;
