/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { ArtworkSidebarArtists_artwork$ref } from "./ArtworkSidebarArtists_artwork.graphql";
export type ArtworkSidebarArtists_Test_QueryVariables = {};
export type ArtworkSidebarArtists_Test_QueryResponse = {
    readonly artwork: {
        readonly " $fragmentRefs": ArtworkSidebarArtists_artwork$ref;
    } | null;
};
export type ArtworkSidebarArtists_Test_Query = {
    readonly response: ArtworkSidebarArtists_Test_QueryResponse;
    readonly variables: ArtworkSidebarArtists_Test_QueryVariables;
};



/*
query ArtworkSidebarArtists_Test_Query {
  artwork(id: "josef-albers-homage-to-the-square-85") {
    ...ArtworkSidebarArtists_artwork
    id
  }
}

fragment ArtworkSidebarArtists_artwork on Artwork {
  cultural_maker
  artists {
    __id
    _id
    id
    name
    href
    ...FollowArtistButton_artist_2eN9lh
  }
}

fragment FollowArtistButton_artist_2eN9lh on Artist {
  __id
  id
  is_followed
  counts {
    follows
  }
  ...FollowArtistPopover_suggested
}

fragment FollowArtistPopover_suggested on Artist {
  related {
    suggested(first: 3, exclude_followed_artists: true) {
      edges {
        node {
          __id
          _id
          ...FollowArtistPopoverRow_artist
          id
        }
      }
    }
  }
}

fragment FollowArtistPopoverRow_artist on Artist {
  id
  _id
  __id
  name
  image {
    cropped(width: 45, height: 45) {
      url
    }
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "josef-albers-homage-to-the-square-85"
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "_id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ArtworkSidebarArtists_Test_Query",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"josef-albers-homage-to-the-square-85\")",
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ArtworkSidebarArtists_artwork",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ArtworkSidebarArtists_Test_Query",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"josef-albers-homage-to-the-square-85\")",
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "cultural_maker",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "artists",
            "storageKey": null,
            "args": null,
            "concreteType": "Artist",
            "plural": true,
            "selections": [
              (v1/*: any*/),
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "href",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "is_followed",
                "args": null,
                "storageKey": null
              },
              {
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
              },
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
                    "storageKey": "suggested(exclude_followed_artists:true,first:3)",
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "exclude_followed_artists",
                        "value": true
                      },
                      {
                        "kind": "Literal",
                        "name": "first",
                        "value": 3
                      }
                    ],
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
                            "selections": [
                              (v1/*: any*/),
                              (v2/*: any*/),
                              (v3/*: any*/),
                              (v4/*: any*/),
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "name": "image",
                                "storageKey": null,
                                "args": null,
                                "concreteType": "Image",
                                "plural": false,
                                "selections": [
                                  {
                                    "kind": "LinkedField",
                                    "alias": null,
                                    "name": "cropped",
                                    "storageKey": "cropped(height:45,width:45)",
                                    "args": [
                                      {
                                        "kind": "Literal",
                                        "name": "height",
                                        "value": 45
                                      },
                                      {
                                        "kind": "Literal",
                                        "name": "width",
                                        "value": 45
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
                                  (v3/*: any*/)
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
          (v3/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "ArtworkSidebarArtists_Test_Query",
    "id": null,
    "text": "query ArtworkSidebarArtists_Test_Query {\n  artwork(id: \"josef-albers-homage-to-the-square-85\") {\n    ...ArtworkSidebarArtists_artwork\n    id\n  }\n}\n\nfragment ArtworkSidebarArtists_artwork on Artwork {\n  cultural_maker\n  artists {\n    __id\n    _id\n    id\n    name\n    href\n    ...FollowArtistButton_artist_2eN9lh\n  }\n}\n\nfragment FollowArtistButton_artist_2eN9lh on Artist {\n  __id\n  id\n  is_followed\n  counts {\n    follows\n  }\n  ...FollowArtistPopover_suggested\n}\n\nfragment FollowArtistPopover_suggested on Artist {\n  related {\n    suggested(first: 3, exclude_followed_artists: true) {\n      edges {\n        node {\n          __id\n          _id\n          ...FollowArtistPopoverRow_artist\n          id\n        }\n      }\n    }\n  }\n}\n\nfragment FollowArtistPopoverRow_artist on Artist {\n  id\n  _id\n  __id\n  name\n  image {\n    cropped(width: 45, height: 45) {\n      url\n    }\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '79c66408497a5d16a202e99074bd40d0';
export default node;
