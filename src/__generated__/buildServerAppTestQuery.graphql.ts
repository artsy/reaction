/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type buildServerAppTestQueryVariables = {};
export type buildServerAppTestQueryResponse = {
    readonly me: ({
        readonly __id: string;
    }) | null;
};
export type buildServerAppTestQuery = {
    readonly response: buildServerAppTestQueryResponse;
    readonly variables: buildServerAppTestQueryVariables;
};



/*
query buildServerAppTestQuery {
  me {
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
  "name": "buildServerAppTestQuery",
  "id": null,
  "text": "query buildServerAppTestQuery {\n  me {\n    __id\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "buildServerAppTestQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": v0
  },
  "operation": {
    "kind": "Operation",
    "name": "buildServerAppTestQuery",
    "argumentDefinitions": [],
    "selections": v0
  }
};
})();
(node as any).hash = '3bf8787c02fc1b3b8de8c60a842a34c4';
export default node;
