/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { ArtistCard_artist$ref } from "./ArtistCard_artist.graphql";
export type ArtistCardStoryQueryVariables = {};
export type ArtistCardStoryQueryResponse = {
    readonly artist: ({
        readonly " $fragmentRefs": ArtistCard_artist$ref;
    }) | null;
};
export type ArtistCardStoryQuery = {
    readonly response: ArtistCardStoryQueryResponse;
    readonly variables: ArtistCardStoryQueryVariables;
};



/*
query ArtistCardStoryQuery {
  artist(id: "unused") {
    ...ArtistCard_artist
    __id
  }
}

fragment ArtistCard_artist on Artist {
  name
  id
  href
  image {
    cropped(width: 400, height: 300) {
      url
    }
    __id: id
  }
  formatted_nationality_and_birthday
  ...FollowArtistButton_artist
  __id
}

fragment FollowArtistButton_artist on Artist {
  __id
  name
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
    "value": "unused",
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
  "name": "ArtistCardStoryQuery",
  "id": null,
  "text": "query ArtistCardStoryQuery {\n  artist(id: \"unused\") {\n    ...ArtistCard_artist\n    __id\n  }\n}\n\nfragment ArtistCard_artist on Artist {\n  name\n  id\n  href\n  image {\n    cropped(width: 400, height: 300) {\n      url\n    }\n    __id: id\n  }\n  formatted_nationality_and_birthday\n  ...FollowArtistButton_artist\n  __id\n}\n\nfragment FollowArtistButton_artist on Artist {\n  __id\n  name\n  id\n  is_followed\n  counts {\n    follows\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "ArtistCardStoryQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artist",
        "storageKey": "artist(id:\"unused\")",
        "args": v0,
        "concreteType": "Artist",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ArtistCard_artist",
            "args": null
          },
          v1
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ArtistCardStoryQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artist",
        "storageKey": "artist(id:\"unused\")",
        "args": v0,
        "concreteType": "Artist",
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
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
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
                "storageKey": "cropped(height:300,width:400)",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "height",
                    "value": 300,
                    "type": "Int!"
                  },
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 400,
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
              },
              {
                "kind": "ScalarField",
                "alias": "__id",
                "name": "id",
                "args": null,
                "storageKey": null
              }
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "formatted_nationality_and_birthday",
            "args": null,
            "storageKey": null
          },
          v1,
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
      }
    ]
  }
};
})();
(node as any).hash = 'ace3a1babcf2741ba24b8674b576569c';
export default node;
