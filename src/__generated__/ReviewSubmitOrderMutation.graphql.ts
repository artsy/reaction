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
    readonly ecommerceSubmitOrder: ({
        readonly orderOrError: ({
            readonly error?: ({
                readonly type: string;
                readonly code: string;
                readonly data: string | null;
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
  ecommerceSubmitOrder(input: $input) {
    orderOrError {
      __typename
      ... on OrderWithMutationFailure {
        error {
          type
          code
          data
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
          "name": "type",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "code",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "data",
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
  "text": "mutation ReviewSubmitOrderMutation(\n  $input: SubmitOrderInput!\n) {\n  ecommerceSubmitOrder(input: $input) {\n    orderOrError {\n      __typename\n      ... on OrderWithMutationFailure {\n        error {\n          type\n          code\n          data\n        }\n      }\n    }\n  }\n}\n",
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
        "name": "ecommerceSubmitOrder",
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
        "name": "ecommerceSubmitOrder",
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
(node as any).hash = 'ada451c41a0adfffd072a19ac6269ba8';
export default node;
