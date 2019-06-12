/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type FollowArtistInput = {
    readonly artist_id?: string | null;
    readonly unfollow?: boolean | null;
    readonly clientMutationId?: string | null;
};
export type FollowArtistButtonMutationVariables = {
    readonly input: FollowArtistInput;
};
export type FollowArtistButtonMutationResponse = {
    readonly followArtist: {
        readonly artist: {
            readonly __id: string;
            readonly is_followed: boolean | null;
            readonly counts: {
                readonly follows: any | null;
            } | null;
        } | null;
    } | null;
};
export type FollowArtistButtonMutation = {
    readonly response: FollowArtistButtonMutationResponse;
    readonly variables: FollowArtistButtonMutationVariables;
};



/*
mutation FollowArtistButtonMutation(
  $input: FollowArtistInput!
) {
  followArtist(input: $input) {
    artist {
      __id
      is_followed
      counts {
        follows
      }
      id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "FollowArtistInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "is_followed",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "counts",
  "storageKey": null,
  "args": null,
  "concreteType": "ArtistCounts",
  "plural": false,
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "follows",
      "args": null,
      "storageKey": null
    }
  ]
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "FollowArtistButtonMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "followArtist",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "FollowArtistPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "artist",
            "storageKey": null,
            "args": null,
            "concreteType": "Artist",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "FollowArtistButtonMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "followArtist",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "FollowArtistPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "artist",
            "storageKey": null,
            "args": null,
            "concreteType": "Artist",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "id",
                "args": null,
                "storageKey": null
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "FollowArtistButtonMutation",
    "id": null,
    "text": "mutation FollowArtistButtonMutation(\n  $input: FollowArtistInput!\n) {\n  followArtist(input: $input) {\n    artist {\n      __id\n      is_followed\n      counts {\n        follows\n      }\n      id\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'e65f3d9d751239122f1c59971dd45400';
export default node;
