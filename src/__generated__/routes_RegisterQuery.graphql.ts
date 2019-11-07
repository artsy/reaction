/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type routes_RegisterQueryVariables = {
    saleID: string;
};
export type routes_RegisterQueryResponse = {
    readonly sale: {
        readonly slug: string;
        readonly isAuction: boolean | null;
        readonly isRegistrationClosed: boolean | null;
        readonly isPreview: boolean | null;
        readonly isOpen: boolean | null;
        readonly registrationStatus: {
            readonly qualifiedForBidding: boolean | null;
        } | null;
        readonly " $fragmentRefs": FragmentRefs<"Register_sale">;
    } | null;
    readonly me: {
        readonly hasQualifiedCreditCards: boolean | null;
        readonly " $fragmentRefs": FragmentRefs<"Register_me">;
    } | null;
};
export type routes_RegisterQuery = {
    readonly response: routes_RegisterQueryResponse;
    readonly variables: routes_RegisterQueryVariables;
};



/*
query routes_RegisterQuery(
  $saleID: String!
) {
  sale(id: $saleID) @principalField {
    slug
    isAuction
    isRegistrationClosed
    isPreview
    isOpen
    registrationStatus {
      qualifiedForBidding
      id
    }
    ...Register_sale
    id
  }
  me {
    hasQualifiedCreditCards
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
  "alias": null,
  "name": "isAuction",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "isRegistrationClosed",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "isPreview",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "isOpen",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "qualifiedForBidding",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
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
    "text": "query routes_RegisterQuery(\n  $saleID: String!\n) {\n  sale(id: $saleID) @principalField {\n    slug\n    isAuction\n    isRegistrationClosed\n    isPreview\n    isOpen\n    registrationStatus {\n      qualifiedForBidding\n      id\n    }\n    ...Register_sale\n    id\n  }\n  me {\n    hasQualifiedCreditCards\n    ...Register_me\n    id\n  }\n}\n\nfragment Register_sale on Sale {\n  slug\n  internalID\n  status\n}\n\nfragment Register_me on Me {\n  internalID\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'a3833cffa71e570f6ecf177801250cb0';
export default node;
