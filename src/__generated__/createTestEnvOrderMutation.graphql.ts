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
    readonly createOrderWithArtwork: {
        readonly orderOrError: ({
            readonly order?: {
                readonly id: string;
            } | null;
            readonly error?: {
                readonly type: string;
            } | null;
        } & ({
            readonly order: {
                readonly id: string;
            } | null;
        } | {
            readonly error: {
                readonly type: string;
            } | null;
        } | {
            /*This will never be '% other', but we need some
            value in case none of the concrete values match.*/
            readonly __typename: "%other";
        })) | null;
    } | null;
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
    "variableName": "input"
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
v4 = {
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
    "name": "createTestEnvOrderMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createOrderWithArtwork",
        "storageKey": null,
        "args": (v1/*: any*/),
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
                      (v2/*: any*/)
                    ]
                  }
                ]
              },
              (v3/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "createTestEnvOrderMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createOrderWithArtwork",
        "storageKey": null,
        "args": (v1/*: any*/),
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
              (v4/*: any*/),
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
                      (v4/*: any*/),
                      (v2/*: any*/)
                    ]
                  }
                ]
              },
              (v3/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "createTestEnvOrderMutation",
    "id": null,
    "text": "mutation createTestEnvOrderMutation(\n  $input: CreateOrderWithArtworkInput!\n) {\n  createOrderWithArtwork(input: $input) {\n    orderOrError {\n      __typename\n      ... on OrderWithMutationSuccess {\n        order {\n          __typename\n          id\n        }\n      }\n      ... on OrderWithMutationFailure {\n        error {\n          type\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '4e1e5ec5f78ed0846fb2350e87385a9a';
export default node;
