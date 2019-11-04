/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type BidderPositionQueryVariables = {
    bidderPositionID: string;
};
export type BidderPositionQueryResponse = {
    readonly me: {
        readonly bidderPosition: {
            readonly status: string;
            readonly messageHeader: string | null;
            readonly position: {
                readonly id: string;
                readonly suggestedNextBid: {
                    readonly cents: number | null;
                    readonly display: string | null;
                } | null;
            } | null;
        } | null;
    } | null;
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
    bidderPosition(id: $bidderPositionID) {
      status
      messageHeader
      position {
        id
        suggestedNextBid {
          cents
          display
        }
      }
    }
    id
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
  "name": "id",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "bidderPosition",
  "storageKey": null,
  "args": [
    {
      "kind": "Variable",
      "name": "id",
      "variableName": "bidderPositionID"
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
      "alias": null,
      "name": "messageHeader",
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
        (v1/*: any*/),
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "suggestedNextBid",
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
        }
      ]
    }
  ]
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "BidderPositionQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "Me",
        "plural": false,
        "selections": [
          (v2/*: any*/)
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "BidderPositionQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "Me",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v1/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "BidderPositionQuery",
    "id": null,
    "text": "query BidderPositionQuery(\n  $bidderPositionID: String!\n) {\n  me {\n    bidderPosition(id: $bidderPositionID) {\n      status\n      messageHeader\n      position {\n        id\n        suggestedNextBid {\n          cents\n          display\n        }\n      }\n    }\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '6aa78c481c1eaf99b5323a9d2ffd6baf';
export default node;
