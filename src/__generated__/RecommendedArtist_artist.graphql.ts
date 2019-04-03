/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { FollowArtistButton_artist$ref } from "./FollowArtistButton_artist.graphql";
import { Metadata_artwork$ref } from "./Metadata_artwork.graphql";
import { Save_artwork$ref } from "./Save_artwork.graphql";
declare const _RecommendedArtist_artist$ref: unique symbol;
export type RecommendedArtist_artist$ref = typeof _RecommendedArtist_artist$ref;
export type RecommendedArtist_artist = {
    readonly id: string;
    readonly _id: string;
    readonly name: string | null;
    readonly formatted_nationality_and_birthday: string | null;
    readonly href: string | null;
    readonly image: ({
        readonly cropped: ({
            readonly url: string | null;
        }) | null;
    }) | null;
    readonly artworks_connection: ({
        readonly edges: ReadonlyArray<({
            readonly node: ({
                readonly __id: string;
                readonly image: ({
                    readonly aspect_ratio: number;
                    readonly placeholder: string | null;
                    readonly url: string | null;
                }) | null;
                readonly href: string | null;
                readonly " $fragmentRefs": Metadata_artwork$ref & Save_artwork$ref;
            }) | null;
        }) | null> | null;
    }) | null;
    readonly " $fragmentRefs": FollowArtistButton_artist$ref;
    readonly " $refType": RecommendedArtist_artist$ref;
};



const node: ConcreteFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "href",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
};
return {
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
    v0,
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
              "value": 100,
              "type": "Int!"
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 100,
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
      "kind": "LinkedField",
      "alias": null,
      "name": "artworks_connection",
      "storageKey": "artworks_connection(first:20)",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 20,
          "type": "Int"
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
                v1,
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
                          "value": "large",
                          "type": "[String]"
                        }
                      ],
                      "storageKey": "url(version:\"large\")"
                    }
                  ]
                },
                v0,
                {
                  "kind": "FragmentSpread",
                  "name": "Metadata_artwork",
                  "args": null
                },
                {
                  "kind": "FragmentSpread",
                  "name": "Save_artwork",
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
    },
    v1
  ]
};
})();
(node as any).hash = '1f64cdc9e3d3023ab0660b802e849ea5';
export default node;
