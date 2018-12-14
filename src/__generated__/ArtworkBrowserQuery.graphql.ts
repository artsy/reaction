/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { ArtworkBrowser_artwork$ref } from "./ArtworkBrowser_artwork.graphql";
export type ArtworkBrowserQueryVariables = {
    readonly artworkID: string;
};
export type ArtworkBrowserQueryResponse = {
    readonly artwork: ({
        readonly " $fragmentRefs": ArtworkBrowser_artwork$ref;
    }) | null;
};
export type ArtworkBrowserQuery = {
    readonly response: ArtworkBrowserQueryResponse;
    readonly variables: ArtworkBrowserQueryVariables;
};



/*
query ArtworkBrowserQuery(
  $artworkID: String!
) {
  artwork(id: $artworkID) {
    ...ArtworkBrowser_artwork
    __id
  }
}

fragment ArtworkBrowser_artwork on Artwork {
  title
  image_alt: to_s
  image_title
  href
  ...Save_artwork
  images {
    id
    uri: url(version: ["larger", "large"])
    placeholder: resized(width: 30, height: 30, version: "small") {
      url
    }
    aspectRatio: aspect_ratio
    is_zoomable
    deepZoom: deep_zoom {
      Image {
        xmlns
        Url
        Format
        TileSize
        Overlap
        Size {
          Width
          Height
        }
      }
    }
  }
  __id
}

fragment Save_artwork on Artwork {
  __id
  id
  is_saved
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "artworkID",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artworkID",
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
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "ArtworkBrowserQuery",
  "id": null,
  "text": "query ArtworkBrowserQuery(\n  $artworkID: String!\n) {\n  artwork(id: $artworkID) {\n    ...ArtworkBrowser_artwork\n    __id\n  }\n}\n\nfragment ArtworkBrowser_artwork on Artwork {\n  title\n  image_alt: to_s\n  image_title\n  href\n  ...Save_artwork\n  images {\n    id\n    uri: url(version: [\"larger\", \"large\"])\n    placeholder: resized(width: 30, height: 30, version: \"small\") {\n      url\n    }\n    aspectRatio: aspect_ratio\n    is_zoomable\n    deepZoom: deep_zoom {\n      Image {\n        xmlns\n        Url\n        Format\n        TileSize\n        Overlap\n        Size {\n          Width\n          Height\n        }\n      }\n    }\n  }\n  __id\n}\n\nfragment Save_artwork on Artwork {\n  __id\n  id\n  is_saved\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "ArtworkBrowserQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": null,
        "args": v1,
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ArtworkBrowser_artwork",
            "args": null
          },
          v2
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ArtworkBrowserQuery",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": null,
        "args": v1,
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "title",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": "image_alt",
            "name": "to_s",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "image_title",
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
          v2,
          v3,
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "is_saved",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "images",
            "storageKey": null,
            "args": null,
            "concreteType": "Image",
            "plural": true,
            "selections": [
              v3,
              {
                "kind": "ScalarField",
                "alias": "uri",
                "name": "url",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": [
                      "larger",
                      "large"
                    ],
                    "type": "[String]"
                  }
                ],
                "storageKey": "url(version:[\"larger\",\"large\"])"
              },
              {
                "kind": "LinkedField",
                "alias": "placeholder",
                "name": "resized",
                "storageKey": "resized(height:30,version:\"small\",width:30)",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "height",
                    "value": 30,
                    "type": "Int"
                  },
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": "small",
                    "type": "[String]"
                  },
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 30,
                    "type": "Int"
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
                  }
                ]
              },
              {
                "kind": "ScalarField",
                "alias": "aspectRatio",
                "name": "aspect_ratio",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "is_zoomable",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": "deepZoom",
                "name": "deep_zoom",
                "storageKey": null,
                "args": null,
                "concreteType": "DeepZoom",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "Image",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "DeepZoomImage",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "xmlns",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "Url",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "Format",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "TileSize",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "Overlap",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "Size",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "DeepZoomImageSize",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "Width",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "Height",
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
  }
};
})();
(node as any).hash = '2fbd0dc41d0d3f88a2c4a7326e404e87';
export default node;
