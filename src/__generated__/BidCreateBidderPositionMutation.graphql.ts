/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type BidderPositionInput = {
    readonly sale_id: string;
    readonly artwork_id: string;
    readonly max_bid_amount_cents: number;
    readonly clientMutationId?: string | null;
};
export type BidCreateBidderPositionMutationVariables = {
    readonly input: BidderPositionInput;
};
export type BidCreateBidderPositionMutationResponse = {
    readonly createBidderPosition: ({
        readonly clientMutationId: string | null;
    }) | null;
};
export type BidCreateBidderPositionMutation = {
    readonly response: BidCreateBidderPositionMutationResponse;
    readonly variables: BidCreateBidderPositionMutationVariables;
};



/*
mutation BidCreateBidderPositionMutation(
  $input: BidderPositionInput!
) {
  createBidderPosition(input: $input) {
    clientMutationId
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "BidderPositionInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "createBidderPosition",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input",
        "type": "BidderPositionInput!"
      }
    ],
    "concreteType": "BidderPositionPayload",
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
  "name": "BidCreateBidderPositionMutation",
  "id": null,
  "text": "mutation BidCreateBidderPositionMutation(\n  $input: BidderPositionInput!\n) {\n  createBidderPosition(input: $input) {\n    clientMutationId\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "BidCreateBidderPositionMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "BidCreateBidderPositionMutation",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
(node as any).hash = '7d69bac62832e05395e0088878fc8364';
export default node;
