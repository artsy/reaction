/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type buildServerAppTestQueryVariables = {};
export type buildServerAppTestQueryResponse = {
    readonly me: {
        readonly __id: string;
    } | null;
};
export type buildServerAppTestQuery = {
    readonly response: buildServerAppTestQueryResponse;
    readonly variables: buildServerAppTestQueryVariables;
};



/*
query buildServerAppTestQuery {
  me {
    __id
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "buildServerAppTestQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "Me",
        "plural": false,
        "selections": [
          (v0/*: any*/)
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "buildServerAppTestQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "Me",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "buildServerAppTestQuery",
    "id": null,
    "text": "query buildServerAppTestQuery {\n  me {\n    __id\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '3bf8787c02fc1b3b8de8c60a842a34c4';
export default node;
