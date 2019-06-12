/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type buildClientAppTestQueryVariables = {};
export type buildClientAppTestQueryResponse = {
    readonly me: {
        readonly __id: string;
    } | null;
};
export type buildClientAppTestQuery = {
    readonly response: buildClientAppTestQueryResponse;
    readonly variables: buildClientAppTestQueryVariables;
};



/*
query buildClientAppTestQuery {
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
    "name": "buildClientAppTestQuery",
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
    "name": "buildClientAppTestQuery",
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
    "name": "buildClientAppTestQuery",
    "id": null,
    "text": "query buildClientAppTestQuery {\n  me {\n    __id\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'b3f25ce581d3ea277681773834936ee9';
export default node;
