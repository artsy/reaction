/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _ArtworkDetailsArticles_artwork$ref: unique symbol;
export type ArtworkDetailsArticles_artwork$ref = typeof _ArtworkDetailsArticles_artwork$ref;
export type ArtworkDetailsArticles_artwork = {
    readonly articles: ReadonlyArray<({
        readonly title: string | null;
        readonly href: string | null;
        readonly thumbnail: ({
            readonly image: ({
                readonly width: number | null;
                readonly height: number | null;
                readonly url: string | null;
            }) | null;
        }) | null;
        readonly author: ({
            readonly name: string | null;
        }) | null;
    }) | null> | null;
    readonly " $refType": ArtworkDetailsArticles_artwork$ref;
};



const node: ConcreteFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "ArtworkDetailsArticles_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "articles",
      "storageKey": "articles(size:2)",
      "args": [
        {
          "kind": "Literal",
          "name": "size",
          "value": 2,
          "type": "Int"
        }
      ],
      "concreteType": "Article",
      "plural": true,
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
          "alias": null,
          "name": "href",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "LinkedField",
          "alias": "thumbnail",
          "name": "thumbnail_image",
          "storageKey": null,
          "args": null,
          "concreteType": "Image",
          "plural": false,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": "image",
              "name": "cropped",
              "storageKey": "cropped(height:100,width:150)",
              "args": [
                {
                  "kind": "Literal",
                  "name": "height",
                  "value": 100,
                  "type": "Int!"
                },
                {
                  "kind": "Literal",
                  "name": "width",
                  "value": 150,
                  "type": "Int!"
                }
              ],
              "concreteType": "CroppedImageUrl",
              "plural": false,
              "selections": [
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
                },
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
          "kind": "LinkedField",
          "alias": null,
          "name": "author",
          "storageKey": null,
          "args": null,
          "concreteType": "Author",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "name",
              "args": null,
              "storageKey": null
            },
            v0
          ]
        },
        v0
      ]
    },
    v0
  ]
};
})();
(node as any).hash = '4561d1ad262c709316bda5677c71f0dc';
export default node;
