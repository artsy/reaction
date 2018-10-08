/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type SetOrderPaymentInput = {
    readonly orderId: string;
    readonly creditCardId: string;
    readonly clientMutationId?: string | null;
};
export type PaymentRouteSetOrderPaymentMutationVariables = {
    readonly input: SetOrderPaymentInput;
};
export type PaymentRouteSetOrderPaymentMutationResponse = {
    readonly ecommerceSetOrderPayment: ({
        readonly orderOrError: ({
            readonly order?: ({
                readonly creditCard: ({
                    readonly id: string;
                    readonly name: string | null;
                    readonly street1: string | null;
                    readonly street2: string | null;
                    readonly city: string | null;
                    readonly state: string | null;
                    readonly country: string | null;
                    readonly postal_code: string | null;
                }) | null;
            }) | null;
            readonly error?: ({
                readonly type: string;
                readonly code: string;
                readonly data: string | null;
            }) | null;
        }) | null;
    }) | null;
};
export type PaymentRouteSetOrderPaymentMutation = {
    readonly response: PaymentRouteSetOrderPaymentMutationResponse;
    readonly variables: PaymentRouteSetOrderPaymentMutationVariables;
};



/*
mutation PaymentRouteSetOrderPaymentMutation(
  $input: SetOrderPaymentInput!
) {
  ecommerceSetOrderPayment(input: $input) {
    orderOrError {
      __typename
      ... on OrderWithMutationSuccess {
        order {
          creditCard {
            id
            name
            street1
            street2
            city
            state
            country
            postal_code
            __id
          }
          __id: id
        }
      }
      ... on OrderWithMutationFailure {
        error {
          type
          code
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
    "type": "SetOrderPaymentInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input",
    "type": "SetOrderPaymentInput!"
  }
],
v2 = {
  "kind": "InlineFragment",
  "type": "OrderWithMutationFailure",
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "error",
      "storageKey": null,
      "args": null,
      "concreteType": "EcommerceError",
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
          "name": "code",
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
},
v3 = {
  "kind": "InlineFragment",
  "type": "OrderWithMutationSuccess",
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "order",
      "storageKey": null,
      "args": null,
      "concreteType": "Order",
      "plural": false,
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
              "name": "__id",
              "args": null,
              "storageKey": null
            }
          ]
        },
        {
          "kind": "ScalarField",
          "alias": "__id",
          "name": "id",
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
  "name": "PaymentRouteSetOrderPaymentMutation",
  "id": null,
  "text": "mutation PaymentRouteSetOrderPaymentMutation(\n  $input: SetOrderPaymentInput!\n) {\n  ecommerceSetOrderPayment(input: $input) {\n    orderOrError {\n      __typename\n      ... on OrderWithMutationSuccess {\n        order {\n          creditCard {\n            id\n            name\n            street1\n            street2\n            city\n            state\n            country\n            postal_code\n            __id\n          }\n          __id: id\n        }\n      }\n      ... on OrderWithMutationFailure {\n        error {\n          type\n          code\n          data\n        }\n      }\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "PaymentRouteSetOrderPaymentMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "ecommerceSetOrderPayment",
        "storageKey": null,
        "args": v1,
        "concreteType": "SetOrderPaymentPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "orderOrError",
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
    "name": "PaymentRouteSetOrderPaymentMutation",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "ecommerceSetOrderPayment",
        "storageKey": null,
        "args": v1,
        "concreteType": "SetOrderPaymentPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "orderOrError",
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
(node as any).hash = '788e14cf29d4978ff12b9d07d8bce050';
export default node;
