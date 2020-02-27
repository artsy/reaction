/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type IdentityVerificationPageTestQueryVariables = {};
export type IdentityVerificationPageTestQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"IdentityVerificationPage_me">;
    } | null;
};
export type IdentityVerificationPageTestQueryRawResponse = {
    readonly me: ({
        readonly internalID: string;
        readonly name: string | null;
        readonly identityVerification: ({
            readonly internalID: string;
            readonly state: string;
            readonly userID: string;
            readonly id: string | null;
        }) | null;
        readonly id: string | null;
    }) | null;
};
export type IdentityVerificationPageTestQuery = {
    readonly response: IdentityVerificationPageTestQueryResponse;
    readonly variables: IdentityVerificationPageTestQueryVariables;
    readonly rawResponse: IdentityVerificationPageTestQueryRawResponse;
};



/*
query IdentityVerificationPageTestQuery {
  me {
    ...IdentityVerificationPage_me_3zaPSf
    id
  }
}

fragment IdentityVerificationPage_me_3zaPSf on Me {
  internalID
  name
  identityVerification(id: "idv-id") {
    internalID
    state
    userID
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "idv-id"
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "internalID",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "IdentityVerificationPageTestQuery",
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
            "name": "IdentityVerificationPage_me",
            "args": (v0/*: any*/)
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "IdentityVerificationPageTestQuery",
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
          (v1/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "name",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "identityVerification",
            "storageKey": "identityVerification(id:\"idv-id\")",
            "args": (v0/*: any*/),
            "concreteType": "IdentityVerification",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "state",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "userID",
                "args": null,
                "storageKey": null
              },
              (v2/*: any*/)
            ]
          },
          (v2/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "IdentityVerificationPageTestQuery",
    "id": null,
    "text": "query IdentityVerificationPageTestQuery {\n  me {\n    ...IdentityVerificationPage_me_3zaPSf\n    id\n  }\n}\n\nfragment IdentityVerificationPage_me_3zaPSf on Me {\n  internalID\n  name\n  identityVerification(id: \"idv-id\") {\n    internalID\n    state\n    userID\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '95dc7198099644ef4890fad2eec88763';
export default node;
