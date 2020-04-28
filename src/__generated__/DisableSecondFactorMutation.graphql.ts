/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type DisableSecondFactorInput = {
    readonly clientMutationId?: string | null;
    readonly secondFactorID: string;
};
export type DisableSecondFactorMutationVariables = {
    input: DisableSecondFactorInput;
};
export type DisableSecondFactorMutationResponse = {
    readonly disableSecondFactor: {
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
export type DisableSecondFactorMutationRawResponse = {
    readonly disableSecondFactor: ({
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
export type DisableSecondFactorMutation = {
    readonly response: DisableSecondFactorMutationResponse;
    readonly variables: DisableSecondFactorMutationVariables;
    readonly rawResponse: DisableSecondFactorMutationRawResponse;
};



/*
mutation DisableSecondFactorMutation(
  $input: DisableSecondFactorInput!
) {
  disableSecondFactor(input: $input) {
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
    "type": "DisableSecondFactorInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "disableSecondFactor",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "DisableSecondFactorPayload",
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
    "name": "DisableSecondFactorMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "DisableSecondFactorMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "DisableSecondFactorMutation",
    "id": null,
    "text": "mutation DisableSecondFactorMutation(\n  $input: DisableSecondFactorInput!\n) {\n  disableSecondFactor(input: $input) {\n    secondFactorOrErrors {\n      __typename\n      ... on SecondFactor {\n        __typename\n      }\n      ... on Errors {\n        errors {\n          message\n          code\n          path\n          data\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'bf58288b435d50e46f140b02adef6f1e';
export default node;
