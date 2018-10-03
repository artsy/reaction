/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type FollowProfileInput = {
    readonly profile_id?: string | null;
    readonly unfollow?: boolean | null;
    readonly clientMutationId?: string | null;
};
export type FollowProfileButtonMutationVariables = {
    readonly input: FollowProfileInput;
};
export type FollowProfileButtonMutationResponse = {
    readonly followProfile: ({
        readonly profile: ({
            readonly __id: string;
            readonly is_followed: boolean | null;
        }) | null;
    }) | null;
};
export type FollowProfileButtonMutation = {
    readonly response: FollowProfileButtonMutationResponse;
    readonly variables: FollowProfileButtonMutationVariables;
};



/*
mutation FollowProfileButtonMutation(
  $input: FollowProfileInput!
) {
  followProfile(input: $input) {
    profile {
      __id
      is_followed
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "FollowProfileInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "followProfile",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input",
        "type": "FollowProfileInput!"
      }
    ],
    "concreteType": "FollowProfilePayload",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "profile",
        "storageKey": null,
        "args": null,
        "concreteType": "Profile",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "__id",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "is_followed",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "FollowProfileButtonMutation",
  "id": null,
  "text": "mutation FollowProfileButtonMutation(\n  $input: FollowProfileInput!\n) {\n  followProfile(input: $input) {\n    profile {\n      __id\n      is_followed\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "FollowProfileButtonMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "FollowProfileButtonMutation",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
(node as any).hash = '41505cb1b2dfc8e45a15406888d5555a';
export default node;
