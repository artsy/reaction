/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
export type DefaultHeader_headerArtworks = {
    readonly edges: ReadonlyArray<{
        readonly node: {
            readonly href: string | null;
            readonly slug: string;
            readonly image: {
                readonly small: {
                    readonly url: string | null;
                    readonly width: number | null;
                    readonly height: number | null;
                } | null;
                readonly large: {
                    readonly url: string | null;
                    readonly width: number | null;
                    readonly height: number | null;
                } | null;
            } | null;
        } | null;
    } | null> | null;
    readonly " $refType": "DefaultHeader_headerArtworks";
};



const node: ReaderFragment = (function(){
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
];
return {
  "kind": "Fragment",
  "name": "DefaultHeader_headerArtworks",
  "type": "FilterArtworksConnection",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "edges",
      "storageKey": null,
      "args": null,
      "concreteType": "FilterArtworksEdge",
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
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "slug",
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
                      "value": 160
                    }
                  ],
                  "concreteType": "ResizedImageUrl",
                  "plural": false,
                  "selections": (v0/*: any*/)
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
                      "value": 220
                    }
                  ],
                  "concreteType": "ResizedImageUrl",
                  "plural": false,
                  "selections": (v0/*: any*/)
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
})();
(node as any).hash = 'd5258ca33092fbec3897b772161363c1';
export default node;
