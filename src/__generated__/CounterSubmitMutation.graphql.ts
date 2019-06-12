/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type OrderParticipantEnum = "BUYER" | "SELLER" | "%future added value";
export type submitPendingOfferInput = {
    readonly offerId: string;
    readonly clientMutationId?: string | null;
};
export type CounterSubmitMutationVariables = {
    readonly input: submitPendingOfferInput;
};
export type CounterSubmitMutationResponse = {
    readonly ecommerceSubmitPendingOffer: {
        readonly orderOrError: ({
            readonly order?: ({
                readonly state: string | null;
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
export type CounterSubmitMutation = {
    readonly response: CounterSubmitMutationResponse;
    readonly variables: CounterSubmitMutationVariables;
};



/*
mutation CounterSubmitMutation(
  $input: submitPendingOfferInput!
) {
  ecommerceSubmitPendingOffer(input: $input) {
    orderOrError {
      __typename
      ... on OrderWithMutationSuccess {
        order {
          __typename
          state
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
    "type": "submitPendingOfferInput!",
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
v4 = {
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
v5 = {
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
    "name": "CounterSubmitMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "ecommerceSubmitPendingOffer",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "submitPendingOfferPayload",
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
                      (v3/*: any*/)
                    ]
                  }
                ]
              },
              (v4/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "CounterSubmitMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "ecommerceSubmitPendingOffer",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "submitPendingOfferPayload",
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
              (v5/*: any*/),
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
                      (v5/*: any*/),
                      (v2/*: any*/),
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "id",
                        "args": null,
                        "storageKey": null
                      },
                      (v3/*: any*/)
                    ]
                  }
                ]
              },
              (v4/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "CounterSubmitMutation",
    "id": null,
    "text": "mutation CounterSubmitMutation(\n  $input: submitPendingOfferInput!\n) {\n  ecommerceSubmitPendingOffer(input: $input) {\n    orderOrError {\n      __typename\n      ... on OrderWithMutationSuccess {\n        order {\n          __typename\n          state\n          ... on OfferOrder {\n            awaitingResponseFrom\n          }\n          id\n        }\n      }\n      ... on OrderWithMutationFailure {\n        error {\n          type\n          code\n          data\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '519236c531b3a3899043ee97c452894d';
export default node;
