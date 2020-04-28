/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type CreateBackupSecondFactorsInput = {
    readonly clientMutationId?: string | null;
};
export type CreateBackupSecondFactorsMutationVariables = {
    input: CreateBackupSecondFactorsInput;
};
export type CreateBackupSecondFactorsMutationResponse = {
    readonly createBackupSecondFactors: {
        readonly secondFactorsOrErrors: {
            readonly secondFactors?: ReadonlyArray<{
                readonly code: string;
            }>;
        };
    } | null;
};
export type CreateBackupSecondFactorsMutation = {
    readonly response: CreateBackupSecondFactorsMutationResponse;
    readonly variables: CreateBackupSecondFactorsMutationVariables;
};



/*
mutation CreateBackupSecondFactorsMutation(
  $input: CreateBackupSecondFactorsInput!
) {
  createBackupSecondFactors(input: $input) {
    secondFactorsOrErrors {
      __typename
      ... on BackupSecondFactors {
        secondFactors {
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
    "type": "CreateBackupSecondFactorsInput!",
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
  "type": "BackupSecondFactors",
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "secondFactors",
      "storageKey": null,
      "args": null,
      "concreteType": "BackupSecondFactor",
      "plural": true,
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
  "fragment": {
    "kind": "Fragment",
    "name": "CreateBackupSecondFactorsMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createBackupSecondFactors",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateBackupSecondFactorsPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "secondFactorsOrErrors",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": [
              (v2/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateBackupSecondFactorsMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createBackupSecondFactors",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateBackupSecondFactorsPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "secondFactorsOrErrors",
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
              (v2/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "CreateBackupSecondFactorsMutation",
    "id": null,
    "text": "mutation CreateBackupSecondFactorsMutation(\n  $input: CreateBackupSecondFactorsInput!\n) {\n  createBackupSecondFactors(input: $input) {\n    secondFactorsOrErrors {\n      __typename\n      ... on BackupSecondFactors {\n        secondFactors {\n          code\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'a4d406599539fe830281a6bbd8394a27';
export default node;
