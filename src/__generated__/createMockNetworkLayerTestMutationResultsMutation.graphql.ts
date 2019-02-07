/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type buyerAcceptOfferInput = {
    readonly offerId: string;
    readonly clientMutationId?: string | null;
};
export type createMockNetworkLayerTestMutationResultsMutationVariables = {
    readonly input: buyerAcceptOfferInput;
};
export type createMockNetworkLayerTestMutationResultsMutationResponse = {
    readonly ecommerceBuyerAcceptOffer: ({
        readonly orderOrError: ({
            readonly error?: ({
                readonly type: string;
                readonly code: string;
                readonly data: string | null;
            }) | null;
            readonly order?: ({
                readonly id: string | null;
                readonly state: string | null;
            }) | null;
        }) | null;
    }) | null;
};
export type createMockNetworkLayerTestMutationResultsMutation = {
    readonly response: createMockNetworkLayerTestMutationResultsMutationResponse;
    readonly variables: createMockNetworkLayerTestMutationResultsMutationVariables;
};



/*
mutation createMockNetworkLayerTestMutationResultsMutation(
  $input: buyerAcceptOfferInput!
) {
  ecommerceBuyerAcceptOffer(input: $input) {
    orderOrError {
      __typename
      ... on OrderWithMutationFailure {
        error {
          type
          code
          data
        }
      }
      ... on OrderWithMutationSuccess {
        order {
          __typename
          id
          state
          __id: id
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
    "type": "buyerAcceptOfferInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input",
    "type": "buyerAcceptOfferInput!"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "state",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": "__id",
  "name": "id",
  "args": null,
  "storageKey": null
},
v5 = {
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
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "createMockNetworkLayerTestMutationResultsMutation",
  "id": null,
  "text": "mutation createMockNetworkLayerTestMutationResultsMutation(\n  $input: buyerAcceptOfferInput!\n) {\n  ecommerceBuyerAcceptOffer(input: $input) {\n    orderOrError {\n      __typename\n      ... on OrderWithMutationFailure {\n        error {\n          type\n          code\n          data\n        }\n      }\n      ... on OrderWithMutationSuccess {\n        order {\n          __typename\n          id\n          state\n          __id: id\n        }\n      }\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "createMockNetworkLayerTestMutationResultsMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "ecommerceBuyerAcceptOffer",
        "storageKey": null,
        "args": v1,
        "concreteType": "buyerAcceptOfferPayload",
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
                      v2,
                      v3,
                      v4
                    ]
                  }
                ]
              },
              v5
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "createMockNetworkLayerTestMutationResultsMutation",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "ecommerceBuyerAcceptOffer",
        "storageKey": null,
        "args": v1,
        "concreteType": "buyerAcceptOfferPayload",
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
              v6,
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
                      v6,
                      v2,
                      v3,
                      v4
                    ]
                  }
                ]
              },
              v5
            ]
          }
        ]
      }
    ]
  }
};
})();
(node as any).hash = '6848e3708cdf56efbf9caef4814bd3ac';
export default node;
