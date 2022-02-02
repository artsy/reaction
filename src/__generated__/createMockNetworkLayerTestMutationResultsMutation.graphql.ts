/**
 * @generated SignedSource<<a49441e57c13bb705785e824d6ae3779>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CommerceOrderStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "PENDING" | "REFUNDED" | "SUBMITTED" | "%future added value";
export type CommerceBuyerAcceptOfferInput = {
  clientMutationId?: string | null;
  offerId: string;
};
export type createMockNetworkLayerTestMutationResultsMutation$variables = {
  input: CommerceBuyerAcceptOfferInput;
};
export type createMockNetworkLayerTestMutationResultsMutationVariables = createMockNetworkLayerTestMutationResultsMutation$variables;
export type createMockNetworkLayerTestMutationResultsMutation$data = {
  readonly commerceBuyerAcceptOffer: {
    readonly orderOrError: {
      readonly error?: {
        readonly type: string;
        readonly code: string;
        readonly data: string | null;
      };
      readonly order?: {
        readonly internalID: string;
        readonly state: CommerceOrderStateEnum;
      };
    };
  } | null;
};
export type createMockNetworkLayerTestMutationResultsMutationResponse = createMockNetworkLayerTestMutationResultsMutation$data;
export type createMockNetworkLayerTestMutationResultsMutation = {
  variables: createMockNetworkLayerTestMutationResultsMutationVariables;
  response: createMockNetworkLayerTestMutationResultsMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
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
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "CommerceApplicationError",
      "kind": "LinkedField",
      "name": "error",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "type",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "code",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "data",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CommerceOrderWithMutationFailure",
  "abstractKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "state",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "createMockNetworkLayerTestMutationResultsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CommerceBuyerAcceptOfferPayload",
        "kind": "LinkedField",
        "name": "commerceBuyerAcceptOffer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "orderOrError",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "order",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "CommerceOrderWithMutationSuccess",
                "abstractKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "createMockNetworkLayerTestMutationResultsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CommerceBuyerAcceptOfferPayload",
        "kind": "LinkedField",
        "name": "commerceBuyerAcceptOffer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "orderOrError",
            "plural": false,
            "selections": [
              (v5/*: any*/),
              (v2/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "order",
                    "plural": false,
                    "selections": [
                      (v5/*: any*/),
                      (v3/*: any*/),
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "id",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "type": "CommerceOrderWithMutationSuccess",
                "abstractKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "fd20ddec8c53dbc3c5f87987be488538",
    "id": null,
    "metadata": {},
    "name": "createMockNetworkLayerTestMutationResultsMutation",
    "operationKind": "mutation",
    "text": "mutation createMockNetworkLayerTestMutationResultsMutation(\n  $input: CommerceBuyerAcceptOfferInput!\n) {\n  commerceBuyerAcceptOffer(input: $input) {\n    orderOrError {\n      __typename\n      ... on CommerceOrderWithMutationFailure {\n        error {\n          type\n          code\n          data\n        }\n      }\n      ... on CommerceOrderWithMutationSuccess {\n        order {\n          __typename\n          internalID\n          state\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "dcfa0d5642e51295d881dcd55a1c3515";

export default node;
