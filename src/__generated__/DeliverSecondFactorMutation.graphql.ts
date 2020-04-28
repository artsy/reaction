/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type DeliverSecondFactorInput = {
    readonly clientMutationId?: string | null;
    readonly secondFactorID: string;
};
export type DeliverSecondFactorMutationVariables = {
    input: DeliverSecondFactorInput;
};
export type DeliverSecondFactorMutationResponse = {
    readonly deliverSecondFactor: {
        readonly secondFactorOrErrors: {
            readonly __typename?: "Errors";
            readonly errors: ReadonlyArray<{
                readonly message: string;
                readonly code: string;
                readonly path: ReadonlyArray<string> | null;
                readonly data: unknown | null;
            }>;
        } | {
            /*This will never be '%other', but we need some
            value in case none of the concrete values match.*/
            readonly __typename: "%other";
        };
    } | null;
};
export type DeliverSecondFactorMutationRawResponse = {
    readonly deliverSecondFactor: ({
        readonly secondFactorOrErrors: {
            readonly __typename: "Errors";
            readonly errors: ReadonlyArray<{
                readonly message: string;
                readonly code: string;
                readonly path: ReadonlyArray<string> | null;
                readonly data: unknown | null;
            }>;
        } | {
            readonly __typename: string;
        };
    }) | null;
};
export type DeliverSecondFactorMutation = {
    readonly response: DeliverSecondFactorMutationResponse;
    readonly variables: DeliverSecondFactorMutationVariables;
    readonly rawResponse: DeliverSecondFactorMutationRawResponse;
};



/*
mutation DeliverSecondFactorMutation(
  $input: DeliverSecondFactorInput!
) {
  deliverSecondFactor(input: $input) {
    secondFactorOrErrors {
      __typename
      ... on SecondFactor {
        __typename
      }
      ... on Errors {
        errors {
          message
          code
          path
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
    "type": "DeliverSecondFactorInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "deliverSecondFactor",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "DeliverSecondFactorPayload",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "secondFactorOrErrors",
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
            "type": "Errors",
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "errors",
                "storageKey": null,
                "args": null,
                "concreteType": "Error",
                "plural": true,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "message",
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
                    "name": "path",
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
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "DeliverSecondFactorMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "DeliverSecondFactorMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "DeliverSecondFactorMutation",
    "id": null,
    "text": "mutation DeliverSecondFactorMutation(\n  $input: DeliverSecondFactorInput!\n) {\n  deliverSecondFactor(input: $input) {\n    secondFactorOrErrors {\n      __typename\n      ... on SecondFactor {\n        __typename\n      }\n      ... on Errors {\n        errors {\n          message\n          code\n          path\n          data\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'c402298ce18beafd017a078d05736694';
export default node;
