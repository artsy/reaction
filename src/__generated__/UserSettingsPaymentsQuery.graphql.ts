/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { UserSettingsPayments_me$ref } from "./UserSettingsPayments_me.graphql";
export type UserSettingsPaymentsQueryVariables = {};
export type UserSettingsPaymentsQueryResponse = {
    readonly me: ({
        readonly " $fragmentRefs": UserSettingsPayments_me$ref;
    }) | null;
};
export type UserSettingsPaymentsQuery = {
    readonly response: UserSettingsPaymentsQueryResponse;
    readonly variables: UserSettingsPaymentsQueryVariables;
};



/*
query UserSettingsPaymentsQuery {
  me {
    ...UserSettingsPayments_me
    __id
  }
}

fragment UserSettingsPayments_me on Me {
  id
  creditCards {
    edges {
      node {
        id
        brand
        last_digits
        expiration_year
        expiration_month
        __id
      }
    }
  }
  __id
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "UserSettingsPaymentsQuery",
  "id": null,
  "text": "query UserSettingsPaymentsQuery {\n  me {\n    ...UserSettingsPayments_me\n    __id\n  }\n}\n\nfragment UserSettingsPayments_me on Me {\n  id\n  creditCards {\n    edges {\n      node {\n        id\n        brand\n        last_digits\n        expiration_year\n        expiration_month\n        __id\n      }\n    }\n  }\n  __id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "UserSettingsPaymentsQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
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
          {
            "kind": "FragmentSpread",
            "name": "UserSettingsPayments_me",
            "args": null
          },
          v0
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "UserSettingsPaymentsQuery",
    "argumentDefinitions": [],
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
          v1,
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "creditCards",
            "storageKey": null,
            "args": null,
            "concreteType": "CreditCardConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "CreditCardEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "CreditCard",
                    "plural": false,
                    "selections": [
                      v1,
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "brand",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "last_digits",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "expiration_year",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "expiration_month",
                        "args": null,
                        "storageKey": null
                      },
                      v0
                    ]
                  }
                ]
              }
            ]
          },
          v0
        ]
      }
    ]
  }
};
})();
(node as any).hash = '979a38cba2d2f95be025a730d894ca44';
export default node;
