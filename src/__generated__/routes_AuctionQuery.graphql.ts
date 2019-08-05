/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { AuctionApp_sale$ref } from "./AuctionApp_sale.graphql";
export type routes_AuctionQueryVariables = {
    readonly saleID: string;
};
export type routes_AuctionQueryResponse = {
    readonly sale: ({
        readonly id: string;
        readonly is_registration_closed: boolean | null;
        readonly is_preview: boolean | null;
        readonly is_open: boolean | null;
        readonly is_auction: boolean | null;
        readonly registrationStatus: ({
            readonly qualified_for_bidding: boolean | null;
        }) | null;
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
    id
    is_registration_closed
    is_preview
    is_open
    is_auction
    registrationStatus {
      qualified_for_bidding
      __id
    }
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
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "is_registration_closed",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "is_preview",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "is_open",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "is_auction",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "registrationStatus",
  "storageKey": null,
  "args": null,
  "concreteType": "Bidder",
  "plural": false,
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "qualified_for_bidding",
      "args": null,
      "storageKey": null
    },
    v7
  ]
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "routes_AuctionQuery",
  "id": null,
  "text": "query routes_AuctionQuery(\n  $saleID: String!\n) {\n  sale: sale(id: $saleID) {\n    id\n    is_registration_closed\n    is_preview\n    is_open\n    is_auction\n    registrationStatus {\n      qualified_for_bidding\n      __id\n    }\n    ...AuctionApp_sale\n    __id\n  }\n}\n\nfragment AuctionApp_sale on Sale {\n  id\n  __id\n}\n",
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
          v2,
          v3,
          v4,
          v5,
          v6,
          v8,
          {
            "kind": "FragmentSpread",
            "name": "AuctionApp_sale",
            "args": null
          },
          v7
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
          v2,
          v3,
          v4,
          v5,
          v6,
          v8,
          v7
        ]
      }
    ]
  }
};
})();
(node as any).hash = '5c3e73279a26f03ba2cf9aeb7cc4ada6';
export default node;
