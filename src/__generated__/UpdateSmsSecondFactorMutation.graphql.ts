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
            readonly internalID?: string;
        };
    } | null;
};
export type UpdateSmsSecondFactorMutationRawResponse = {
    readonly updateSmsSecondFactor: ({
        readonly secondFactorOrErrors: {
            readonly __typename: string | null;
            readonly internalID: string;
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
    "type": "UpdateSmsSecondFactorInput!",
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
    "name": "UpdateSmsSecondFactorMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "updateSmsSecondFactor",
        "storageKey": null,
        "args": (v1/*: any*/),
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
              (v2/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "UpdateSmsSecondFactorMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "updateSmsSecondFactor",
        "storageKey": null,
        "args": (v1/*: any*/),
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
              (v2/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "UpdateSmsSecondFactorMutation",
    "id": null,
    "text": "mutation UpdateSmsSecondFactorMutation(\n  $input: UpdateSmsSecondFactorInput!\n) {\n  updateSmsSecondFactor(input: $input) {\n    secondFactorOrErrors {\n      __typename\n      ... on SecondFactor {\n        internalID\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'be11ac6f63e06fb7f4220f75fc56b329';
export default node;
