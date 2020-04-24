/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type UpdateSmsSecondFactorInput = {
    readonly attributes: SmsSecondFactorAttributes;
    readonly clientMutationId?: string | null;
    readonly secondFactorID: string;
};
export type SmsSecondFactorAttributes = {
    readonly countryCode?: string | null;
    readonly phoneNumber?: string | null;
};
export type UpdateSmsSecondFactorMutationVariables = {
    input: UpdateSmsSecondFactorInput;
};
export type UpdateSmsSecondFactorMutationResponse = {
    readonly updateSmsSecondFactor: {
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
export type UpdateSmsSecondFactorMutationRawResponse = {
    readonly updateSmsSecondFactor: ({
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
export type UpdateSmsSecondFactorMutation = {
    readonly response: UpdateSmsSecondFactorMutationResponse;
    readonly variables: UpdateSmsSecondFactorMutationVariables;
    readonly rawResponse: UpdateSmsSecondFactorMutationRawResponse;
};



/*
mutation UpdateSmsSecondFactorMutation(
  $input: UpdateSmsSecondFactorInput!
) {
  updateSmsSecondFactor(input: $input) {
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
    "type": "UpdateSmsSecondFactorInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "updateSmsSecondFactor",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "UpdateSmsSecondFactorPayload",
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
    "name": "UpdateSmsSecondFactorMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "UpdateSmsSecondFactorMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "UpdateSmsSecondFactorMutation",
    "id": null,
    "text": "mutation UpdateSmsSecondFactorMutation(\n  $input: UpdateSmsSecondFactorInput!\n) {\n  updateSmsSecondFactor(input: $input) {\n    secondFactorOrErrors {\n      __typename\n      ... on Errors {\n        errors {\n          message\n          code\n          path\n          data\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '3dd9c9b6bb6a91d402a243c7b5007b83';
export default node;
