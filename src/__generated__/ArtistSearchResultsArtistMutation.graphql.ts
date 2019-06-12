/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type FollowArtistInput = {
    readonly artist_id?: string | null;
    readonly unfollow?: boolean | null;
    readonly clientMutationId?: string | null;
};
export type ArtistSearchResultsArtistMutationVariables = {
    readonly input: FollowArtistInput;
    readonly excludedArtistIds: ReadonlyArray<string | null>;
};
export type ArtistSearchResultsArtistMutationResponse = {
    readonly followArtist: {
        readonly popular_artists: {
            readonly artists: ReadonlyArray<{
                readonly id: string;
                readonly _id: string;
                readonly __id: string;
                readonly name: string | null;
                readonly image: {
                    readonly cropped: {
                        readonly url: string | null;
                    } | null;
                } | null;
            } | null> | null;
        } | null;
        readonly artist: {
            readonly __id: string;
            readonly related: {
                readonly suggested: {
                    readonly edges: ReadonlyArray<{
                        readonly node: {
                            readonly id: string;
                            readonly _id: string;
                            readonly __id: string;
                            readonly name: string | null;
                            readonly image: {
                                readonly cropped: {
                                    readonly url: string | null;
                                } | null;
                            } | null;
                        } | null;
                    } | null> | null;
                } | null;
            } | null;
        } | null;
    } | null;
};
export type ArtistSearchResultsArtistMutation = {
    readonly response: ArtistSearchResultsArtistMutationResponse;
    readonly variables: ArtistSearchResultsArtistMutationVariables;
};



/*
mutation ArtistSearchResultsArtistMutation(
  $input: FollowArtistInput!
  $excludedArtistIds: [String]!
) {
  followArtist(input: $input) {
    popular_artists(size: 1, exclude_followed_artists: true, exclude_artist_ids: $excludedArtistIds) {
      artists {
        id
        _id
        __id
        name
        image {
          cropped(width: 100, height: 100) {
            url
          }
          id
        }
      }
    }
    artist {
      __id
      related {
        suggested(first: 1, exclude_followed_artists: true, exclude_artist_ids: $excludedArtistIds) {
          edges {
            node {
              id
              _id
              __id
              name
              image {
                cropped(width: 100, height: 100) {
                  url
                }
                id
              }
            }
          }
        }
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
  },
  {
    "kind": "LocalArgument",
    "name": "excludedArtistIds",
    "type": "[String]!",
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
  "kind": "Variable",
  "name": "exclude_artist_ids",
  "variableName": "excludedArtistIds"
},
v3 = {
  "kind": "Literal",
  "name": "exclude_followed_artists",
  "value": true
},
v4 = [
  (v2/*: any*/),
  (v3/*: any*/),
  {
    "kind": "Literal",
    "name": "size",
    "value": 1
  }
],
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "_id",
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
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v9 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "cropped",
  "storageKey": "cropped(height:100,width:100)",
  "args": [
    {
      "kind": "Literal",
      "name": "height",
      "value": 100
    },
    {
      "kind": "Literal",
      "name": "width",
      "value": 100
    }
  ],
  "concreteType": "CroppedImageUrl",
  "plural": false,
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "url",
      "args": null,
      "storageKey": null
    }
  ]
},
v10 = [
  (v5/*: any*/),
  (v6/*: any*/),
  (v7/*: any*/),
  (v8/*: any*/),
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "image",
    "storageKey": null,
    "args": null,
    "concreteType": "Image",
    "plural": false,
    "selections": [
      (v9/*: any*/)
    ]
  }
],
v11 = [
  (v2/*: any*/),
  (v3/*: any*/),
  {
    "kind": "Literal",
    "name": "first",
    "value": 1
  }
],
v12 = [
  (v5/*: any*/),
  (v6/*: any*/),
  (v7/*: any*/),
  (v8/*: any*/),
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "image",
    "storageKey": null,
    "args": null,
    "concreteType": "Image",
    "plural": false,
    "selections": [
      (v9/*: any*/),
      (v5/*: any*/)
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ArtistSearchResultsArtistMutation",
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
            "name": "popular_artists",
            "storageKey": null,
            "args": (v4/*: any*/),
            "concreteType": "PopularArtists",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "artists",
                "storageKey": null,
                "args": null,
                "concreteType": "Artist",
                "plural": true,
                "selections": (v10/*: any*/)
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "artist",
            "storageKey": null,
            "args": null,
            "concreteType": "Artist",
            "plural": false,
            "selections": [
              (v7/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "related",
                "storageKey": null,
                "args": null,
                "concreteType": "ArtistRelatedData",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "suggested",
                    "storageKey": null,
                    "args": (v11/*: any*/),
                    "concreteType": "ArtistConnection",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "edges",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "ArtistEdge",
                        "plural": true,
                        "selections": [
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "node",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "Artist",
                            "plural": false,
                            "selections": (v10/*: any*/)
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ArtistSearchResultsArtistMutation",
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
            "name": "popular_artists",
            "storageKey": null,
            "args": (v4/*: any*/),
            "concreteType": "PopularArtists",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "artists",
                "storageKey": null,
                "args": null,
                "concreteType": "Artist",
                "plural": true,
                "selections": (v12/*: any*/)
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "artist",
            "storageKey": null,
            "args": null,
            "concreteType": "Artist",
            "plural": false,
            "selections": [
              (v7/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "related",
                "storageKey": null,
                "args": null,
                "concreteType": "ArtistRelatedData",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "suggested",
                    "storageKey": null,
                    "args": (v11/*: any*/),
                    "concreteType": "ArtistConnection",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "edges",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "ArtistEdge",
                        "plural": true,
                        "selections": [
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "node",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "Artist",
                            "plural": false,
                            "selections": (v12/*: any*/)
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              (v5/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "ArtistSearchResultsArtistMutation",
    "id": null,
    "text": "mutation ArtistSearchResultsArtistMutation(\n  $input: FollowArtistInput!\n  $excludedArtistIds: [String]!\n) {\n  followArtist(input: $input) {\n    popular_artists(size: 1, exclude_followed_artists: true, exclude_artist_ids: $excludedArtistIds) {\n      artists {\n        id\n        _id\n        __id\n        name\n        image {\n          cropped(width: 100, height: 100) {\n            url\n          }\n          id\n        }\n      }\n    }\n    artist {\n      __id\n      related {\n        suggested(first: 1, exclude_followed_artists: true, exclude_artist_ids: $excludedArtistIds) {\n          edges {\n            node {\n              id\n              _id\n              __id\n              name\n              image {\n                cropped(width: 100, height: 100) {\n                  url\n                }\n                id\n              }\n            }\n          }\n        }\n      }\n      id\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'be26c86b2efc4fd7dd40fe5689acf9dc';
export default node;
