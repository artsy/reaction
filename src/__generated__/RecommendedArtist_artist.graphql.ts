/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FillwidthItem_artwork$ref } from "./FillwidthItem_artwork.graphql";
import { FollowArtistButton_artist$ref } from "./FollowArtistButton_artist.graphql";
declare const _RecommendedArtist_artist$ref: unique symbol;
export type RecommendedArtist_artist$ref = typeof _RecommendedArtist_artist$ref;
export type RecommendedArtist_artist = {
    readonly id: string;
    readonly _id: string;
    readonly name: string | null;
    readonly formatted_nationality_and_birthday: string | null;
    readonly href: string | null;
    readonly image: {
        readonly cropped: {
            readonly url: string | null;
        } | null;
    } | null;
    readonly artworks_connection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly __id: string;
                readonly image: {
                    readonly aspect_ratio: number;
                } | null;
                readonly " $fragmentRefs": FillwidthItem_artwork$ref;
            } | null;
        } | null> | null;
    } | null;
    readonly " $fragmentRefs": FollowArtistButton_artist$ref;
    readonly " $refType": RecommendedArtist_artist$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "RecommendedArtist_artist",
  "type": "Artist",
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
      "name": "_id",
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
      "name": "formatted_nationality_and_birthday",
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
          "storageKey": "cropped(height:100,width:100)",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 100
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 100
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
      "kind": "LinkedField",
      "alias": null,
      "name": "artworks_connection",
      "storageKey": "artworks_connection(filter:\"IS_FOR_SALE\",first:20,sort:\"PUBLISHED_AT_DESC\")",
      "args": [
        {
          "kind": "Literal",
          "name": "filter",
          "value": "IS_FOR_SALE"
        },
        {
          "kind": "Literal",
          "name": "first",
          "value": 20
        },
        {
          "kind": "Literal",
          "name": "sort",
          "value": "PUBLISHED_AT_DESC"
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
                    }
                  ]
                },
                {
                  "kind": "FragmentSpread",
                  "name": "FillwidthItem_artwork",
                  "args": null
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
    }
  ]
};
(node as any).hash = '6fefba32685b9654f7a1648a8de05f36';
export default node;
