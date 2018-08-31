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
            readonly __typename: "OrderWithMutationFailure";
            readonly error: ({
                readonly description: string;
            }) | null;
        } | {
            /*This will never be '% other', but we need some
            value in case none of the concrete values match.*/
            readonly __typename: "%other";
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
    "kind": "LinkedField",
    "alias": null,
    "name": "submitOrder",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input",
        "type": "SubmitOrderInput!"
      }
    ],
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
          {
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
          }
        ]
      }
    ]
  }
];
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
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "ReviewSubmitOrderMutation",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
(node as any).hash = 'a3b3619d85059c06ccdfe9ac85a44f53';
export default node;
