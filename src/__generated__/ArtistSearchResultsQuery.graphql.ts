/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { ArtistSearchResults_viewer$ref } from "./ArtistSearchResults_viewer.graphql";
export type ArtistSearchResultsQueryVariables = {
    readonly term: string;
};
export type ArtistSearchResultsQueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": ArtistSearchResults_viewer$ref;
    } | null;
};
export type ArtistSearchResultsQuery = {
    readonly response: ArtistSearchResultsQueryResponse;
    readonly variables: ArtistSearchResultsQueryVariables;
};



/*
query ArtistSearchResultsQuery(
  $term: String!
) {
  viewer {
    ...ArtistSearchResults_viewer
  }
}

fragment ArtistSearchResults_viewer on Viewer {
  match_artist(term: $term) {
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
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "term",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = {
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
    "name": "ArtistSearchResultsQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "Viewer",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ArtistSearchResults_viewer",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ArtistSearchResultsQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "Viewer",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "match_artist",
            "storageKey": null,
            "args": [
              {
                "kind": "Variable",
                "name": "term",
                "variableName": "term"
              }
            ],
            "concreteType": "Artist",
            "plural": true,
            "selections": [
              (v1/*: any*/),
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "_id",
                "args": null,
                "storageKey": null
              },
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
                "name": "name",
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
                  (v1/*: any*/)
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "ArtistSearchResultsQuery",
    "id": null,
    "text": "query ArtistSearchResultsQuery(\n  $term: String!\n) {\n  viewer {\n    ...ArtistSearchResults_viewer\n  }\n}\n\nfragment ArtistSearchResults_viewer on Viewer {\n  match_artist(term: $term) {\n    id\n    _id\n    __id\n    name\n    image {\n      cropped(width: 100, height: 100) {\n        url\n      }\n      id\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'f358ad4e9edc01efcf24dd5f0b52a026';
export default node;
