/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FeaturedArticles_articles = ReadonlyArray<{
    readonly thumbnailTitle: string | null;
    readonly publishedAt: string | null;
    readonly thumbnailImage: {
        readonly cropped: {
            readonly width: number | null;
            readonly height: number | null;
            readonly url: string | null;
        } | null;
    } | null;
    readonly tinyImage: {
        readonly cropped: {
            readonly url: string | null;
        } | null;
    } | null;
    readonly href: string | null;
    readonly " $refType": "FeaturedArticles_articles";
}>;
export type FeaturedArticles_articles$data = FeaturedArticles_articles;
export type FeaturedArticles_articles$key = ReadonlyArray<{
    readonly " $data"?: FeaturedArticles_articles$data;
    readonly " $fragmentRefs": FragmentRefs<"FeaturedArticles_articles">;
}>;



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "url",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "FeaturedArticles_articles",
  "type": "Article",
  "metadata": {
    "plural": true
  },
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "thumbnailTitle",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "publishedAt",
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "MMM Do, YYYY"
        }
      ],
      "storageKey": "publishedAt(format:\"MMM Do, YYYY\")"
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "thumbnailImage",
      "storageKey": null,
      "args": null,
      "concreteType": "Image",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "cropped",
          "storageKey": "cropped(height:520,width:780)",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 520
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 780
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
            (v0/*: any*/)
          ]
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": "tinyImage",
      "name": "thumbnailImage",
      "storageKey": null,
      "args": null,
      "concreteType": "Image",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "cropped",
          "storageKey": "cropped(height:60,width:60)",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 60
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 60
            }
          ],
          "concreteType": "CroppedImageUrl",
          "plural": false,
          "selections": [
            (v0/*: any*/)
          ]
        }
      ]
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "href",
      "args": null,
      "storageKey": null
    }
  ]
};
})();
(node as any).hash = 'e8085521d6af112294c21c016648022d';
export default node;
