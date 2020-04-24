/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type EnableSecondFactorInput = {
    readonly clientMutationId?: string | null;
    readonly code: string;
    readonly secondFactorID: string;
};
export type EnableSecondFactorMutationVariables = {
    input: EnableSecondFactorInput;
};
export type EnableSecondFactorMutationResponse = {
    readonly enableSecondFactor: {
        readonly secondFactorOrErrors: {
            readonly __typename: "Errors";
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
export type EnableSecondFactorMutationRawResponse = {
    readonly enableSecondFactor: ({
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
export type EnableSecondFactorMutation = {
    readonly response: EnableSecondFactorMutationResponse;
    readonly variables: EnableSecondFactorMutationVariables;
    readonly rawResponse: EnableSecondFactorMutationRawResponse;
};



/*
mutation EnableSecondFactorMutation(
  $input: EnableSecondFactorInput!
) {
  enableSecondFactor(input: $input) {
    secondFactorOrErrors {
      __typename
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
    "type": "EnableSecondFactorInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "enableSecondFactor",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "EnableSecondFactorPayload",
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
    "name": "EnableSecondFactorMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "EnableSecondFactorMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "EnableSecondFactorMutation",
    "id": null,
    "text": "mutation EnableSecondFactorMutation(\n  $input: EnableSecondFactorInput!\n) {\n  enableSecondFactor(input: $input) {\n    secondFactorOrErrors {\n      __typename\n      ... on Errors {\n        errors {\n          message\n          code\n          path\n          data\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'ffb17c2066c101e9191e3b58d66a6133';
export default node;
