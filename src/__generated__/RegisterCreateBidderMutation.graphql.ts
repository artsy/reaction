/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type CreateBidderInput = {
    readonly sale_id: string;
    readonly clientMutationId?: string | null;
};
export type RegisterCreateBidderMutationVariables = {
    readonly input: CreateBidderInput;
};
export type RegisterCreateBidderMutationResponse = {
    readonly createBidder: ({
        readonly clientMutationId: string | null;
    }) | null;
};
export type RegisterCreateBidderMutation = {
    readonly response: RegisterCreateBidderMutationResponse;
    readonly variables: RegisterCreateBidderMutationVariables;
};



/*
mutation RegisterCreateBidderMutation(
  $input: CreateBidderInput!
) {
  createBidder(input: $input) {
    clientMutationId
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "CreateBidderInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "createBidder",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input",
        "type": "CreateBidderInput!"
      }
    ],
    "concreteType": "CreateBidderPayload",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "clientMutationId",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "RegisterCreateBidderMutation",
  "id": null,
  "text": "mutation RegisterCreateBidderMutation(\n  $input: CreateBidderInput!\n) {\n  createBidder(input: $input) {\n    clientMutationId\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "RegisterCreateBidderMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "RegisterCreateBidderMutation",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
(node as any).hash = '976a0966cf299e6c43717a6bb20b4225';
export default node;
