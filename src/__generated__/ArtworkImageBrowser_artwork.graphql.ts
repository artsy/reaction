/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ArtworkActions_artwork$ref } from "./ArtworkActions_artwork.graphql";
declare const _ArtworkImageBrowser_artwork$ref: unique symbol;
export type ArtworkImageBrowser_artwork$ref = typeof _ArtworkImageBrowser_artwork$ref;
export type ArtworkImageBrowser_artwork = {
    readonly title: string | null;
    readonly image_alt: string | null;
    readonly image_title: string | null;
    readonly href: string | null;
    readonly image: ({
        readonly id: string | null;
        readonly url: string | null;
        readonly height: number | null;
        readonly width: number | null;
    }) | null;
    readonly images: ReadonlyArray<({
        readonly id: string | null;
        readonly uri: string | null;
        readonly placeholder: ({
            readonly url: string | null;
        }) | null;
        readonly aspectRatio: number;
        readonly is_zoomable: boolean | null;
        readonly is_default: boolean | null;
        readonly deepZoom: ({
            readonly Image: ({
                readonly xmlns: string | null;
                readonly Url: string | null;
                readonly Format: string | null;
                readonly TileSize: number | null;
                readonly Overlap: number | null;
                readonly Size: ({
                    readonly Width: number | null;
                    readonly Height: number | null;
                }) | null;
            }) | null;
        }) | null;
    }) | null> | null;
    readonly " $fragmentRefs": ArtworkActions_artwork$ref;
    readonly " $refType": ArtworkImageBrowser_artwork$ref;
};



const node: ConcreteFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "ArtworkImageBrowser_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
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
    {
      "kind": "FragmentSpread",
      "name": "ArtworkActions_artwork",
      "args": null
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
        v0,
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "url",
          "args": [
            {
              "kind": "Literal",
              "name": "version",
              "value": "larger",
              "type": "[String]"
            }
          ],
          "storageKey": "url(version:\"larger\")"
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "height",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "width",
          "args": null,
          "storageKey": null
        }
      ]
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
        v0,
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
          "kind": "ScalarField",
          "alias": null,
          "name": "is_default",
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
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "__id",
      "args": null,
      "storageKey": null
    }
  ]
};
})();
(node as any).hash = 'faaf1881f00418e8beda0514ec5f73ed';
export default node;
