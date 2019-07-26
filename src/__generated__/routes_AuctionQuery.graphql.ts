/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { AuctionApp_sale$ref } from "./AuctionApp_sale.graphql";
export type routes_AuctionQueryVariables = {
    readonly saleID: string;
};
export type routes_AuctionQueryResponse = {
    readonly sale: ({
        readonly " $fragmentRefs": AuctionApp_sale$ref;
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
  sale: sale(id: $saleID) {
    ...AuctionApp_sale
    __id
  }
}

fragment AuctionApp_sale on Sale {
  id
  __id
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
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "saleID",
    "type": "String!"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "routes_AuctionQuery",
  "id": null,
  "text": "query routes_AuctionQuery(\n  $saleID: String!\n) {\n  sale: sale(id: $saleID) {\n    ...AuctionApp_sale\n    __id\n  }\n}\n\nfragment AuctionApp_sale on Sale {\n  id\n  __id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "routes_AuctionQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "sale",
        "name": "sale",
        "storageKey": null,
        "args": v1,
        "concreteType": "Sale",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "AuctionApp_sale",
            "args": null
          },
          v2
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "routes_AuctionQuery",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "sale",
        "name": "sale",
        "storageKey": null,
        "args": v1,
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
          v2
        ]
      }
    ]
  }
};
})();
(node as any).hash = 'a5285cf4d4cb9a1749faf0271ffae9d0';
export default node;
