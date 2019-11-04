/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type BidderPositionQueryVariables = {
    readonly bidderPositionID: string;
};
export type BidderPositionQueryResponse = {
    readonly me: ({
        readonly bidderPosition: ({
            readonly status: string;
            readonly messageHeader: string | null;
            readonly position: ({
                readonly id: string;
                readonly suggestedNextBid: ({
                    readonly cents: number | null;
                    readonly display: string | null;
                }) | null;
            }) | null;
        }) | null;
    }) | null;
};
export type BidderPositionQuery = {
    readonly response: BidderPositionQueryResponse;
    readonly variables: BidderPositionQueryVariables;
};



/*
query BidderPositionQuery(
  $bidderPositionID: String!
) {
  me {
    bidderPosition: bidder_position(id: $bidderPositionID) {
      status
      messageHeader: message_header
      position {
        id
        suggestedNextBid: suggested_next_bid {
          cents
          display
        }
        __id
      }
    }
    __id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "bidderPositionID",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v2 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "me",
    "storageKey": null,
    "args": null,
    "concreteType": "Me",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "bidderPosition",
        "name": "bidder_position",
        "storageKey": null,
        "args": [
          {
            "kind": "Variable",
            "name": "id",
            "variableName": "bidderPositionID",
            "type": "String!"
          }
        ],
        "concreteType": "BidderPositionResult",
        "plural": false,
        "selections": [
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
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "position",
            "storageKey": null,
            "args": null,
            "concreteType": "BidderPosition",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "id",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": "suggestedNextBid",
                "name": "suggested_next_bid",
                "storageKey": null,
                "args": null,
                "concreteType": "BidderPositionSuggestedNextBid",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "cents",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "display",
                    "args": null,
                    "storageKey": null
                  }
                ]
              },
              v1
            ]
          }
        ]
      },
      v1
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "BidderPositionQuery",
  "id": null,
  "text": "query BidderPositionQuery(\n  $bidderPositionID: String!\n) {\n  me {\n    bidderPosition: bidder_position(id: $bidderPositionID) {\n      status\n      messageHeader: message_header\n      position {\n        id\n        suggestedNextBid: suggested_next_bid {\n          cents\n          display\n        }\n        __id\n      }\n    }\n    __id\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "BidderPositionQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v2
  },
  "operation": {
    "kind": "Operation",
    "name": "BidderPositionQuery",
    "argumentDefinitions": v0,
    "selections": v2
  }
};
})();
(node as any).hash = '2b78470f9530768f48359c5a407ca3f4';
export default node;
