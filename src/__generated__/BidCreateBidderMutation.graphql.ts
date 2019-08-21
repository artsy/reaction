/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type CreateBidderInput = {
    readonly sale_id: string;
    readonly clientMutationId?: string | null;
};
export type BidCreateBidderMutationVariables = {
    readonly input: CreateBidderInput;
};
export type BidCreateBidderMutationResponse = {
    readonly createBidder: ({
        readonly clientMutationId: string | null;
    }) | null;
};
export type BidCreateBidderMutation = {
    readonly response: BidCreateBidderMutationResponse;
    readonly variables: BidCreateBidderMutationVariables;
};



/*
mutation BidCreateBidderMutation(
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
  "name": "BidCreateBidderMutation",
  "id": null,
  "text": "mutation BidCreateBidderMutation(\n  $input: CreateBidderInput!\n) {\n  createBidder(input: $input) {\n    clientMutationId\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "BidCreateBidderMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "BidCreateBidderMutation",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
(node as any).hash = '56bd9f9f424f4c291ebc015f48bf346e';
export default node;
