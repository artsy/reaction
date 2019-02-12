/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { RelatedArtworks_viewer$ref } from "./RelatedArtworks_viewer.graphql";
export type RelatedArtworksQueryVariables = {
    readonly entityID: string;
};
export type RelatedArtworksQueryResponse = {
    readonly viewer: ({
        readonly " $fragmentRefs": RelatedArtworks_viewer$ref;
    }) | null;
};
export type RelatedArtworksQuery = {
    readonly response: RelatedArtworksQueryResponse;
    readonly variables: RelatedArtworksQueryVariables;
};



/*
query RelatedArtworksQuery(
  $entityID: String!
) {
  viewer {
    ...RelatedArtworks_viewer
  }
}

fragment RelatedArtworks_viewer on Viewer {
  filter_artworks(aggregations: [TOTAL], sort: "-decayed_merch", artist_id: $entityID) {
    __id
    artworks_connection(first: 8) {
      edges {
        node {
          ...PreviewGridItem_artwork
          __id
        }
      }
    }
  }
}

fragment PreviewGridItem_artwork on Artwork {
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
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "entityID",
    "type": "String!",
    "defaultValue": null
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
  "name": "RelatedArtworksQuery",
  "id": null,
  "text": "query RelatedArtworksQuery(\n  $entityID: String!\n) {\n  viewer {\n    ...RelatedArtworks_viewer\n  }\n}\n\nfragment RelatedArtworks_viewer on Viewer {\n  filter_artworks(aggregations: [TOTAL], sort: \"-decayed_merch\", artist_id: $entityID) {\n    __id\n    artworks_connection(first: 8) {\n      edges {\n        node {\n          ...PreviewGridItem_artwork\n          __id\n        }\n      }\n    }\n  }\n}\n\nfragment PreviewGridItem_artwork on Artwork {\n  href\n  title\n  artist_names\n  image {\n    cropped(width: 40, height: 40) {\n      url\n    }\n  }\n  date\n  __id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "RelatedArtworksQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
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
            "name": "RelatedArtworks_viewer",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "RelatedArtworksQuery",
    "argumentDefinitions": v0,
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
            "storageKey": null,
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
                "kind": "Variable",
                "name": "artist_id",
                "variableName": "entityID",
                "type": "String"
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
              v1,
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
                          v1
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
(node as any).hash = 'fe4cd6116e685a478818bd86c6a6109b';
export default node;
