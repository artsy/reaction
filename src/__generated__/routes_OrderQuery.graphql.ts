/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type OrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type OrderParticipantEnum = "BUYER" | "SELLER" | "%future added value";
export type routes_OrderQueryVariables = {
    readonly orderID: string;
};
export type routes_OrderQueryResponse = {
    readonly me: ({
        readonly name: string | null;
    }) | null;
    readonly order: ({
        readonly id: string | null;
        readonly mode: OrderModeEnum | null;
        readonly state: string | null;
        readonly requestedFulfillment: ({
            readonly __typename: string;
        }) | null;
        readonly lineItems: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly artwork: ({
                        readonly id: string;
                    }) | null;
                }) | null;
            }) | null> | null;
        }) | null;
        readonly creditCard: ({
            readonly id: string;
        }) | null;
        readonly myLastOffer?: ({
            readonly id: string | null;
            readonly createdAt: string | null;
        }) | null;
        readonly lastOffer?: ({
            readonly id: string | null;
            readonly createdAt: string | null;
        }) | null;
        readonly awaitingResponseFrom?: OrderParticipantEnum | null;
    }) | null;
};
export type routes_OrderQuery = {
    readonly response: routes_OrderQueryResponse;
    readonly variables: routes_OrderQueryVariables;
};



/*
query routes_OrderQuery(
  $orderID: String!
) {
  me {
    name
    __id
  }
  order: ecommerceOrder(id: $orderID) {
    __typename
    id
    mode
    state
    ... on OfferOrder {
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
    "type": "String!"
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
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "requestedFulfillment",
  "storageKey": null,
  "args": null,
  "concreteType": null,
  "plural": false,
  "selections": [
    v7
  ]
},
v9 = [
  v4,
  v1
],
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
  "concreteType": "OrderLineItemConnection",
  "plural": false,
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "edges",
      "storageKey": null,
      "args": null,
      "concreteType": "OrderLineItemEdge",
      "plural": true,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "node",
          "storageKey": null,
          "args": null,
          "concreteType": "OrderLineItem",
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
              "selections": v9
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
  "selections": v9
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
  "type": "OfferOrder",
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "myLastOffer",
      "storageKey": null,
      "args": null,
      "concreteType": "Offer",
      "plural": false,
      "selections": v13
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "lastOffer",
      "storageKey": null,
      "args": null,
      "concreteType": "Offer",
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
  "text": "query routes_OrderQuery(\n  $orderID: String!\n) {\n  me {\n    name\n    __id\n  }\n  order: ecommerceOrder(id: $orderID) {\n    __typename\n    id\n    mode\n    state\n    ... on OfferOrder {\n      myLastOffer {\n        id\n        createdAt\n        __id: id\n      }\n      lastOffer {\n        id\n        createdAt\n        __id: id\n      }\n      awaitingResponseFrom\n    }\n    requestedFulfillment {\n      __typename\n    }\n    lineItems {\n      edges {\n        node {\n          artwork {\n            id\n            __id\n          }\n          __id: id\n        }\n      }\n    }\n    creditCard {\n      id\n      __id\n    }\n    __id: id\n  }\n}\n",
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
        "name": "ecommerceOrder",
        "storageKey": null,
        "args": v3,
        "concreteType": null,
        "plural": false,
        "selections": [
          v4,
          v5,
          v6,
          v8,
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
        "name": "ecommerceOrder",
        "storageKey": null,
        "args": v3,
        "concreteType": null,
        "plural": false,
        "selections": [
          v7,
          v4,
          v5,
          v6,
          v8,
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
(node as any).hash = '20d17f420895276adefe97677567a77d';
export default node;
