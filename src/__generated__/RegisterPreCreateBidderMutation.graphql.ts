/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type CreditCardInput = {
    readonly token: string;
    readonly oneTimeUse?: boolean | null;
    readonly clientMutationId?: string | null;
};
export type UpdateMyProfileInput = {
    readonly name?: string | null;
    readonly email?: string | null;
    readonly phone?: string | null;
    readonly location?: EditableLocation | null;
    readonly collector_level?: number | null;
    readonly price_range_min?: number | null;
    readonly price_range_max?: number | null;
    readonly clientMutationId?: string | null;
};
export type EditableLocation = {
    readonly address?: string | null;
    readonly address_2?: string | null;
    readonly city?: string | null;
    readonly country?: string | null;
    readonly summary?: string | null;
    readonly postal_code?: string | null;
    readonly state?: string | null;
    readonly state_code?: string | null;
};
export type RegisterPreCreateBidderMutationVariables = {
    readonly creditCardInput: CreditCardInput;
    readonly profileInput: UpdateMyProfileInput;
};
export type RegisterPreCreateBidderMutationResponse = {
    readonly updateMyUserProfile: ({
        readonly user: ({
            readonly id: string;
        }) | null;
    }) | null;
    readonly createCreditCard: ({
        readonly creditCardOrError: ({
            readonly creditCardEdge?: ({
                readonly node: ({
                    readonly last_digits: string;
                }) | null;
            }) | null;
            readonly mutationError?: ({
                readonly type: string | null;
                readonly message: string | null;
                readonly detail: string | null;
            }) | null;
        }) | null;
    }) | null;
};
export type RegisterPreCreateBidderMutation = {
    readonly response: RegisterPreCreateBidderMutationResponse;
    readonly variables: RegisterPreCreateBidderMutationVariables;
};



/*
mutation RegisterPreCreateBidderMutation(
  $creditCardInput: CreditCardInput!
  $profileInput: UpdateMyProfileInput!
) {
  updateMyUserProfile(input: $profileInput) {
    user {
      id
      __id
    }
  }
  createCreditCard(input: $creditCardInput) {
    creditCardOrError {
      __typename
      ... on CreditCardMutationSuccess {
        creditCardEdge {
          node {
            last_digits
            __id
          }
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
    "name": "creditCardInput",
    "type": "CreditCardInput!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "profileInput",
    "type": "UpdateMyProfileInput!",
    "defaultValue": null
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "updateMyUserProfile",
  "storageKey": null,
  "args": [
    {
      "kind": "Variable",
      "name": "input",
      "variableName": "profileInput",
      "type": "UpdateMyProfileInput!"
    }
  ],
  "concreteType": "UpdateMyProfilePayload",
  "plural": false,
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "user",
      "storageKey": null,
      "args": null,
      "concreteType": "User",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "id",
          "args": null,
          "storageKey": null
        },
        v1
      ]
    }
  ]
},
v3 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "creditCardInput",
    "type": "CreditCardInput!"
  }
],
v4 = {
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
v5 = {
  "kind": "InlineFragment",
  "type": "CreditCardMutationSuccess",
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "creditCardEdge",
      "storageKey": null,
      "args": null,
      "concreteType": "CreditCardEdge",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "node",
          "storageKey": null,
          "args": null,
          "concreteType": "CreditCard",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "last_digits",
              "args": null,
              "storageKey": null
            },
            v1
          ]
        }
      ]
    }
  ]
};
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "RegisterPreCreateBidderMutation",
  "id": null,
  "text": "mutation RegisterPreCreateBidderMutation(\n  $creditCardInput: CreditCardInput!\n  $profileInput: UpdateMyProfileInput!\n) {\n  updateMyUserProfile(input: $profileInput) {\n    user {\n      id\n      __id\n    }\n  }\n  createCreditCard(input: $creditCardInput) {\n    creditCardOrError {\n      __typename\n      ... on CreditCardMutationSuccess {\n        creditCardEdge {\n          node {\n            last_digits\n            __id\n          }\n        }\n      }\n      ... on CreditCardMutationFailure {\n        mutationError {\n          type\n          message\n          detail\n        }\n      }\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "RegisterPreCreateBidderMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      v2,
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createCreditCard",
        "storageKey": null,
        "args": v3,
        "concreteType": "CreditCardPayload",
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
              v4,
              v5
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "RegisterPreCreateBidderMutation",
    "argumentDefinitions": v0,
    "selections": [
      v2,
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createCreditCard",
        "storageKey": null,
        "args": v3,
        "concreteType": "CreditCardPayload",
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
              v4,
              v5
            ]
          }
        ]
      }
    ]
  }
};
})();
(node as any).hash = 'd87757512a4955f1cf1ab27d2a981486';
export default node;
