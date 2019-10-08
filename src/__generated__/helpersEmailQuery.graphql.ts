/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type helpersEmailQueryVariables = {
    readonly email: string;
};
export type helpersEmailQueryResponse = {
    readonly user: ({
        readonly userAlreadyExists: boolean | null;
    }) | null;
};
export type helpersEmailQuery = {
    readonly response: helpersEmailQueryResponse;
    readonly variables: helpersEmailQueryVariables;
};



/*
query helpersEmailQuery(
  $email: String!
) {
  user(email: $email) {
    userAlreadyExists
    __id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "email",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "user",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "email",
        "variableName": "email",
        "type": "String"
      }
    ],
    "concreteType": "User",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "userAlreadyExists",
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
  "name": "helpersEmailQuery",
  "id": null,
  "text": "query helpersEmailQuery(\n  $email: String!\n) {\n  user(email: $email) {\n    userAlreadyExists\n    __id\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "helpersEmailQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "helpersEmailQuery",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
(node as any).hash = 'bc3eea69494c29507eb5bf33dfb6c0ad';
export default node;
