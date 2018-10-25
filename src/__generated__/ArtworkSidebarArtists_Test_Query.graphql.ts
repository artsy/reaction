/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { ArtworkSidebarArtists_artwork$ref } from "./ArtworkSidebarArtists_artwork.graphql";
export type ArtworkSidebarArtists_Test_QueryVariables = {};
export type ArtworkSidebarArtists_Test_QueryResponse = {
    readonly artwork: ({
        readonly " $fragmentRefs": ArtworkSidebarArtists_artwork$ref;
    }) | null;
};
export type ArtworkSidebarArtists_Test_Query = {
    readonly response: ArtworkSidebarArtists_Test_QueryResponse;
    readonly variables: ArtworkSidebarArtists_Test_QueryVariables;
};



/*
query ArtworkSidebarArtists_Test_Query {
  artwork(id: "josef-albers-homage-to-the-square-85") {
    ...ArtworkSidebarArtists_artwork
    __id
  }
}

fragment ArtworkSidebarArtists_artwork on Artwork {
  artists {
    __id
    id
    name
    href
    ...FollowArtistButton_artist
  }
  __id
}

fragment FollowArtistButton_artist on Artist {
  __id
  id
  is_followed
  counts {
    follows
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "josef-albers-homage-to-the-square-85",
    "type": "String!"
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "ArtworkSidebarArtists_Test_Query",
  "id": null,
  "text": "query ArtworkSidebarArtists_Test_Query {\n  artwork(id: \"josef-albers-homage-to-the-square-85\") {\n    ...ArtworkSidebarArtists_artwork\n    __id\n  }\n}\n\nfragment ArtworkSidebarArtists_artwork on Artwork {\n  artists {\n    __id\n    id\n    name\n    href\n    ...FollowArtistButton_artist\n  }\n  __id\n}\n\nfragment FollowArtistButton_artist on Artist {\n  __id\n  id\n  is_followed\n  counts {\n    follows\n  }\n}\n",
  "metadata": {},
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
        "args": v0,
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ArtworkSidebarArtists_artwork",
            "args": null
          },
          v1
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
        "args": v0,
        "concreteType": "Artwork",
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
            "selections": [
              v1,
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "id",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "name",
                "args": null,
                "storageKey": null
              },
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
              }
            ]
          },
          v1
        ]
      }
    ]
  }
};
})();
(node as any).hash = '79c66408497a5d16a202e99074bd40d0';
export default node;
