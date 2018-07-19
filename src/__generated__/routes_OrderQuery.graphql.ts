/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type routes_OrderQueryVariables = {};
export type routes_OrderQueryResponse = {
    readonly me: ({
        readonly name: string | null;
    }) | null;
};



/*
query routes_OrderQuery {
  me {
    name
    __id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
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
  }
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "routes_OrderQuery",
  "id": null,
  "text": "query routes_OrderQuery {\n  me {\n    name\n    __id\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "routes_OrderQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": v0
  },
  "operation": {
    "kind": "Operation",
    "name": "routes_OrderQuery",
    "argumentDefinitions": [],
    "selections": v0
  }
};
})();
(node as any).hash = 'ecb5cad72d7df4a9ea50659254fd9bc7';
export default node;
