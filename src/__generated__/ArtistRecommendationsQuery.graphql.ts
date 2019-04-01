/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { ArtistRecommendations_artist$ref } from "./ArtistRecommendations_artist.graphql";
export type ArtistRecommendationsQueryVariables = {
    readonly artistID: string;
};
export type ArtistRecommendationsQueryResponse = {
    readonly artist: ({
        readonly " $fragmentRefs": ArtistRecommendations_artist$ref;
    }) | null;
};
export type ArtistRecommendationsQuery = {
    readonly response: ArtistRecommendationsQueryResponse;
    readonly variables: ArtistRecommendationsQueryVariables;
};



/*
query ArtistRecommendationsQuery(
  $artistID: String!
) {
  artist(id: $artistID) {
    ...ArtistRecommendations_artist
    __id
  }
}

fragment ArtistRecommendations_artist on Artist {
  name
  related {
    artists(first: 1) {
      edges {
        node {
          __id
          ...RecommendedArtist_artist
        }
      }
    }
  }
  __id
}

fragment RecommendedArtist_artist on Artist {
  id
  name
  formatted_nationality_and_birthday
  href
  image {
    cropped(width: 100, height: 100) {
      url
    }
  }
  __id
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "artistID",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artistID",
    "type": "String!"
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
  "name": "name",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "ArtistRecommendationsQuery",
  "id": null,
  "text": "query ArtistRecommendationsQuery(\n  $artistID: String!\n) {\n  artist(id: $artistID) {\n    ...ArtistRecommendations_artist\n    __id\n  }\n}\n\nfragment ArtistRecommendations_artist on Artist {\n  name\n  related {\n    artists(first: 1) {\n      edges {\n        node {\n          __id\n          ...RecommendedArtist_artist\n        }\n      }\n    }\n  }\n  __id\n}\n\nfragment RecommendedArtist_artist on Artist {\n  id\n  name\n  formatted_nationality_and_birthday\n  href\n  image {\n    cropped(width: 100, height: 100) {\n      url\n    }\n  }\n  __id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "ArtistRecommendationsQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artist",
        "storageKey": null,
        "args": v1,
        "concreteType": "Artist",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ArtistRecommendations_artist",
            "args": null
          },
          v2
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ArtistRecommendationsQuery",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artist",
        "storageKey": null,
        "args": v1,
        "concreteType": "Artist",
        "plural": false,
        "selections": [
          v3,
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
                "name": "artists",
                "storageKey": "artists(first:1)",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "first",
                    "value": 1,
                    "type": "Int"
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
                          v2,
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "id",
                            "args": null,
                            "storageKey": null
                          },
                          v3,
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "formatted_nationality_and_birthday",
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
                                "storageKey": "cropped(height:100,width:100)",
                                "args": [
                                  {
                                    "kind": "Literal",
                                    "name": "height",
                                    "value": 100,
                                    "type": "Int!"
                                  },
                                  {
                                    "kind": "Literal",
                                    "name": "width",
                                    "value": 100,
                                    "type": "Int!"
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
          v2
        ]
      }
    ]
  }
};
})();
(node as any).hash = '3cded3bd6674dbb310f817562a3ba41f';
export default node;
