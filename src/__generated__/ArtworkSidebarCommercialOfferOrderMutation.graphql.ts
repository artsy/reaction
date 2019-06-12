/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type OrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type CreateOfferOrderWithArtworkInput = {
    readonly artworkId: string;
    readonly editionSetId?: string | null;
    readonly quantity?: number | null;
    readonly find_active_or_create?: boolean | null;
    readonly clientMutationId?: string | null;
};
export type ArtworkSidebarCommercialOfferOrderMutationVariables = {
    readonly input: CreateOfferOrderWithArtworkInput;
};
export type ArtworkSidebarCommercialOfferOrderMutationResponse = {
    readonly ecommerceCreateOfferOrderWithArtwork: {
        readonly orderOrError: ({
            readonly __typename: "OrderWithMutationSuccess";
            readonly order?: {
                readonly id: string;
                readonly mode: OrderModeEnum | null;
            } | null;
            readonly error?: {
                readonly type: string;
                readonly code: string;
                readonly data: string | null;
            } | null;
        } & ({
            readonly __typename: "OrderWithMutationSuccess";
            readonly order: {
                readonly id: string;
                readonly mode: OrderModeEnum | null;
            } | null;
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
export type ArtworkSidebarCommercialOfferOrderMutation = {
    readonly response: ArtworkSidebarCommercialOfferOrderMutationResponse;
    readonly variables: ArtworkSidebarCommercialOfferOrderMutationVariables;
};



/*
mutation ArtworkSidebarCommercialOfferOrderMutation(
  $input: CreateOfferOrderWithArtworkInput!
) {
  ecommerceCreateOfferOrderWithArtwork(input: $input) {
    orderOrError {
      __typename
      ... on OrderWithMutationSuccess {
        __typename
        order {
          __typename
          id
          mode
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
    "type": "CreateOfferOrderWithArtworkInput!",
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
    "name": "ArtworkSidebarCommercialOfferOrderMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "ecommerceCreateOfferOrderWithArtwork",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateOfferOrderWithArtworkPayload",
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
    "name": "ArtworkSidebarCommercialOfferOrderMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "ecommerceCreateOfferOrderWithArtwork",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateOfferOrderWithArtworkPayload",
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
    "name": "ArtworkSidebarCommercialOfferOrderMutation",
    "id": null,
    "text": "mutation ArtworkSidebarCommercialOfferOrderMutation(\n  $input: CreateOfferOrderWithArtworkInput!\n) {\n  ecommerceCreateOfferOrderWithArtwork(input: $input) {\n    orderOrError {\n      __typename\n      ... on OrderWithMutationSuccess {\n        __typename\n        order {\n          __typename\n          id\n          mode\n        }\n      }\n      ... on OrderWithMutationFailure {\n        error {\n          type\n          code\n          data\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'a45c6b861225fad53ced7393c9f62c10';
export default node;
