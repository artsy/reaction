/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _ArtworkImages_artwork$ref: unique symbol;
export type ArtworkImages_artwork$ref = typeof _ArtworkImages_artwork$ref;
export type ArtworkImages_artwork = {
    readonly title: string | null;
    readonly image_alt: string | null;
    readonly image_title: string | null;
    readonly images: ReadonlyArray<({
        readonly id: string | null;
        readonly uri: string | null;
        readonly placeholder: ({
            readonly url: string | null;
        }) | null;
        readonly is_zoomable: boolean | null;
        readonly aspectRatio: number;
    }) | null> | null;
    readonly " $refType": ArtworkImages_artwork$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "ArtworkImages_artwork",
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
          "alias": null,
          "name": "is_zoomable",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": "aspectRatio",
          "name": "aspect_ratio",
          "args": null,
          "storageKey": null
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
(node as any).hash = 'f1c91dbdbeb2ca3a07b399446d7f46bf';
export default node;
