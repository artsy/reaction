/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type CreateOrderWithArtworkInput = {
    readonly artworkId: string;
    readonly editionSetId?: string | null;
    readonly quantity?: number | null;
    readonly clientMutationId?: string | null;
};
export type createTestEnvOrderMutationVariables = {
    readonly input: CreateOrderWithArtworkInput;
};
export type createTestEnvOrderMutationResponse = {
    readonly createOrderWithArtwork: ({
        readonly orderOrError: ({
            readonly order?: ({
                readonly id: string | null;
            }) | null;
            readonly error?: ({
                readonly type: string;
            }) | null;
        }) | null;
    }) | null;
};
export type createTestEnvOrderMutation = {
    readonly response: createTestEnvOrderMutationResponse;
    readonly variables: createTestEnvOrderMutationVariables;
};



/*
mutation createTestEnvOrderMutation(
  $input: CreateOrderWithArtworkInput!
) {
  createOrderWithArtwork(input: $input) {
    orderOrError {
      __typename
      ... on OrderWithMutationSuccess {
        order {
          __typename
          id
          __id: id
        }
      }
      ... on OrderWithMutationFailure {
        error {
          type
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
    "type": "CreateOrderWithArtworkInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input",
    "type": "CreateOrderWithArtworkInput!"
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
        }
      ]
    }
  ]
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
  "alias": "__id",
  "name": "id",
  "args": null,
  "storageKey": null
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
  "operationKind": "mutation",
  "name": "createTestEnvOrderMutation",
  "id": null,
  "text": "mutation createTestEnvOrderMutation(\n  $input: CreateOrderWithArtworkInput!\n) {\n  createOrderWithArtwork(input: $input) {\n    orderOrError {\n      __typename\n      ... on OrderWithMutationSuccess {\n        order {\n          __typename\n          id\n          __id: id\n        }\n      }\n      ... on OrderWithMutationFailure {\n        error {\n          type\n        }\n      }\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "createTestEnvOrderMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createOrderWithArtwork",
        "storageKey": null,
        "args": v1,
        "concreteType": "CreateOrderWithArtworkPayload",
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
                      v3,
                      v4
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "createTestEnvOrderMutation",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createOrderWithArtwork",
        "storageKey": null,
        "args": v1,
        "concreteType": "CreateOrderWithArtworkPayload",
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
              v5,
              v2,
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
                      v5,
                      v3,
                      v4
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
};
})();
(node as any).hash = '4e1e5ec5f78ed0846fb2350e87385a9a';
export default node;
