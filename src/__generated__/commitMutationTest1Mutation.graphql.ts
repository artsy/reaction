/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type SetOrderPaymentInput = {
    readonly orderId: string;
    readonly creditCardId: string;
    readonly clientMutationId?: string | null;
};
export type commitMutationTest1MutationVariables = {
    readonly input: SetOrderPaymentInput;
};
export type commitMutationTest1MutationResponse = {
    readonly ecommerceSetOrderPayment: ({
        readonly orderOrError: ({
            readonly error?: ({
                readonly code: string;
            }) | null;
        }) | null;
    }) | null;
};
export type commitMutationTest1Mutation = {
    readonly response: commitMutationTest1MutationResponse;
    readonly variables: commitMutationTest1MutationVariables;
};



/*
mutation commitMutationTest1Mutation(
  $input: SetOrderPaymentInput!
) {
  ecommerceSetOrderPayment(input: $input) {
    orderOrError {
      __typename
      ... on OrderWithMutationFailure {
        error {
          code
        }
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "SetOrderPaymentInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input",
    "type": "SetOrderPaymentInput!"
  }
],
v2 = {
  "kind": "InlineFragment",
  "type": "OrderWithMutationFailure",
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "error",
      "storageKey": null,
      "args": null,
      "concreteType": "EcommerceError",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "code",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "commitMutationTest1Mutation",
  "id": null,
  "text": "mutation commitMutationTest1Mutation(\n  $input: SetOrderPaymentInput!\n) {\n  ecommerceSetOrderPayment(input: $input) {\n    orderOrError {\n      __typename\n      ... on OrderWithMutationFailure {\n        error {\n          code\n        }\n      }\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "commitMutationTest1Mutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "ecommerceSetOrderPayment",
        "storageKey": null,
        "args": v1,
        "concreteType": "SetOrderPaymentPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "orderOrError",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": [
              v2
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "commitMutationTest1Mutation",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "ecommerceSetOrderPayment",
        "storageKey": null,
        "args": v1,
        "concreteType": "SetOrderPaymentPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "orderOrError",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "__typename",
                "args": null,
                "storageKey": null
              },
              v2
            ]
          }
        ]
      }
    ]
  }
};
})();
(node as any).hash = '185f6aacd76ffb48524e52100e0988d0';
export default node;
