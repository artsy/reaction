/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type makeClientAppTestQueryVariables = {};
export type makeClientAppTestQueryResponse = {
    readonly me: ({
        readonly __id: string;
    }) | null;
};
export type makeClientAppTestQuery = {
    readonly response: makeClientAppTestQueryResponse;
    readonly variables: makeClientAppTestQueryVariables;
};



/*
query makeClientAppTestQuery {
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
  "name": "makeClientAppTestQuery",
  "id": null,
  "text": "query makeClientAppTestQuery {\n  me {\n    __id\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "makeClientAppTestQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": v0
  },
  "operation": {
    "kind": "Operation",
    "name": "makeClientAppTestQuery",
    "argumentDefinitions": [],
    "selections": v0
  }
};
})();
(node as any).hash = 'eee89066e8c1b0f15493be3b4f0ccd48';
export default node;
