/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _DefaultHeader2_headerArtworks$ref: unique symbol;
export type DefaultHeader2_headerArtworks$ref = typeof _DefaultHeader2_headerArtworks$ref;
export type DefaultHeader2_headerArtworks = {
    readonly hits: ReadonlyArray<({
        readonly href: string | null;
        readonly id: string;
        readonly image: ({
            readonly small: ({
                readonly url: string | null;
                readonly width: number | null;
                readonly height: number | null;
            }) | null;
            readonly large: ({
                readonly url: string | null;
                readonly width: number | null;
                readonly height: number | null;
            }) | null;
        }) | null;
    }) | null> | null;
    readonly " $refType": DefaultHeader2_headerArtworks$ref;
};



const node: ConcreteFragment = (function(){
var v0 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "url",
    "args": null,
    "storageKey": null
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "width",
    "args": null,
    "storageKey": null
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "height",
    "args": null,
    "storageKey": null
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
  "kind": "Fragment",
  "name": "DefaultHeader2_headerArtworks",
  "type": "FilterArtworks",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "hits",
      "storageKey": null,
      "args": null,
      "concreteType": "Artwork",
      "plural": true,
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
          "name": "id",
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
              "alias": "small",
              "name": "resized",
              "storageKey": "resized(height:160)",
              "args": [
                {
                  "kind": "Literal",
                  "name": "height",
                  "value": 160,
                  "type": "Int"
                }
              ],
              "concreteType": "ResizedImageUrl",
              "plural": false,
              "selections": v0
            },
            {
              "kind": "LinkedField",
              "alias": "large",
              "name": "resized",
              "storageKey": "resized(height:220)",
              "args": [
                {
                  "kind": "Literal",
                  "name": "height",
                  "value": 220,
                  "type": "Int"
                }
              ],
              "concreteType": "ResizedImageUrl",
              "plural": false,
              "selections": v0
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
        v1
      ]
    },
    v1
  ]
};
})();
(node as any).hash = '7ea081aa7705b6e865e05b1d6fb7e3be';
export default node;
