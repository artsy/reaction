/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type OrderParticipantEnum = "BUYER" | "SELLER" | "%future added value";
export type FixFailedPaymentInput = {
    readonly offerId: string;
    readonly creditCardId: string;
    readonly clientMutationId?: string | null;
};
export type NewPaymentRouteSetOrderPaymentMutationVariables = {
    readonly input: FixFailedPaymentInput;
};
export type NewPaymentRouteSetOrderPaymentMutationResponse = {
    readonly ecommerceFixFailedPayment: {
        readonly orderOrError: ({
            readonly order?: ({
                readonly state: string | null;
                readonly creditCard: {
                    readonly id: string;
                    readonly name: string | null;
                    readonly street1: string | null;
                    readonly street2: string | null;
                    readonly city: string | null;
                    readonly state: string | null;
                    readonly country: string | null;
                    readonly postal_code: string | null;
                } | null;
                readonly awaitingResponseFrom?: OrderParticipantEnum | null;
            } & ({
                readonly awaitingResponseFrom: OrderParticipantEnum | null;
            } | {
                /*This will never be '% other', but we need some
                value in case none of the concrete values match.*/
                readonly __typename: "%other";
            })) | null;
            readonly error?: {
                readonly type: string;
                readonly code: string;
                readonly data: string | null;
            } | null;
        } & ({
            readonly order: ({
                readonly state: string | null;
                readonly creditCard: {
                    readonly id: string;
                    readonly name: string | null;
                    readonly street1: string | null;
                    readonly street2: string | null;
                    readonly city: string | null;
                    readonly state: string | null;
                    readonly country: string | null;
                    readonly postal_code: string | null;
                } | null;
                readonly awaitingResponseFrom?: OrderParticipantEnum | null;
            } & ({
                readonly awaitingResponseFrom: OrderParticipantEnum | null;
            } | {
                /*This will never be '% other', but we need some
                value in case none of the concrete values match.*/
                readonly __typename: "%other";
            })) | null;
        } | {
            readonly error: {
                readonly type: string;
                readonly code: string;
                readonly data: string | null;
            } | null;
        } | {
            /*This will never be '% other', but we need some
            value in case none of the concrete values match.*/
            readonly __typename: "%other";
        })) | null;
    } | null;
};
export type NewPaymentRouteSetOrderPaymentMutation = {
    readonly response: NewPaymentRouteSetOrderPaymentMutationResponse;
    readonly variables: NewPaymentRouteSetOrderPaymentMutationVariables;
};



/*
mutation NewPaymentRouteSetOrderPaymentMutation(
  $input: FixFailedPaymentInput!
) {
  ecommerceFixFailedPayment(input: $input) {
    orderOrError {
      __typename
      ... on OrderWithMutationSuccess {
        order {
          __typename
          state
          creditCard {
            id
            name
            street1
            street2
            city
            state
            country
            postal_code
          }
          ... on OfferOrder {
            awaitingResponseFrom
          }
          id
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
    "type": "FixFailedPaymentInput!",
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
  "name": "state",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "creditCard",
  "storageKey": null,
  "args": null,
  "concreteType": "CreditCard",
  "plural": false,
  "selections": [
    (v3/*: any*/),
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
    (v2/*: any*/),
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
    }
  ]
},
v5 = {
  "kind": "InlineFragment",
  "type": "OfferOrder",
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "awaitingResponseFrom",
      "args": null,
      "storageKey": null
    }
  ]
},
v6 = {
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
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "NewPaymentRouteSetOrderPaymentMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "ecommerceFixFailedPayment",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "FixFailedPaymentPayload",
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
                "kind": "InlineFragment",
                "type": "OrderWithMutationSuccess",
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "order",
                    "storageKey": null,
                    "args": null,
                    "concreteType": null,
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v4/*: any*/),
                      (v5/*: any*/)
                    ]
                  }
                ]
              },
              (v6/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "NewPaymentRouteSetOrderPaymentMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "ecommerceFixFailedPayment",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "FixFailedPaymentPayload",
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
              (v7/*: any*/),
              {
                "kind": "InlineFragment",
                "type": "OrderWithMutationSuccess",
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "order",
                    "storageKey": null,
                    "args": null,
                    "concreteType": null,
                    "plural": false,
                    "selections": [
                      (v7/*: any*/),
                      (v2/*: any*/),
                      (v4/*: any*/),
                      (v3/*: any*/),
                      (v5/*: any*/)
                    ]
                  }
                ]
              },
              (v6/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "NewPaymentRouteSetOrderPaymentMutation",
    "id": null,
    "text": "mutation NewPaymentRouteSetOrderPaymentMutation(\n  $input: FixFailedPaymentInput!\n) {\n  ecommerceFixFailedPayment(input: $input) {\n    orderOrError {\n      __typename\n      ... on OrderWithMutationSuccess {\n        order {\n          __typename\n          state\n          creditCard {\n            id\n            name\n            street1\n            street2\n            city\n            state\n            country\n            postal_code\n          }\n          ... on OfferOrder {\n            awaitingResponseFrom\n          }\n          id\n        }\n      }\n      ... on OrderWithMutationFailure {\n        error {\n          type\n          code\n          data\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '179cb4dd45718b90db8d8eab2626bb80';
export default node;
