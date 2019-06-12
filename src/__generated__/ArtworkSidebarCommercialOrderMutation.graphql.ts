/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type CommerceOrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type CommerceCreateOrderWithArtworkInput = {
    readonly artworkId: string;
    readonly clientMutationId?: string | null;
    readonly editionSetId?: string | null;
    readonly quantity?: number | null;
};
export type ArtworkSidebarCommercialOrderMutationVariables = {
    readonly input: CommerceCreateOrderWithArtworkInput;
};
export type ArtworkSidebarCommercialOrderMutationResponse = {
    readonly commerceCreateOrderWithArtwork: {
        readonly orderOrError: {
            readonly __typename: "CommerceOrderWithMutationSuccess";
            readonly order?: {
                readonly id: string;
                readonly mode: CommerceOrderModeEnum | null;
            };
            readonly error?: {
                readonly type: string;
                readonly code: string;
                readonly data: string | null;
            };
        } & ({
            readonly __typename: "CommerceOrderWithMutationSuccess";
            readonly order: {
                readonly id: string;
                readonly mode: CommerceOrderModeEnum | null;
            };
        } | {
            readonly error: {
                readonly type: string;
                readonly code: string;
                readonly data: string | null;
            };
        } | {
            /*This will never be '% other', but we need some
            value in case none of the concrete values match.*/
            readonly __typename: "%other";
        });
    } | null;
};
export type ArtworkSidebarCommercialOrderMutation = {
    readonly response: ArtworkSidebarCommercialOrderMutationResponse;
    readonly variables: ArtworkSidebarCommercialOrderMutationVariables;
};



/*
mutation ArtworkSidebarCommercialOrderMutation(
  $input: CommerceCreateOrderWithArtworkInput!
) {
  commerceCreateOrderWithArtwork(input: $input) {
    orderOrError {
      __typename
      ... on CommerceOrderWithMutationSuccess {
        __typename
        order {
          __typename
          id
          mode
        }
      }
      ... on CommerceOrderWithMutationFailure {
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
    "type": "CommerceCreateOrderWithArtworkInput!",
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
  "kind": "InlineFragment",
  "type": "CommerceOrderWithMutationFailure",
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "error",
      "storageKey": null,
      "args": null,
      "concreteType": "CommerceApplicationError",
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
    "name": "ArtworkSidebarCommercialOrderMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "commerceCreateOrderWithArtwork",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CommerceCreateOrderWithArtworkPayload",
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
                "type": "CommerceOrderWithMutationSuccess",
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
                      (v4/*: any*/)
                    ]
                  }
                ]
              },
              (v5/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ArtworkSidebarCommercialOrderMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "commerceCreateOrderWithArtwork",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CommerceCreateOrderWithArtworkPayload",
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
                "type": "CommerceOrderWithMutationSuccess",
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
                      (v4/*: any*/)
                    ]
                  }
                ]
              },
              (v5/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "ArtworkSidebarCommercialOrderMutation",
    "id": null,
    "text": "mutation ArtworkSidebarCommercialOrderMutation(\n  $input: CommerceCreateOrderWithArtworkInput!\n) {\n  commerceCreateOrderWithArtwork(input: $input) {\n    orderOrError {\n      __typename\n      ... on CommerceOrderWithMutationSuccess {\n        __typename\n        order {\n          __typename\n          id\n          mode\n        }\n      }\n      ... on CommerceOrderWithMutationFailure {\n        error {\n          type\n          code\n          data\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'f717141f6a7d35c3ec8158089159d2eb';
export default node;
