/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type CreateBidderInput = {
    readonly sale_id: string;
    readonly clientMutationId?: string | null;
};
export type RegistrationFormCreateBidderMutationVariables = {
    readonly input: CreateBidderInput;
};
export type RegistrationFormCreateBidderMutationResponse = {
    readonly createBidder: ({
        readonly clientMutationId: string | null;
    }) | null;
};
export type RegistrationFormCreateBidderMutation = {
    readonly response: RegistrationFormCreateBidderMutationResponse;
    readonly variables: RegistrationFormCreateBidderMutationVariables;
};



/*
mutation RegistrationFormCreateBidderMutation(
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
  "name": "RegistrationFormCreateBidderMutation",
  "id": null,
  "text": "mutation RegistrationFormCreateBidderMutation(\n  $input: CreateBidderInput!\n) {\n  createBidder(input: $input) {\n    clientMutationId\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "RegistrationFormCreateBidderMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "RegistrationFormCreateBidderMutation",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
(node as any).hash = 'ca8e2c5becc12bd63c8d3bf7ae82be8f';
export default node;
