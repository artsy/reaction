/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type SubmitOrderInput = {
    readonly orderId: string;
    readonly clientMutationId?: string | null;
};
export type ReviewSubmitOrderMutationVariables = {
    readonly input: SubmitOrderInput;
};
export type ReviewSubmitOrderMutationResponse = {
    readonly submitOrder: ({
        readonly orderOrError: ({
            readonly error?: ({
                readonly description: string;
            }) | null;
        }) | null;
    }) | null;
};
export type ReviewSubmitOrderMutation = {
    readonly response: ReviewSubmitOrderMutationResponse;
    readonly variables: ReviewSubmitOrderMutationVariables;
};



/*
mutation ReviewSubmitOrderMutation(
  $input: SubmitOrderInput!
) {
  submitOrder(input: $input) {
    orderOrError {
      __typename
      ... on OrderWithMutationFailure {
        error {
          description
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
    "type": "SubmitOrderInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input",
    "type": "SubmitOrderInput!"
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
          "name": "description",
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
  "name": "ReviewSubmitOrderMutation",
  "id": null,
  "text": "mutation ReviewSubmitOrderMutation(\n  $input: SubmitOrderInput!\n) {\n  submitOrder(input: $input) {\n    orderOrError {\n      __typename\n      ... on OrderWithMutationFailure {\n        error {\n          description\n        }\n      }\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "ReviewSubmitOrderMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "submitOrder",
        "storageKey": null,
        "args": v1,
        "concreteType": "SubmitOrderPayload",
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
    "name": "ReviewSubmitOrderMutation",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "submitOrder",
        "storageKey": null,
        "args": v1,
        "concreteType": "SubmitOrderPayload",
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
(node as any).hash = '0e81fed46f5998cbc84f51387e0e71a9';
export default node;
