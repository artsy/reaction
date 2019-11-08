/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistHeader_Test_QueryVariables = {};
export type ArtistHeader_Test_QueryResponse = {
    readonly artist: {
        readonly " $fragmentRefs": FragmentRefs<"ArtistHeader_artist">;
    } | null;
};
export type ArtistHeader_Test_QueryRawResponse = {
    readonly artist: ({
        readonly internalID: string;
        readonly slug: string;
        readonly name: string | null;
        readonly nationality: string | null;
        readonly years: string | null;
        readonly counts: ({
            readonly follows: number | null;
        }) | null;
        readonly carousel: ({
            readonly images: ReadonlyArray<({
                readonly href: string | null;
                readonly resized: ({
                    readonly url: string | null;
                    readonly width: number | null;
                    readonly height: number | null;
                }) | null;
            }) | null> | null;
        }) | null;
        readonly id: string;
        readonly is_followed: boolean | null;
    }) | null;
};
export type ArtistHeader_Test_Query = {
    readonly response: ArtistHeader_Test_QueryResponse;
    readonly variables: ArtistHeader_Test_QueryVariables;
    readonly rawResponse: ArtistHeader_Test_QueryRawResponse;
};



/*
query ArtistHeader_Test_Query {
  artist(id: "pablo-picasso") {
    ...ArtistHeader_artist
    id
  }
}

fragment ArtistHeader_artist on Artist {
  internalID
  slug
  name
  nationality
  years
  counts {
    follows
  }
  carousel {
    images {
      href
      resized(height: 200) {
        url
        width
        height
      }
    }
  }
  ...FollowArtistButton_artist
}

fragment FollowArtistButton_artist on Artist {
  id
  internalID
  name
  is_followed: isFollowed
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
    "value": "pablo-picasso"
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ArtistHeader_Test_Query",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artist",
        "storageKey": "artist(id:\"pablo-picasso\")",
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ArtistHeader_artist",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ArtistHeader_Test_Query",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artist",
        "storageKey": "artist(id:\"pablo-picasso\")",
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "internalID",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "slug",
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
            "name": "nationality",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "years",
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
            "name": "carousel",
            "storageKey": null,
            "args": null,
            "concreteType": "ArtistCarousel",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "images",
                "storageKey": null,
                "args": null,
                "concreteType": "Image",
                "plural": true,
                "selections": [
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
                    "name": "resized",
                    "storageKey": "resized(height:200)",
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "height",
                        "value": 200
                      }
                    ],
                    "concreteType": "ResizedImageUrl",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "url",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "width",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "height",
                        "args": null,
                        "storageKey": null
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": "is_followed",
            "name": "isFollowed",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "ArtistHeader_Test_Query",
    "id": null,
    "text": "query ArtistHeader_Test_Query {\n  artist(id: \"pablo-picasso\") {\n    ...ArtistHeader_artist\n    id\n  }\n}\n\nfragment ArtistHeader_artist on Artist {\n  internalID\n  slug\n  name\n  nationality\n  years\n  counts {\n    follows\n  }\n  carousel {\n    images {\n      href\n      resized(height: 200) {\n        url\n        width\n        height\n      }\n    }\n  }\n  ...FollowArtistButton_artist\n}\n\nfragment FollowArtistButton_artist on Artist {\n  id\n  internalID\n  name\n  is_followed: isFollowed\n  counts {\n    follows\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '99f3a33391d142dbf18cee9573ada661';
export default node;
