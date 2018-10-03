/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { FollowArtistButton_artist$ref } from "./FollowArtistButton_artist.graphql";
declare const _ArtistHeader_artist$ref: unique symbol;
export type ArtistHeader_artist$ref = typeof _ArtistHeader_artist$ref;
export type ArtistHeader_artist = {
    readonly _id: string;
    readonly id: string;
    readonly name: string | null;
    readonly nationality: string | null;
    readonly years: string | null;
    readonly counts: ({
        readonly follows: any | null;
    }) | null;
    readonly carousel: ({
        readonly images: ReadonlyArray<({
            readonly href: string | null;
            readonly resized: ({
                readonly url: string | null;
                readonly width: number | null;
                readonly height: number | null;
            }) | null;
        }) | null> | null;
    }) | null;
    readonly " $fragmentRefs": FollowArtistButton_artist$ref;
    readonly " $refType": ArtistHeader_artist$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "ArtistHeader_artist",
  "type": "Artist",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "_id",
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
      "kind": "ScalarField",
      "alias": null,
      "name": "name",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "nationality",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "years",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "counts",
      "storageKey": null,
      "args": null,
      "concreteType": "ArtistCounts",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "follows",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "carousel",
      "storageKey": null,
      "args": null,
      "concreteType": "ArtistCarousel",
      "plural": false,
      "selections": [
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
              "name": "href",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "resized",
              "storageKey": "resized(height:200)",
              "args": [
                {
                  "kind": "Literal",
                  "name": "height",
                  "value": 200,
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
              ]
            }
          ]
        }
      ]
    },
    {
      "kind": "FragmentSpread",
      "name": "FollowArtistButton_artist",
      "args": null
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
(node as any).hash = '7c700420d84dd2fe567a9f2491518ea1';
export default node;
