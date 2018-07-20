/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type routes_ReviewQueryVariables = {
    readonly orderID: string;
};
export type routes_ReviewQueryResponse = {
    readonly order: ({}) | null;
};



/*
query routes_ReviewQuery(
  $orderID: String!
) {
  order(id: $orderID) {
    ...Review_order
    __id: id
  }
}

fragment Review_order on Order {
  id
  __id: id
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
    "kind": "Variable",
    "name": "id",
    "variableName": "orderID",
    "type": "String!"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": "__id",
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "routes_ReviewQuery",
  "id": null,
  "text": "query routes_ReviewQuery(\n  $orderID: String!\n) {\n  order(id: $orderID) {\n    ...Review_order\n    __id: id\n  }\n}\n\nfragment Review_order on Order {\n  id\n  __id: id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "routes_ReviewQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "order",
        "storageKey": null,
        "args": v1,
        "concreteType": "Order",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "Review_order",
            "args": null
          },
          v2
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "routes_ReviewQuery",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "order",
        "storageKey": null,
        "args": v1,
        "concreteType": "Order",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          },
          v2
        ]
      }
    ]
  }
};
})();
(node as any).hash = '27ff94ce1a13a2d866e2f783949ba274';
export default node;
