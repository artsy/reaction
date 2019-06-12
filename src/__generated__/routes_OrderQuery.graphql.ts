/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type OrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type OrderParticipantEnum = "BUYER" | "SELLER" | "%future added value";
export type routes_OrderQueryVariables = {
    readonly orderID: string;
};
export type routes_OrderQueryResponse = {
    readonly me: {
        readonly name: string | null;
    } | null;
    readonly order: ({
        readonly id: string;
        readonly mode: OrderModeEnum | null;
        readonly state: string | null;
        readonly lastTransactionFailed: boolean | null;
        readonly requestedFulfillment: {
            readonly __typename: string;
        } | null;
        readonly lineItems: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly artwork: {
                        readonly id: string;
                    } | null;
                } | null;
            } | null> | null;
        } | null;
        readonly creditCard: {
            readonly id: string;
        } | null;
        readonly myLastOffer?: {
            readonly id: string;
            readonly createdAt: string | null;
        } | null;
        readonly lastOffer?: {
            readonly id: string;
            readonly createdAt: string | null;
        } | null;
        readonly awaitingResponseFrom?: OrderParticipantEnum | null;
    } & ({
        readonly myLastOffer: {
            readonly id: string;
            readonly createdAt: string | null;
        } | null;
        readonly lastOffer: {
            readonly id: string;
            readonly createdAt: string | null;
        } | null;
        readonly awaitingResponseFrom: OrderParticipantEnum | null;
    } | {
        /*This will never be '% other', but we need some
        value in case none of the concrete values match.*/
        readonly __typename: "%other";
    })) | null;
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
    id
  }
  order: ecommerceOrder(id: $orderID) {
    __typename
    id
    mode
    state
    lastTransactionFailed
    ... on OfferOrder {
      myLastOffer {
        id
        createdAt
      }
      lastOffer {
        id
        createdAt
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
          }
          id
        }
      }
    }
    creditCard {
      id
    }
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
  "name": "name",
  "args": null,
  "storageKey": null
},
v2 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "orderID"
  }
],
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
  "kind": "ScalarField",
  "alias": null,
  "name": "state",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "lastTransactionFailed",
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
    (v7/*: any*/)
  ]
},
v9 = [
  (v3/*: any*/)
],
v10 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "artwork",
  "storageKey": null,
  "args": null,
  "concreteType": "Artwork",
  "plural": false,
  "selections": (v9/*: any*/)
},
v11 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "creditCard",
  "storageKey": null,
  "args": null,
  "concreteType": "CreditCard",
  "plural": false,
  "selections": (v9/*: any*/)
},
v12 = [
  (v3/*: any*/),
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "createdAt",
    "args": null,
    "storageKey": null
  }
],
v13 = {
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
      "selections": (v12/*: any*/)
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "lastOffer",
      "storageKey": null,
      "args": null,
      "concreteType": "Offer",
      "plural": false,
      "selections": (v12/*: any*/)
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
  "fragment": {
    "kind": "Fragment",
    "name": "routes_OrderQuery",
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
          (v1/*: any*/)
        ]
      },
      {
        "kind": "LinkedField",
        "alias": "order",
        "name": "ecommerceOrder",
        "storageKey": null,
        "args": (v2/*: any*/),
        "concreteType": null,
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v8/*: any*/),
          {
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
                      (v10/*: any*/)
                    ]
                  }
                ]
              }
            ]
          },
          (v11/*: any*/),
          (v13/*: any*/)
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "routes_OrderQuery",
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
          (v1/*: any*/),
          (v3/*: any*/)
        ]
      },
      {
        "kind": "LinkedField",
        "alias": "order",
        "name": "ecommerceOrder",
        "storageKey": null,
        "args": (v2/*: any*/),
        "concreteType": null,
        "plural": false,
        "selections": [
          (v7/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v8/*: any*/),
          {
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
                      (v10/*: any*/),
                      (v3/*: any*/)
                    ]
                  }
                ]
              }
            ]
          },
          (v11/*: any*/),
          (v13/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "routes_OrderQuery",
    "id": null,
    "text": "query routes_OrderQuery(\n  $orderID: String!\n) {\n  me {\n    name\n    id\n  }\n  order: ecommerceOrder(id: $orderID) {\n    __typename\n    id\n    mode\n    state\n    lastTransactionFailed\n    ... on OfferOrder {\n      myLastOffer {\n        id\n        createdAt\n      }\n      lastOffer {\n        id\n        createdAt\n      }\n      awaitingResponseFrom\n    }\n    requestedFulfillment {\n      __typename\n    }\n    lineItems {\n      edges {\n        node {\n          artwork {\n            id\n          }\n          id\n        }\n      }\n    }\n    creditCard {\n      id\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '20d17f420895276adefe97677567a77d';
export default node;
