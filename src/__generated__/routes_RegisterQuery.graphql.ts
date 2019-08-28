/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { Register_me$ref } from "./Register_me.graphql";
import { Register_sale$ref } from "./Register_sale.graphql";
export type routes_RegisterQueryVariables = {
    readonly saleID: string;
};
export type routes_RegisterQueryResponse = {
    readonly sale: ({
        readonly id: string;
        readonly is_auction: boolean | null;
        readonly is_registration_closed: boolean | null;
        readonly is_preview: boolean | null;
        readonly is_open: boolean | null;
        readonly registrationStatus: ({
            readonly qualified_for_bidding: boolean | null;
        }) | null;
        readonly " $fragmentRefs": Register_sale$ref;
    }) | null;
    readonly me: ({
        readonly has_qualified_credit_cards: boolean | null;
        readonly " $fragmentRefs": Register_me$ref;
    }) | null;
};
export type routes_RegisterQuery = {
    readonly response: routes_RegisterQueryResponse;
    readonly variables: routes_RegisterQueryVariables;
};



/*
query routes_RegisterQuery(
  $saleID: String!
) {
  sale(id: $saleID) {
    id
    is_auction
    is_registration_closed
    is_preview
    is_open
    registrationStatus {
      qualified_for_bidding
      __id
    }
    ...Register_sale
    __id
  }
  me {
    has_qualified_credit_cards
    ...Register_me
    __id
  }
}

fragment Register_sale on Sale {
  id
  _id
  status
  __id
}

fragment Register_me on Me {
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
  "name": "is_auction",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "is_registration_closed",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "is_preview",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "is_open",
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
},
v9 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "has_qualified_credit_cards",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "routes_RegisterQuery",
  "id": null,
  "text": "query routes_RegisterQuery(\n  $saleID: String!\n) {\n  sale(id: $saleID) {\n    id\n    is_auction\n    is_registration_closed\n    is_preview\n    is_open\n    registrationStatus {\n      qualified_for_bidding\n      __id\n    }\n    ...Register_sale\n    __id\n  }\n  me {\n    has_qualified_credit_cards\n    ...Register_me\n    __id\n  }\n}\n\nfragment Register_sale on Sale {\n  id\n  _id\n  status\n  __id\n}\n\nfragment Register_me on Me {\n  id\n  __id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "routes_RegisterQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
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
            "name": "Register_sale",
            "args": null
          },
          v7
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "Me",
        "plural": false,
        "selections": [
          v9,
          {
            "kind": "FragmentSpread",
            "name": "Register_me",
            "args": null
          },
          v7
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "routes_RegisterQuery",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
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
            "kind": "ScalarField",
            "alias": null,
            "name": "_id",
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
          v7
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "Me",
        "plural": false,
        "selections": [
          v9,
          v2,
          v7
        ]
      }
    ]
  }
};
})();
(node as any).hash = '5e90e1e8033ec046e4308a44cd338207';
export default node;
