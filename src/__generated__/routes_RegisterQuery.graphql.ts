/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { Register_sale$ref } from "./Register_sale.graphql";
import { redirects_me$ref } from "./redirects_me.graphql";
import { redirects_sale$ref } from "./redirects_sale.graphql";
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
        readonly " $fragmentRefs": redirects_sale$ref & Register_sale$ref;
    }) | null;
    readonly me: ({
        readonly has_qualified_credit_cards: boolean | null;
        readonly " $fragmentRefs": redirects_me$ref;
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
    ...redirects_sale
    ...Register_sale
    id
    is_auction
    is_registration_closed
    is_preview
    is_open
    registrationStatus {
      qualified_for_bidding
      __id
    }
    __id
  }
  me {
    ...redirects_me
    has_qualified_credit_cards
    __id
  }
}

fragment redirects_sale on Sale {
  id
  is_auction
  is_registration_closed
  is_preview
  is_open
  registrationStatus {
    qualified_for_bidding
    __id
  }
  __id
}

fragment Register_sale on Sale {
  id
  __id
}

fragment redirects_me on Me {
  has_qualified_credit_cards
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
  "text": "query routes_RegisterQuery(\n  $saleID: String!\n) {\n  sale(id: $saleID) {\n    ...redirects_sale\n    ...Register_sale\n    id\n    is_auction\n    is_registration_closed\n    is_preview\n    is_open\n    registrationStatus {\n      qualified_for_bidding\n      __id\n    }\n    __id\n  }\n  me {\n    ...redirects_me\n    has_qualified_credit_cards\n    __id\n  }\n}\n\nfragment redirects_sale on Sale {\n  id\n  is_auction\n  is_registration_closed\n  is_preview\n  is_open\n  registrationStatus {\n    qualified_for_bidding\n    __id\n  }\n  __id\n}\n\nfragment Register_sale on Sale {\n  id\n  __id\n}\n\nfragment redirects_me on Me {\n  has_qualified_credit_cards\n  __id\n}\n",
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
          {
            "kind": "FragmentSpread",
            "name": "redirects_sale",
            "args": null
          },
          {
            "kind": "FragmentSpread",
            "name": "Register_sale",
            "args": null
          },
          v2,
          v3,
          v4,
          v5,
          v6,
          v8,
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
          {
            "kind": "FragmentSpread",
            "name": "redirects_me",
            "args": null
          },
          v9,
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
          v7
        ]
      }
    ]
  }
};
})();
(node as any).hash = '9f090f49979e7956be5f60517d199b8d';
export default node;
