/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type DeleteCreditCardInput = {
    readonly id: string;
    readonly clientMutationId?: string | null;
};
export type SavedCreditCardsDeleteCreditCardMutationVariables = {
    readonly input: DeleteCreditCardInput;
};
export type SavedCreditCardsDeleteCreditCardMutationResponse = {
    readonly deleteCreditCard: ({
        readonly creditCardOrError: ({
            readonly creditCard?: ({
                readonly id: string;
                readonly __id: string;
            }) | null;
            readonly mutationError?: ({
                readonly type: string | null;
                readonly message: string | null;
                readonly detail: string | null;
            }) | null;
        }) | null;
    }) | null;
};
export type SavedCreditCardsDeleteCreditCardMutation = {
    readonly response: SavedCreditCardsDeleteCreditCardMutationResponse;
    readonly variables: SavedCreditCardsDeleteCreditCardMutationVariables;
};



/*
mutation SavedCreditCardsDeleteCreditCardMutation(
  $input: DeleteCreditCardInput!
) {
  deleteCreditCard(input: $input) {
    creditCardOrError {
      __typename
      ... on CreditCardMutationSuccess {
        creditCard {
          id
          __id
        }
      }
      ... on CreditCardMutationFailure {
        mutationError {
          type
          message
          detail
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
    "type": "DeleteCreditCardInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input",
    "type": "DeleteCreditCardInput!"
  }
],
v2 = {
  "kind": "InlineFragment",
  "type": "CreditCardMutationFailure",
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
          "name": "type",
          "args": null,
          "storageKey": null
        },
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
          "name": "detail",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
},
v3 = {
  "kind": "InlineFragment",
  "type": "CreditCardMutationSuccess",
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "creditCard",
      "storageKey": null,
      "args": null,
      "concreteType": "CreditCard",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "id",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "__id",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "SavedCreditCardsDeleteCreditCardMutation",
  "id": null,
  "text": "mutation SavedCreditCardsDeleteCreditCardMutation(\n  $input: DeleteCreditCardInput!\n) {\n  deleteCreditCard(input: $input) {\n    creditCardOrError {\n      __typename\n      ... on CreditCardMutationSuccess {\n        creditCard {\n          id\n          __id\n        }\n      }\n      ... on CreditCardMutationFailure {\n        mutationError {\n          type\n          message\n          detail\n        }\n      }\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "SavedCreditCardsDeleteCreditCardMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "deleteCreditCard",
        "storageKey": null,
        "args": v1,
        "concreteType": "DeleteCreditCardPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "creditCardOrError",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": [
              v2,
              v3
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "SavedCreditCardsDeleteCreditCardMutation",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "deleteCreditCard",
        "storageKey": null,
        "args": v1,
        "concreteType": "DeleteCreditCardPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "creditCardOrError",
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
              v2,
              v3
            ]
          }
        ]
      }
    ]
  }
};
})();
(node as any).hash = 'fdbb2e721cfef50fc61b817332812582';
export default node;
