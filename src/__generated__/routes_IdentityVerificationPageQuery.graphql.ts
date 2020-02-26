/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type routes_IdentityVerificationPageQueryVariables = {
    id: string;
};
export type routes_IdentityVerificationPageQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"IdentityVerificationPage_me">;
    } | null;
};
export type routes_IdentityVerificationPageQuery = {
    readonly response: routes_IdentityVerificationPageQueryResponse;
    readonly variables: routes_IdentityVerificationPageQueryVariables;
};



/*
query routes_IdentityVerificationPageQuery(
  $id: String!
) {
  me {
    ...IdentityVerificationPage_me_1Bmzm5
    id
  }
}

fragment IdentityVerificationPage_me_1Bmzm5 on Me {
  internalID
  name
  identityVerification(id: $id) {
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
    "kind": "LocalArgument",
    "name": "id",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "internalID",
  "args": null,
  "storageKey": null
},
v3 = {
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
    "name": "routes_IdentityVerificationPageQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
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
            "args": (v1/*: any*/)
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "routes_IdentityVerificationPageQuery",
    "argumentDefinitions": (v0/*: any*/),
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
          (v2/*: any*/),
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
            "storageKey": null,
            "args": (v1/*: any*/),
            "concreteType": "IdentityVerification",
            "plural": false,
            "selections": [
              (v2/*: any*/),
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
              (v3/*: any*/)
            ]
          },
          (v3/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "routes_IdentityVerificationPageQuery",
    "id": null,
    "text": "query routes_IdentityVerificationPageQuery(\n  $id: String!\n) {\n  me {\n    ...IdentityVerificationPage_me_1Bmzm5\n    id\n  }\n}\n\nfragment IdentityVerificationPage_me_1Bmzm5 on Me {\n  internalID\n  name\n  identityVerification(id: $id) {\n    internalID\n    state\n    userID\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'dab5557aa7e7308a1e38de08de04a5ed';
export default node;
