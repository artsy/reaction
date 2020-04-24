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
            readonly internalID?: string;
        };
    } | null;
};
export type CreateSmsSecondFactorMutationRawResponse = {
    readonly createSmsSecondFactor: ({
        readonly secondFactorOrErrors: {
            readonly __typename: string | null;
            readonly internalID: string;
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
      ... on SecondFactor {
        internalID
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
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "internalID",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "CreateSmsSecondFactorMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createSmsSecondFactor",
        "storageKey": null,
        "args": (v1/*: any*/),
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
              (v2/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateSmsSecondFactorMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createSmsSecondFactor",
        "storageKey": null,
        "args": (v1/*: any*/),
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
              (v2/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "CreateSmsSecondFactorMutation",
    "id": null,
    "text": "mutation CreateSmsSecondFactorMutation(\n  $input: CreateSmsSecondFactorInput!\n) {\n  createSmsSecondFactor(input: $input) {\n    secondFactorOrErrors {\n      __typename\n      ... on SecondFactor {\n        internalID\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '5e54a7c4e6e04e38cd998451277aeb3c';
export default node;
