/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type startIdentityVerificationMutationInput = {
    readonly identityVerificationId: string;
    readonly clientMutationId?: string | null;
};
export type IdentityVerificationAppStartFlowMutationVariables = {
    input: startIdentityVerificationMutationInput;
};
export type IdentityVerificationAppStartFlowMutationResponse = {
    readonly startIdentityVerification: {
        readonly startIdentityVerificationResponseOrError: {
            readonly identityVerificationFlowUrl?: string | null;
            readonly mutationError?: {
                readonly detail: string | null;
                readonly error: string | null;
                readonly message: string | null;
            } | null;
        } | null;
    } | null;
};
export type IdentityVerificationAppStartFlowMutation = {
    readonly response: IdentityVerificationAppStartFlowMutationResponse;
    readonly variables: IdentityVerificationAppStartFlowMutationVariables;
};



/*
mutation IdentityVerificationAppStartFlowMutation(
  $input: startIdentityVerificationMutationInput!
) {
  startIdentityVerification(input: $input) {
    startIdentityVerificationResponseOrError {
      __typename
      ... on StartIdentityVerificationSuccess {
        identityVerificationFlowUrl
      }
      ... on StartIdentityVerificationFailure {
        mutationError {
          detail
          error
          message
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
    "type": "startIdentityVerificationMutationInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "kind": "InlineFragment",
  "type": "StartIdentityVerificationSuccess",
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "identityVerificationFlowUrl",
      "args": null,
      "storageKey": null
    }
  ]
},
v3 = {
  "kind": "InlineFragment",
  "type": "StartIdentityVerificationFailure",
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "mutationError",
      "storageKey": null,
      "args": null,
      "concreteType": "GravityMutationError",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "detail",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "error",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "message",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "IdentityVerificationAppStartFlowMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "startIdentityVerification",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "startIdentityVerificationMutationPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "startIdentityVerificationResponseOrError",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "IdentityVerificationAppStartFlowMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "startIdentityVerification",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "startIdentityVerificationMutationPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "startIdentityVerificationResponseOrError",
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
              (v2/*: any*/),
              (v3/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "IdentityVerificationAppStartFlowMutation",
    "id": null,
    "text": "mutation IdentityVerificationAppStartFlowMutation(\n  $input: startIdentityVerificationMutationInput!\n) {\n  startIdentityVerification(input: $input) {\n    startIdentityVerificationResponseOrError {\n      __typename\n      ... on StartIdentityVerificationSuccess {\n        identityVerificationFlowUrl\n      }\n      ... on StartIdentityVerificationFailure {\n        mutationError {\n          detail\n          error\n          message\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '374c1d95bf34f38f7a44b86d17bbb620';
export default node;
