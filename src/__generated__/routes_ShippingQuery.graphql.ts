/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type routes_ShippingQueryVariables = {
    readonly orderID: string;
};
export type routes_ShippingQueryResponse = {
    readonly order: ({}) | null;
};



/*
query routes_ShippingQuery(
  $orderID: String!
) {
  order(id: $orderID) {
    ...Shipping_order
    __id: id
  }
}

fragment Shipping_order on Order {
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
  "name": "routes_ShippingQuery",
  "id": null,
  "text": "query routes_ShippingQuery(\n  $orderID: String!\n) {\n  order(id: $orderID) {\n    ...Shipping_order\n    __id: id\n  }\n}\n\nfragment Shipping_order on Order {\n  id\n  __id: id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "routes_ShippingQuery",
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
            "name": "Shipping_order",
            "args": null
          },
          v2
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "routes_ShippingQuery",
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
(node as any).hash = 'a9eb2bc4e3a8c7df4af5c9dd68927880';
export default node;
