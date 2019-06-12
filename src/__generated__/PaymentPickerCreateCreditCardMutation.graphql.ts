/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type CreditCardInput = {
    readonly token: string;
    readonly oneTimeUse?: boolean | null;
    readonly clientMutationId?: string | null;
};
export type PaymentPickerCreateCreditCardMutationVariables = {
    readonly input: CreditCardInput;
};
export type PaymentPickerCreateCreditCardMutationResponse = {
    readonly createCreditCard: {
        readonly creditCardOrError: ({
            readonly creditCard?: {
                readonly id: string;
                readonly name: string | null;
                readonly street1: string | null;
                readonly street2: string | null;
                readonly city: string | null;
                readonly state: string | null;
                readonly country: string | null;
                readonly postal_code: string | null;
                readonly expiration_month: number;
                readonly expiration_year: number;
                readonly last_digits: string;
                readonly brand: string;
            } | null;
            readonly mutationError?: {
                readonly type: string | null;
                readonly message: string | null;
                readonly detail: string | null;
            } | null;
        } & ({
            readonly creditCard: {
                readonly id: string;
                readonly name: string | null;
                readonly street1: string | null;
                readonly street2: string | null;
                readonly city: string | null;
                readonly state: string | null;
                readonly country: string | null;
                readonly postal_code: string | null;
                readonly expiration_month: number;
                readonly expiration_year: number;
                readonly last_digits: string;
                readonly brand: string;
            } | null;
        } | {
            readonly mutationError: {
                readonly type: string | null;
                readonly message: string | null;
                readonly detail: string | null;
            } | null;
        } | {
            /*This will never be '% other', but we need some
            value in case none of the concrete values match.*/
            readonly __typename: "%other";
        })) | null;
    } | null;
};
export type PaymentPickerCreateCreditCardMutation = {
    readonly response: PaymentPickerCreateCreditCardMutationResponse;
    readonly variables: PaymentPickerCreateCreditCardMutationVariables;
};



/*
mutation PaymentPickerCreateCreditCardMutation(
  $input: CreditCardInput!
) {
  createCreditCard(input: $input) {
    creditCardOrError {
      __typename
      ... on CreditCardMutationSuccess {
        creditCard {
          id
          name
          street1
          street2
          city
          state
          country
          postal_code
          expiration_month
          expiration_year
          last_digits
          brand
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
    "type": "CreditCardInput!",
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
          "name": "name",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "street1",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "street2",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "city",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "state",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "country",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "postal_code",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "expiration_month",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "expiration_year",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "last_digits",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "brand",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
},
v3 = {
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
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "PaymentPickerCreateCreditCardMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createCreditCard",
        "storageKey": null,
        "args": (v1/*: any*/),
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
    "name": "PaymentPickerCreateCreditCardMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createCreditCard",
        "storageKey": null,
        "args": (v1/*: any*/),
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
    "name": "PaymentPickerCreateCreditCardMutation",
    "id": null,
    "text": "mutation PaymentPickerCreateCreditCardMutation(\n  $input: CreditCardInput!\n) {\n  createCreditCard(input: $input) {\n    creditCardOrError {\n      __typename\n      ... on CreditCardMutationSuccess {\n        creditCard {\n          id\n          name\n          street1\n          street2\n          city\n          state\n          country\n          postal_code\n          expiration_month\n          expiration_year\n          last_digits\n          brand\n        }\n      }\n      ... on CreditCardMutationFailure {\n        mutationError {\n          type\n          message\n          detail\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '950b1048ff38ca844437401bfbbdceef';
export default node;
