/**
 * @generated SignedSource<<01a0fd50f808c7896b2c00246917b415>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type FollowArtistInput = {
  artistID: string;
  clientMutationId?: string | null;
  unfollow?: boolean | null;
};
export type FollowArtistButtonMutation$variables = {
  input: FollowArtistInput;
};
export type FollowArtistButtonMutationVariables = FollowArtistButtonMutation$variables;
export type FollowArtistButtonMutation$data = {
  readonly followArtist: {
    readonly artist: {
      readonly id: string;
      readonly is_followed: boolean | null;
      readonly counts: {
        readonly follows: Int | null;
      } | null;
    } | null;
  } | null;
};
export type FollowArtistButtonMutationResponse = FollowArtistButtonMutation$data;
export type FollowArtistButtonMutation = {
  variables: FollowArtistButtonMutationVariables;
  response: FollowArtistButtonMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "FollowArtistPayload",
    "kind": "LinkedField",
    "name": "followArtist",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "alias": "is_followed",
            "args": null,
            "kind": "ScalarField",
            "name": "isFollowed",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtistCounts",
            "kind": "LinkedField",
            "name": "counts",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "follows",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "FollowArtistButtonMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "FollowArtistButtonMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "9c6b23b16d33c1031de5e2dc040f35bc",
    "id": null,
    "metadata": {},
    "name": "FollowArtistButtonMutation",
    "operationKind": "mutation",
    "text": "mutation FollowArtistButtonMutation(\n  $input: FollowArtistInput!\n) {\n  followArtist(input: $input) {\n    artist {\n      id\n      is_followed: isFollowed\n      counts {\n        follows\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "1ccb6092697db4f9bc8c0d044b7360a9";

export default node;
