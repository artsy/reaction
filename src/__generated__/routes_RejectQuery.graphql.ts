/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { Reject_order$ref } from "./Reject_order.graphql";
export type routes_RejectQueryVariables = {
    readonly orderID: string;
};
export type routes_RejectQueryResponse = {
    readonly order: ({
        readonly " $fragmentRefs": Reject_order$ref;
    }) | null;
};
export type routes_RejectQuery = {
    readonly response: routes_RejectQueryResponse;
    readonly variables: routes_RejectQueryVariables;
};



/*
query routes_RejectQuery(
  $orderID: String!
) {
  order: ecommerceOrder(id: $orderID) {
    __typename
    ...Reject_order
    __id: id
  }
}

fragment Reject_order on Order {
  id
  stateExpiresAt
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
  "name": "routes_RejectQuery",
  "id": null,
  "text": "query routes_RejectQuery(\n  $orderID: String!\n) {\n  order: ecommerceOrder(id: $orderID) {\n    __typename\n    ...Reject_order\n    __id: id\n  }\n}\n\nfragment Reject_order on Order {\n  id\n  stateExpiresAt\n  __id: id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "routes_RejectQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "order",
        "name": "ecommerceOrder",
        "storageKey": null,
        "args": v1,
        "concreteType": null,
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "Reject_order",
            "args": null
          },
          v2
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "routes_RejectQuery",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "order",
        "name": "ecommerceOrder",
        "storageKey": null,
        "args": v1,
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
            "name": "id",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "stateExpiresAt",
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
(node as any).hash = 'f0e10c469c90e7ba99db6a4fd97ec72f';
export default node;
