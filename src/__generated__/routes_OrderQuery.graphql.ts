/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type CommerceOrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type CommerceOrderParticipantEnum = "BUYER" | "SELLER" | "%future added value";
export type CommerceOrderStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "PENDING" | "REFUNDED" | "SUBMITTED" | "%future added value";
export type routes_OrderQueryVariables = {
    readonly orderID: string;
};
export type routes_OrderQueryResponse = {
    readonly me: ({
        readonly name: string | null;
    }) | null;
    readonly order: ({
        readonly id: string;
        readonly mode: CommerceOrderModeEnum | null;
        readonly state: CommerceOrderStateEnum;
        readonly lastTransactionFailed: boolean | null;
        readonly requestedFulfillment: ({
            readonly __typename: string;
        }) | null;
        readonly lineItems: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly artwork: ({
                        readonly id: string;
                        readonly is_acquireable: boolean | null;
                        readonly is_offerable: boolean | null;
                    }) | null;
                }) | null;
            }) | null> | null;
        }) | null;
        readonly creditCard: ({
            readonly id: string;
        }) | null;
        readonly myLastOffer?: ({
            readonly id: string;
            readonly createdAt: string;
        }) | null;
        readonly lastOffer?: ({
            readonly id: string;
            readonly createdAt: string;
        }) | null;
        readonly awaitingResponseFrom?: CommerceOrderParticipantEnum | null;
    }) | null;
};
export type routes_OrderQuery = {
    readonly response: routes_OrderQueryResponse;
    readonly variables: routes_OrderQueryVariables;
};



/*
query routes_OrderQuery(
  $orderID: ID!
) {
  me {
    name
    __id
  }
  order: commerceOrder(id: $orderID) @principalField {
    __typename
    id
    mode
    state
    lastTransactionFailed
    ... on CommerceOfferOrder {
      myLastOffer {
        id
        createdAt
        __id: id
      }
      lastOffer {
        id
        createdAt
        __id: id
      }
      awaitingResponseFrom
    }
    requestedFulfillment {
      __typename
    }
    lineItems {
      edges {
        node {
          artwork {
            id
            __id
            is_acquireable
            is_offerable
          }
          __id: id
        }
      }
    }
    creditCard {
      id
      __id
    }
    __id: id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "orderID",
    "type": "ID!",
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
v2 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "me",
  "storageKey": null,
  "args": null,
  "concreteType": "Me",
  "plural": false,
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "name",
      "args": null,
      "storageKey": null
    },
    v1
  ]
},
v3 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "orderID",
    "type": "ID"
  }
],
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "mode",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "state",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "lastTransactionFailed",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v9 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "requestedFulfillment",
  "storageKey": null,
  "args": null,
  "concreteType": null,
  "plural": false,
  "selections": [
    v8
  ]
},
v10 = {
  "kind": "ScalarField",
  "alias": "__id",
  "name": "id",
  "args": null,
  "storageKey": null
},
v11 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "lineItems",
  "storageKey": null,
  "args": null,
  "concreteType": "CommerceLineItemConnection",
  "plural": false,
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "edges",
      "storageKey": null,
      "args": null,
      "concreteType": "CommerceLineItemEdge",
      "plural": true,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "node",
          "storageKey": null,
          "args": null,
          "concreteType": "CommerceLineItem",
          "plural": false,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "artwork",
              "storageKey": null,
              "args": null,
              "concreteType": "Artwork",
              "plural": false,
              "selections": [
                v4,
                v1,
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "is_acquireable",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "is_offerable",
                  "args": null,
                  "storageKey": null
                }
              ]
            },
            v10
          ]
        }
      ]
    }
  ]
},
v12 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "creditCard",
  "storageKey": null,
  "args": null,
  "concreteType": "CreditCard",
  "plural": false,
  "selections": [
    v4,
    v1
  ]
},
v13 = [
  v4,
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "createdAt",
    "args": null,
    "storageKey": null
  },
  v10
],
v14 = {
  "kind": "InlineFragment",
  "type": "CommerceOfferOrder",
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "myLastOffer",
      "storageKey": null,
      "args": null,
      "concreteType": "CommerceOffer",
      "plural": false,
      "selections": v13
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "lastOffer",
      "storageKey": null,
      "args": null,
      "concreteType": "CommerceOffer",
      "plural": false,
      "selections": v13
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "awaitingResponseFrom",
      "args": null,
      "storageKey": null
    }
  ]
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "routes_OrderQuery",
  "id": null,
  "text": "query routes_OrderQuery(\n  $orderID: ID!\n) {\n  me {\n    name\n    __id\n  }\n  order: commerceOrder(id: $orderID) @principalField {\n    __typename\n    id\n    mode\n    state\n    lastTransactionFailed\n    ... on CommerceOfferOrder {\n      myLastOffer {\n        id\n        createdAt\n        __id: id\n      }\n      lastOffer {\n        id\n        createdAt\n        __id: id\n      }\n      awaitingResponseFrom\n    }\n    requestedFulfillment {\n      __typename\n    }\n    lineItems {\n      edges {\n        node {\n          artwork {\n            id\n            __id\n            is_acquireable\n            is_offerable\n          }\n          __id: id\n        }\n      }\n    }\n    creditCard {\n      id\n      __id\n    }\n    __id: id\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "routes_OrderQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      v2,
      {
        "kind": "LinkedField",
        "alias": "order",
        "name": "commerceOrder",
        "storageKey": null,
        "args": v3,
        "concreteType": null,
        "plural": false,
        "selections": [
          v4,
          v5,
          v6,
          v7,
          v9,
          v11,
          v12,
          v10,
          v14
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "routes_OrderQuery",
    "argumentDefinitions": v0,
    "selections": [
      v2,
      {
        "kind": "LinkedField",
        "alias": "order",
        "name": "commerceOrder",
        "storageKey": null,
        "args": v3,
        "concreteType": null,
        "plural": false,
        "selections": [
          v8,
          v4,
          v5,
          v6,
          v7,
          v9,
          v11,
          v12,
          v10,
          v14
        ]
      }
    ]
  }
};
})();
(node as any).hash = '9249b465ae12de4e4212d5f0f2062ac1';
export default node;
