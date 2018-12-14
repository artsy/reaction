/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { Save_artwork$ref } from "./Save_artwork.graphql";
declare const _ArtworkBrowser_artwork$ref: unique symbol;
export type ArtworkBrowser_artwork$ref = typeof _ArtworkBrowser_artwork$ref;
export type ArtworkBrowser_artwork = {
    readonly title: string | null;
    readonly image_alt: string | null;
    readonly image_title: string | null;
    readonly href: string | null;
    readonly images: ReadonlyArray<({
        readonly id: string | null;
        readonly uri: string | null;
        readonly placeholder: ({
            readonly url: string | null;
        }) | null;
        readonly aspectRatio: number;
        readonly is_zoomable: boolean | null;
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
    readonly " $fragmentRefs": Save_artwork$ref;
    readonly " $refType": ArtworkBrowser_artwork$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "ArtworkBrowser_artwork",
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
      "name": "Save_artwork",
      "args": null
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
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "id",
          "args": null,
          "storageKey": null
        },
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
(node as any).hash = 'c21cd07187cded904992ecfca31dd58e';
export default node;
