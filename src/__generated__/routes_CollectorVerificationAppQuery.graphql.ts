/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type routes_CollectorVerificationAppQueryVariables = {
    id: string;
};
export type routes_CollectorVerificationAppQueryResponse = {
    readonly me: {
        readonly internalID: string;
        readonly identityVerification: {
            readonly userID: string;
        } | null;
        readonly " $fragmentRefs": FragmentRefs<"CollectorVerificationApp_me">;
    } | null;
};
export type routes_CollectorVerificationAppQuery = {
    readonly response: routes_CollectorVerificationAppQueryResponse;
    readonly variables: routes_CollectorVerificationAppQueryVariables;
};



/*
query routes_CollectorVerificationAppQuery(
  $id: String!
) {
  me {
    ...CollectorVerificationApp_me_1Bmzm5
    internalID
    identityVerification(id: $id) {
      userID
      id
    }
    id
  }
}

fragment CollectorVerificationApp_me_1Bmzm5 on Me {
  name
  identityVerification(id: $id) {
    id
    state
    invitationExpiresAt
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
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "internalID",
  "args": null,
  "storageKey": null
},
v2 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "userID",
  "args": null,
  "storageKey": null
},
v4 = {
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
    "name": "routes_CollectorVerificationAppQuery",
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
          (v1/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "identityVerification",
            "storageKey": null,
            "args": (v2/*: any*/),
            "concreteType": "IdentityVerification",
            "plural": false,
            "selections": [
              (v3/*: any*/)
            ]
          },
          {
            "kind": "FragmentSpread",
            "name": "CollectorVerificationApp_me",
            "args": (v2/*: any*/)
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "routes_CollectorVerificationAppQuery",
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
            "args": (v2/*: any*/),
            "concreteType": "IdentityVerification",
            "plural": false,
            "selections": [
              (v4/*: any*/),
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
                "name": "invitationExpiresAt",
                "args": null,
                "storageKey": null
              },
              (v3/*: any*/)
            ]
          },
          (v1/*: any*/),
          (v4/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "routes_CollectorVerificationAppQuery",
    "id": null,
    "text": "query routes_CollectorVerificationAppQuery(\n  $id: String!\n) {\n  me {\n    ...CollectorVerificationApp_me_1Bmzm5\n    internalID\n    identityVerification(id: $id) {\n      userID\n      id\n    }\n    id\n  }\n}\n\nfragment CollectorVerificationApp_me_1Bmzm5 on Me {\n  name\n  identityVerification(id: $id) {\n    id\n    state\n    invitationExpiresAt\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '7953bee596805f8d2c7e9ee4976f379b';
export default node;
