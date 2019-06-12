/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type OrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type AddInitialOfferToOrderInput = {
    readonly orderId: string;
    readonly offerPrice?: MoneyInput | null;
    readonly note?: string | null;
    readonly clientMutationId?: string | null;
};
export type MoneyInput = {
    readonly amount: number;
    readonly currencyCode: string;
};
export type OfferMutationVariables = {
    readonly input: AddInitialOfferToOrderInput;
};
export type OfferMutationResponse = {
    readonly ecommerceAddInitialOfferToOrder: {
        readonly orderOrError: ({
            readonly __typename: "OrderWithMutationSuccess";
            readonly order?: ({
                readonly id: string;
                readonly mode: OrderModeEnum | null;
                readonly totalListPrice: string | null;
                readonly totalListPriceCents: number | null;
                readonly myLastOffer?: {
                    readonly id: string;
                    readonly amountCents: number | null;
                    readonly note: string | null;
                } | null;
            } & ({
                readonly myLastOffer: {
                    readonly id: string;
                    readonly amountCents: number | null;
                    readonly note: string | null;
                } | null;
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
            readonly __typename: "OrderWithMutationSuccess";
            readonly order: ({
                readonly id: string;
                readonly mode: OrderModeEnum | null;
                readonly totalListPrice: string | null;
                readonly totalListPriceCents: number | null;
                readonly myLastOffer?: {
                    readonly id: string;
                    readonly amountCents: number | null;
                    readonly note: string | null;
                } | null;
            } & ({
                readonly myLastOffer: {
                    readonly id: string;
                    readonly amountCents: number | null;
                    readonly note: string | null;
                } | null;
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
export type OfferMutation = {
    readonly response: OfferMutationResponse;
    readonly variables: OfferMutationVariables;
};



/*
mutation OfferMutation(
  $input: AddInitialOfferToOrderInput!
) {
  ecommerceAddInitialOfferToOrder(input: $input) {
    orderOrError {
      __typename
      ... on OrderWithMutationSuccess {
        __typename
        order {
          __typename
          id
          mode
          totalListPrice
          totalListPriceCents
          ... on OfferOrder {
            myLastOffer {
              id
              amountCents
              note
            }
          }
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
    "type": "AddInitialOfferToOrderInput!",
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
  "name": "__typename",
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
  "kind": "ScalarField",
  "alias": null,
  "name": "mode",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "totalListPrice",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "totalListPriceCents",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "InlineFragment",
  "type": "OfferOrder",
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "myLastOffer",
      "storageKey": null,
      "args": null,
      "concreteType": "Offer",
      "plural": false,
      "selections": [
        (v3/*: any*/),
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "amountCents",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "note",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
},
v8 = {
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
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "OfferMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "ecommerceAddInitialOfferToOrder",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "AddInitialOfferToOrderPayload",
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
                  (v2/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "order",
                    "storageKey": null,
                    "args": null,
                    "concreteType": null,
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      (v4/*: any*/),
                      (v5/*: any*/),
                      (v6/*: any*/),
                      (v7/*: any*/)
                    ]
                  }
                ]
              },
              (v8/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "OfferMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "ecommerceAddInitialOfferToOrder",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "AddInitialOfferToOrderPayload",
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
              (v2/*: any*/),
              {
                "kind": "InlineFragment",
                "type": "OrderWithMutationSuccess",
                "selections": [
                  (v2/*: any*/),
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
                      (v3/*: any*/),
                      (v4/*: any*/),
                      (v5/*: any*/),
                      (v6/*: any*/),
                      (v7/*: any*/)
                    ]
                  }
                ]
              },
              (v8/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "OfferMutation",
    "id": null,
    "text": "mutation OfferMutation(\n  $input: AddInitialOfferToOrderInput!\n) {\n  ecommerceAddInitialOfferToOrder(input: $input) {\n    orderOrError {\n      __typename\n      ... on OrderWithMutationSuccess {\n        __typename\n        order {\n          __typename\n          id\n          mode\n          totalListPrice\n          totalListPriceCents\n          ... on OfferOrder {\n            myLastOffer {\n              id\n              amountCents\n              note\n            }\n          }\n        }\n      }\n      ... on OrderWithMutationFailure {\n        error {\n          type\n          code\n          data\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'ffcbdfafdb3c0f6337c146317bc4af2d';
export default node;
