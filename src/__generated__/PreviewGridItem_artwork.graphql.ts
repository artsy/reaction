/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _PreviewGridItem_artwork$ref: unique symbol;
export type PreviewGridItem_artwork$ref = typeof _PreviewGridItem_artwork$ref;
export type PreviewGridItem_artwork = {
    readonly id: string;
    readonly href: string | null;
    readonly title: string | null;
    readonly artist_names: string | null;
    readonly image: ({
        readonly cropped: ({
            readonly url: string | null;
        }) | null;
    }) | null;
    readonly date: string | null;
    readonly " $refType": PreviewGridItem_artwork$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "PreviewGridItem_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
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
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "__id",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '2d774a27b36ca0f20acec8349bf0750c';
export default node;
