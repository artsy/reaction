/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type routes_RegisterQueryVariables = {
    saleID: string;
};
export type routes_RegisterQueryResponse = {
    readonly sale: {
        readonly slug: string;
        readonly is_auction: boolean | null;
        readonly is_registration_closed: boolean | null;
        readonly is_preview: boolean | null;
        readonly is_open: boolean | null;
        readonly registrationStatus: {
            readonly qualified_for_bidding: boolean | null;
        } | null;
        readonly " $fragmentRefs": FragmentRefs<"Register_sale">;
    } | null;
    readonly me: {
        readonly has_qualified_credit_cards: boolean | null;
        readonly " $fragmentRefs": FragmentRefs<"Register_me">;
    } | null;
};
export type routes_RegisterQueryRawResponse = {
    readonly sale: ({
        readonly slug: string;
        readonly is_auction: boolean | null;
        readonly is_registration_closed: boolean | null;
        readonly is_preview: boolean | null;
        readonly is_open: boolean | null;
        readonly registrationStatus: ({
            readonly qualified_for_bidding: boolean | null;
            readonly id: string | null;
        }) | null;
        readonly internalID: string;
        readonly status: string | null;
        readonly id: string | null;
    }) | null;
    readonly me: ({
        readonly has_qualified_credit_cards: boolean | null;
        readonly internalID: string;
        readonly id: string | null;
    }) | null;
};
export type routes_RegisterQuery = {
    readonly response: routes_RegisterQueryResponse;
    readonly variables: routes_RegisterQueryVariables;
    readonly rawResponse: routes_RegisterQueryRawResponse;
};



/*
query routes_RegisterQuery(
  $saleID: String!
) {
  sale(id: $saleID) @principalField {
    slug
    is_auction: isAuction
    is_registration_closed: isRegistrationClosed
    is_preview: isPreview
    is_open: isOpen
    registrationStatus {
      qualified_for_bidding: qualifiedForBidding
      id
    }
    ...Register_sale
    id
  }
  me {
    has_qualified_credit_cards: hasQualifiedCreditCards
    ...Register_me
    id
  }
}

fragment Register_sale on Sale {
  slug
  internalID
  status
}

fragment Register_me on Me {
  internalID
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
    "variableName": "saleID"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "slug",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": "is_auction",
  "name": "isAuction",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": "is_registration_closed",
  "name": "isRegistrationClosed",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": "is_preview",
  "name": "isPreview",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": "is_open",
  "name": "isOpen",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": "qualified_for_bidding",
  "name": "qualifiedForBidding",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": "has_qualified_credit_cards",
  "name": "hasQualifiedCreditCards",
  "args": null,
  "storageKey": null
},
v9 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v10 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "internalID",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "routes_RegisterQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "sale",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Sale",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "registrationStatus",
            "storageKey": null,
            "args": null,
            "concreteType": "Bidder",
            "plural": false,
            "selections": [
              (v7/*: any*/)
            ]
          },
          {
            "kind": "FragmentSpread",
            "name": "Register_sale",
            "args": null
          }
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
          (v8/*: any*/),
          {
            "kind": "FragmentSpread",
            "name": "Register_me",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "routes_RegisterQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "sale",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Sale",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "registrationStatus",
            "storageKey": null,
            "args": null,
            "concreteType": "Bidder",
            "plural": false,
            "selections": [
              (v7/*: any*/),
              (v9/*: any*/)
            ]
          },
          (v10/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "status",
            "args": null,
            "storageKey": null
          },
          (v9/*: any*/)
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
          (v8/*: any*/),
          (v10/*: any*/),
          (v9/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "routes_RegisterQuery",
    "id": null,
    "text": "query routes_RegisterQuery(\n  $saleID: String!\n) {\n  sale(id: $saleID) @principalField {\n    slug\n    is_auction: isAuction\n    is_registration_closed: isRegistrationClosed\n    is_preview: isPreview\n    is_open: isOpen\n    registrationStatus {\n      qualified_for_bidding: qualifiedForBidding\n      id\n    }\n    ...Register_sale\n    id\n  }\n  me {\n    has_qualified_credit_cards: hasQualifiedCreditCards\n    ...Register_me\n    id\n  }\n}\n\nfragment Register_sale on Sale {\n  slug\n  internalID\n  status\n}\n\nfragment Register_me on Me {\n  internalID\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'e998268d952eebf0abb71644b22a300e';
export default node;
