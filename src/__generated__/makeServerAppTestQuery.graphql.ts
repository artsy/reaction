/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type makeServerAppTestQueryVariables = {};
export type makeServerAppTestQueryResponse = {
    readonly me: ({
        readonly __id: string;
    }) | null;
};
export type makeServerAppTestQuery = {
    readonly response: makeServerAppTestQueryResponse;
    readonly variables: makeServerAppTestQueryVariables;
};



/*
query makeServerAppTestQuery {
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
  "name": "makeServerAppTestQuery",
  "id": null,
  "text": "query makeServerAppTestQuery {\n  me {\n    __id\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "makeServerAppTestQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": v0
  },
  "operation": {
    "kind": "Operation",
    "name": "makeServerAppTestQuery",
    "argumentDefinitions": [],
    "selections": v0
  }
};
})();
(node as any).hash = '333fc7c4111dc50283586a456fb1a431';
export default node;
