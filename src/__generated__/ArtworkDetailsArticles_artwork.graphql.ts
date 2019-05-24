/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _ArtworkDetailsArticles_artwork$ref: unique symbol;
export type ArtworkDetailsArticles_artwork$ref = typeof _ArtworkDetailsArticles_artwork$ref;
export type ArtworkDetailsArticles_artwork = {
    readonly articles: ReadonlyArray<({
        readonly author: ({
            readonly name: string | null;
        }) | null;
        readonly href: string | null;
        readonly published_at: string | null;
        readonly thumbnail_image: ({
            readonly resized: ({
                readonly url: string | null;
            }) | null;
        }) | null;
        readonly thumbnail_title: string | null;
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
      "storageKey": "articles(size:10)",
      "args": [
        {
          "kind": "Literal",
          "name": "size",
          "value": 10,
          "type": "Int"
        }
      ],
      "concreteType": "Article",
      "plural": true,
      "selections": [
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
          "name": "published_at",
          "args": [
            {
              "kind": "Literal",
              "name": "format",
              "value": "MMM Do, YYYY",
              "type": "String"
            }
          ],
          "storageKey": "published_at(format:\"MMM Do, YYYY\")"
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "thumbnail_image",
          "storageKey": null,
          "args": null,
          "concreteType": "Image",
          "plural": false,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "resized",
              "storageKey": "resized(width:300)",
              "args": [
                {
                  "kind": "Literal",
                  "name": "width",
                  "value": 300,
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
              "alias": "__id",
              "name": "id",
              "args": null,
              "storageKey": null
            }
          ]
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "thumbnail_title",
          "args": null,
          "storageKey": null
        },
        v0
      ]
    },
    v0
  ]
};
})();
(node as any).hash = 'a82766a04154e8b1f4c8d6938e7863d2';
export default node;
