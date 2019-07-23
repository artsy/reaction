/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { AuctionApp_me$ref } from "./AuctionApp_me.graphql";
import { AuctionApp_sale$ref } from "./AuctionApp_sale.graphql";
export type routes_AuctionQueryVariables = {
    readonly saleID: string;
};
export type routes_AuctionQueryResponse = {
    readonly me: ({
        readonly " $fragmentRefs": AuctionApp_me$ref;
    }) | null;
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
  me: me {
    ...AuctionApp_me
    __id
  }
  sale: sale(id: $saleID) {
    ...AuctionApp_sale
    __id
  }
}

fragment AuctionApp_me on Me {
  name
  __id
}

fragment AuctionApp_sale on Sale {
  id
  name
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
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v2 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "saleID",
    "type": "String!"
  }
],
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "routes_AuctionQuery",
  "id": null,
  "text": "query routes_AuctionQuery(\n  $saleID: String!\n) {\n  me: me {\n    ...AuctionApp_me\n    __id\n  }\n  sale: sale(id: $saleID) {\n    ...AuctionApp_sale\n    __id\n  }\n}\n\nfragment AuctionApp_me on Me {\n  name\n  __id\n}\n\nfragment AuctionApp_sale on Sale {\n  id\n  name\n  __id\n}\n",
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
        "alias": "me",
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "Me",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "AuctionApp_me",
            "args": null
          },
          v1
        ]
      },
      {
        "kind": "LinkedField",
        "alias": "sale",
        "name": "sale",
        "storageKey": null,
        "args": v2,
        "concreteType": "Sale",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "AuctionApp_sale",
            "args": null
          },
          v1
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
        "alias": "me",
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "Me",
        "plural": false,
        "selections": [
          v3,
          v1
        ]
      },
      {
        "kind": "LinkedField",
        "alias": "sale",
        "name": "sale",
        "storageKey": null,
        "args": v2,
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
          v3,
          v1
        ]
      }
    ]
  }
};
})();
(node as any).hash = '0b018c8033fce0a8c862c00fe5f6605b';
export default node;
