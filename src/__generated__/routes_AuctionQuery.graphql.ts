/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type routes_AuctionQueryVariables = {
    readonly saleID: string;
};
export type routes_AuctionQueryResponse = {
    readonly me: ({
        readonly name: string | null;
    }) | null;
    readonly sale: ({
        readonly id: string;
        readonly status: string | null;
    }) | null;
};
export type routes_AuctionQuery = {
    readonly response: routes_AuctionQueryResponse;
    readonly variables: routes_AuctionQueryVariables;
};



/*
query routes_AuctionQuery(
  $saleID: String!
) {
  me {
    name
    __id
  }
  sale: sale(id: $saleID) {
    id
    status
    __id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "saleID",
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
        "kind": "ScalarField",
        "alias": null,
        "name": "name",
        "args": null,
        "storageKey": null
      },
      v1
    ]
  },
  {
    "kind": "LinkedField",
    "alias": "sale",
    "name": "sale",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "saleID",
        "type": "String!"
      }
    ],
    "concreteType": "Sale",
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
        "kind": "ScalarField",
        "alias": null,
        "name": "status",
        "args": null,
        "storageKey": null
      },
      v1
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "routes_AuctionQuery",
  "id": null,
  "text": "query routes_AuctionQuery(\n  $saleID: String!\n) {\n  me {\n    name\n    __id\n  }\n  sale: sale(id: $saleID) {\n    id\n    status\n    __id\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "routes_AuctionQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v2
  },
  "operation": {
    "kind": "Operation",
    "name": "routes_AuctionQuery",
    "argumentDefinitions": v0,
    "selections": v2
  }
};
})();
(node as any).hash = '6dd1607b60f0ff160969906f813f6ba1';
export default node;
