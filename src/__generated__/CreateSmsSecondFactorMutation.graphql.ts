/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type CreateSmsSecondFactorInput = {
    readonly attributes: SmsSecondFactorAttributes;
    readonly clientMutationId?: string | null;
};
export type SmsSecondFactorAttributes = {
    readonly countryCode?: string | null;
    readonly phoneNumber?: string | null;
};
export type CreateSmsSecondFactorMutationVariables = {
    input: CreateSmsSecondFactorInput;
};
export type CreateSmsSecondFactorMutationResponse = {
    readonly createSmsSecondFactor: {
        readonly secondFactorOrErrors: {
            readonly __typename: "SmsSecondFactor";
            readonly internalID: string;
        } | {
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
export type CreateSmsSecondFactorMutationRawResponse = {
    readonly createSmsSecondFactor: ({
        readonly secondFactorOrErrors: {
            readonly __typename: "SmsSecondFactor";
            readonly internalID: string;
        } | {
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
export type CreateSmsSecondFactorMutation = {
    readonly response: CreateSmsSecondFactorMutationResponse;
    readonly variables: CreateSmsSecondFactorMutationVariables;
    readonly rawResponse: CreateSmsSecondFactorMutationRawResponse;
};



/*
mutation CreateSmsSecondFactorMutation(
  $input: CreateSmsSecondFactorInput!
) {
  createSmsSecondFactor(input: $input) {
    secondFactorOrErrors {
      __typename
      ... on SmsSecondFactor {
        internalID
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
    "type": "CreateSmsSecondFactorInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "createSmsSecondFactor",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "CreateSmsSecondFactorPayload",
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
            "type": "SmsSecondFactor",
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "internalID",
                "args": null,
                "storageKey": null
              }
            ]
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
    "name": "CreateSmsSecondFactorMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateSmsSecondFactorMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "CreateSmsSecondFactorMutation",
    "id": null,
    "text": "mutation CreateSmsSecondFactorMutation(\n  $input: CreateSmsSecondFactorInput!\n) {\n  createSmsSecondFactor(input: $input) {\n    secondFactorOrErrors {\n      __typename\n      ... on SmsSecondFactor {\n        internalID\n      }\n      ... on Errors {\n        errors {\n          message\n          code\n          path\n          data\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '2338529ea8cab5fd4ddd92cc338d8713';
export default node;
