/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { Submission_order$ref } from "./Submission_order.graphql";
export type routes_SubmissionQueryVariables = {
    readonly orderID: string;
};
export type routes_SubmissionQueryResponse = {
    readonly order: ({
        readonly " $fragmentRefs": Submission_order$ref;
    }) | null;
};



/*
query routes_SubmissionQuery(
  $orderID: String!
) {
  order(id: $orderID) {
    ...Submission_order
    __id: id
  }
}

fragment Submission_order on Order {
  id
  code
  ...Summary_order
  __id: id
}

fragment Summary_order on Order {
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
  __id: id
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
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "orderID",
    "type": "String!"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": "__id",
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "routes_SubmissionQuery",
  "id": null,
  "text": "query routes_SubmissionQuery(\n  $orderID: String!\n) {\n  order(id: $orderID) {\n    ...Submission_order\n    __id: id\n  }\n}\n\nfragment Submission_order on Order {\n  id\n  code\n  ...Summary_order\n  __id: id\n}\n\nfragment Summary_order on Order {\n  lineItems {\n    edges {\n      node {\n        artwork {\n          id\n          __id\n        }\n        __id: id\n      }\n    }\n  }\n  __id: id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "routes_SubmissionQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "order",
        "storageKey": null,
        "args": v1,
        "concreteType": "Order",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "Submission_order",
            "args": null
          },
          v2
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "routes_SubmissionQuery",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "order",
        "storageKey": null,
        "args": v1,
        "concreteType": "Order",
        "plural": false,
        "selections": [
          v3,
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "code",
            "args": null,
            "storageKey": null
          },
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
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "artwork",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Artwork",
                        "plural": false,
                        "selections": [
                          v3,
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "__id",
                            "args": null,
                            "storageKey": null
                          }
                        ]
                      },
                      v2
                    ]
                  }
                ]
              }
            ]
          },
          v2
        ]
      }
    ]
  }
};
})();
(node as any).hash = '2327a8a5d5ec421c21ee604875374966';
export default node;
