/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type BidderPositionInput = {
    readonly saleID: string;
    readonly artworkID: string;
    readonly maxBidAmountCents: number;
    readonly clientMutationId?: string | null;
};
export type ConfirmBidCreateBidderPositionMutationVariables = {
    input: BidderPositionInput;
};
export type ConfirmBidCreateBidderPositionMutationResponse = {
    readonly createBidderPosition: {
        readonly result: {
            readonly position: {
                readonly internalID: string;
            } | null;
            readonly status: string;
            readonly message_header: string | null;
            readonly message_description_md: string | null;
        } | null;
    } | null;
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
        internalID
        id
      }
      status
      message_header: messageHeader
      message_description_md: messageDescriptionMD
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
  "name": "internalID",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "status",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": "message_header",
  "name": "messageHeader",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": "message_description_md",
  "name": "messageDescriptionMD",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ConfirmBidCreateBidderPositionMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createBidderPosition",
        "storageKey": null,
        "args": (v1/*: any*/),
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
                  (v2/*: any*/)
                ]
              },
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ConfirmBidCreateBidderPositionMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createBidderPosition",
        "storageKey": null,
        "args": (v1/*: any*/),
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
                  (v2/*: any*/),
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "id",
                    "args": null,
                    "storageKey": null
                  }
                ]
              },
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "ConfirmBidCreateBidderPositionMutation",
    "id": null,
    "text": "mutation ConfirmBidCreateBidderPositionMutation(\n  $input: BidderPositionInput!\n) {\n  createBidderPosition(input: $input) {\n    result {\n      position {\n        internalID\n        id\n      }\n      status\n      message_header: messageHeader\n      message_description_md: messageDescriptionMD\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '5a8747e92cb3ca78c7dac7a73739afa4';
export default node;
