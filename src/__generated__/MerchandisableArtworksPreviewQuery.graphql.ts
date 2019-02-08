/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { MerchandisableArtworks_viewer$ref } from "./MerchandisableArtworks_viewer.graphql";
export type MerchandisableArtworksPreviewQueryVariables = {};
export type MerchandisableArtworksPreviewQueryResponse = {
    readonly viewer: ({
        readonly " $fragmentRefs": MerchandisableArtworks_viewer$ref;
    }) | null;
};
export type MerchandisableArtworksPreviewQuery = {
    readonly response: MerchandisableArtworksPreviewQueryResponse;
    readonly variables: MerchandisableArtworksPreviewQueryVariables;
};



/*
query MerchandisableArtworksPreviewQuery {
  viewer {
    ...MerchandisableArtworks_viewer
  }
}

fragment MerchandisableArtworks_viewer on Viewer {
  filter_artworks(aggregations: [TOTAL], sort: "-decayed_merch") {
    __id
    artworks_connection(first: 8) {
      edges {
        node {
          href
          title
          artist_names
          image {
            cropped(width: 40, height: 40) {
              url
            }
          }
          date
          __id
        }
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "MerchandisableArtworksPreviewQuery",
  "id": null,
  "text": "query MerchandisableArtworksPreviewQuery {\n  viewer {\n    ...MerchandisableArtworks_viewer\n  }\n}\n\nfragment MerchandisableArtworks_viewer on Viewer {\n  filter_artworks(aggregations: [TOTAL], sort: \"-decayed_merch\") {\n    __id\n    artworks_connection(first: 8) {\n      edges {\n        node {\n          href\n          title\n          artist_names\n          image {\n            cropped(width: 40, height: 40) {\n              url\n            }\n          }\n          date\n          __id\n        }\n      }\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "MerchandisableArtworksPreviewQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "viewer",
        "name": "__viewer_viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "Viewer",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "MerchandisableArtworks_viewer",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "MerchandisableArtworksPreviewQuery",
    "argumentDefinitions": [],
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
            "name": "filter_artworks",
            "storageKey": "filter_artworks(aggregations:[\"TOTAL\"],sort:\"-decayed_merch\")",
            "args": [
              {
                "kind": "Literal",
                "name": "aggregations",
                "value": [
                  "TOTAL"
                ],
                "type": "[ArtworkAggregation]"
              },
              {
                "kind": "Literal",
                "name": "sort",
                "value": "-decayed_merch",
                "type": "String"
              }
            ],
            "concreteType": "FilterArtworks",
            "plural": false,
            "selections": [
              v0,
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "artworks_connection",
                "storageKey": "artworks_connection(first:8)",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "first",
                    "value": 8,
                    "type": "Int"
                  }
                ],
                "concreteType": "ArtworkConnection",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "edges",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "ArtworkEdge",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "node",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Artwork",
                        "plural": false,
                        "selections": [
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
                            "name": "title",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "artist_names",
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
                                "storageKey": "cropped(height:40,width:40)",
                                "args": [
                                  {
                                    "kind": "Literal",
                                    "name": "height",
                                    "value": 40,
                                    "type": "Int!"
                                  },
                                  {
                                    "kind": "Literal",
                                    "name": "width",
                                    "value": 40,
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
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "date",
                            "args": null,
                            "storageKey": null
                          },
                          v0
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
      {
        "kind": "LinkedHandle",
        "alias": null,
        "name": "viewer",
        "args": null,
        "handle": "viewer",
        "key": "",
        "filters": null
      }
    ]
  }
};
})();
(node as any).hash = '04256fc8d2622cbd24ba06fbdebb9fc6';
export default node;
