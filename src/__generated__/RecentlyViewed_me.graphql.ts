/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { Badge_artwork$ref } from "./Badge_artwork.graphql";
import { Metadata_artwork$ref } from "./Metadata_artwork.graphql";
import { Save_artwork$ref } from "./Save_artwork.graphql";
declare const _RecentlyViewed_me$ref: unique symbol;
export type RecentlyViewed_me$ref = typeof _RecentlyViewed_me$ref;
export type RecentlyViewed_me = {
    readonly recentlyViewedArtworks: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly __id: string;
                readonly image: {
                    readonly aspect_ratio: number;
                    readonly placeholder: string | null;
                    readonly url: string | null;
                } | null;
                readonly href: string | null;
                readonly " $fragmentRefs": Metadata_artwork$ref & Save_artwork$ref & Badge_artwork$ref;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": RecentlyViewed_me$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "RecentlyViewed_me",
  "type": "Me",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "recentlyViewedArtworks",
      "storageKey": "recentlyViewedArtworks(first:20)",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 20
        }
      ],
      "concreteType": "ArtworkConnection",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "edges",
          "storageKey": null,
          "args": null,
          "concreteType": "ArtworkEdge",
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
                  "name": "__id",
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
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "aspect_ratio",
                      "args": null,
                      "storageKey": null
                    },
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "placeholder",
                      "args": null,
                      "storageKey": null
                    },
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "url",
                      "args": [
                        {
                          "kind": "Literal",
                          "name": "version",
                          "value": "large"
                        }
                      ],
                      "storageKey": "url(version:\"large\")"
                    }
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
                  "kind": "FragmentSpread",
                  "name": "Metadata_artwork",
                  "args": null
                },
                {
                  "kind": "FragmentSpread",
                  "name": "Save_artwork",
                  "args": null
                },
                {
                  "kind": "FragmentSpread",
                  "name": "Badge_artwork",
                  "args": null
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
(node as any).hash = '46e488d1fa37b7fa9c4ce73cbbd0c694';
export default node;
