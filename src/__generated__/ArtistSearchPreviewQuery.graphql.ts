/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { ArtistSearchPreview_viewer$ref } from "./ArtistSearchPreview_viewer.graphql";
export type ArtistSearchPreviewQueryVariables = {
    readonly entityID: string;
};
export type ArtistSearchPreviewQueryResponse = {
    readonly viewer: ({
        readonly " $fragmentRefs": ArtistSearchPreview_viewer$ref;
    }) | null;
};
export type ArtistSearchPreviewQuery = {
    readonly response: ArtistSearchPreviewQueryResponse;
    readonly variables: ArtistSearchPreviewQueryVariables;
};



/*
query ArtistSearchPreviewQuery(
  $entityID: String!
) {
  viewer {
    ...ArtistSearchPreview_viewer_1IQPhv
  }
}

fragment ArtistSearchPreview_viewer_1IQPhv on Viewer {
  artist(id: $entityID) {
    id
    marketingCollections(size: 6) {
      title
      ...MarketingCollectionsPreview_marketingCollections
      __id: id
    }
    __id
  }
  ...RelatedArtworksPreview_viewer_1IQPhv
}

fragment MarketingCollectionsPreview_marketingCollections on MarketingCollection {
  title
  slug
  headerImage
  __id: id
}

fragment RelatedArtworksPreview_viewer_1IQPhv on Viewer {
  filter_artworks(aggregations: [TOTAL], sort: "-decayed_merch", artist_id: $entityID) {
    __id
    artworks_connection(first: 10) {
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
  "name": "title",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "ArtistSearchPreviewQuery",
  "id": null,
  "text": "query ArtistSearchPreviewQuery(\n  $entityID: String!\n) {\n  viewer {\n    ...ArtistSearchPreview_viewer_1IQPhv\n  }\n}\n\nfragment ArtistSearchPreview_viewer_1IQPhv on Viewer {\n  artist(id: $entityID) {\n    id\n    marketingCollections(size: 6) {\n      title\n      ...MarketingCollectionsPreview_marketingCollections\n      __id: id\n    }\n    __id\n  }\n  ...RelatedArtworksPreview_viewer_1IQPhv\n}\n\nfragment MarketingCollectionsPreview_marketingCollections on MarketingCollection {\n  title\n  slug\n  headerImage\n  __id: id\n}\n\nfragment RelatedArtworksPreview_viewer_1IQPhv on Viewer {\n  filter_artworks(aggregations: [TOTAL], sort: \"-decayed_merch\", artist_id: $entityID) {\n    __id\n    artworks_connection(first: 10) {\n      edges {\n        node {\n          ...PreviewGridItem_artwork\n          __id\n        }\n      }\n    }\n  }\n}\n\nfragment PreviewGridItem_artwork on Artwork {\n  href\n  title\n  artist_names\n  image {\n    cropped(width: 40, height: 40) {\n      url\n    }\n  }\n  date\n  __id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "ArtistSearchPreviewQuery",
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
            "name": "ArtistSearchPreview_viewer",
            "args": [
              {
                "kind": "Variable",
                "name": "entityID",
                "variableName": "entityID",
                "type": null
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ArtistSearchPreviewQuery",
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
            "name": "artist",
            "storageKey": null,
            "args": [
              {
                "kind": "Variable",
                "name": "id",
                "variableName": "entityID",
                "type": "String!"
              }
            ],
            "concreteType": "Artist",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "id",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "marketingCollections",
                "storageKey": "marketingCollections(size:6)",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "size",
                    "value": 6,
                    "type": "Int"
                  }
                ],
                "concreteType": "MarketingCollection",
                "plural": true,
                "selections": [
                  v1,
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
                    "name": "headerImage",
                    "args": null,
                    "storageKey": null
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
              v2
            ]
          },
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
              v2,
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "artworks_connection",
                "storageKey": "artworks_connection(first:10)",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "first",
                    "value": 10,
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
                          v1,
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
                          v2
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
(node as any).hash = '100a9c154c850d116db5be114bf3618d';
export default node;
