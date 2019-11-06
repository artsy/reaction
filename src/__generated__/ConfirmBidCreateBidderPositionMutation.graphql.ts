/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type BidderPositionInput = {
    readonly sale_id: string;
    readonly artwork_id: string;
    readonly max_bid_amount_cents: number;
    readonly clientMutationId?: string | null;
};
export type ConfirmBidCreateBidderPositionMutationVariables = {
    readonly input: BidderPositionInput;
};
export type ConfirmBidCreateBidderPositionMutationResponse = {
    readonly createBidderPosition: ({
        readonly result: ({
            readonly position: ({
                readonly id: string;
                readonly sale_artwork: ({
                    readonly sale: ({
                        readonly registrationStatus: ({
                            readonly id: string;
                        }) | null;
                    }) | null;
                }) | null;
            }) | null;
            readonly status: string;
            readonly messageHeader: string | null;
        }) | null;
    }) | null;
};
export type ConfirmBidCreateBidderPositionMutation = {
    readonly response: ConfirmBidCreateBidderPositionMutationResponse;
    readonly variables: ConfirmBidCreateBidderPositionMutationVariables;
};



/*
mutation ConfirmBidCreateBidderPositionMutation(
  $input: BidderPositionInput!
) {
  createBidderPosition(input: $input) {
    result {
      position {
        id
        sale_artwork {
          sale {
            registrationStatus {
              id
              __id
            }
            __id
          }
          __id
        }
        __id
      }
      status
      messageHeader: message_header
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "BidderPositionInput!",
    "defaultValue": null
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v3 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "createBidderPosition",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input",
        "type": "BidderPositionInput!"
      }
    ],
    "concreteType": "BidderPositionPayload",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "result",
        "storageKey": null,
        "args": null,
        "concreteType": "BidderPositionResult",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "position",
            "storageKey": null,
            "args": null,
            "concreteType": "BidderPosition",
            "plural": false,
            "selections": [
              v1,
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "sale_artwork",
                "storageKey": null,
                "args": null,
                "concreteType": "SaleArtwork",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "sale",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Sale",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "registrationStatus",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Bidder",
                        "plural": false,
                        "selections": [
                          v1,
                          v2
                        ]
                      },
                      v2
                    ]
                  },
                  v2
                ]
              },
              v2
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "status",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": "messageHeader",
            "name": "message_header",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "ConfirmBidCreateBidderPositionMutation",
  "id": null,
  "text": "mutation ConfirmBidCreateBidderPositionMutation(\n  $input: BidderPositionInput!\n) {\n  createBidderPosition(input: $input) {\n    result {\n      position {\n        id\n        sale_artwork {\n          sale {\n            registrationStatus {\n              id\n              __id\n            }\n            __id\n          }\n          __id\n        }\n        __id\n      }\n      status\n      messageHeader: message_header\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "ConfirmBidCreateBidderPositionMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v3
  },
  "operation": {
    "kind": "Operation",
    "name": "ConfirmBidCreateBidderPositionMutation",
    "argumentDefinitions": v0,
    "selections": v3
  }
};
})();
(node as any).hash = '4717cf31f235967d3d66738c0b632bc5';
export default node;
