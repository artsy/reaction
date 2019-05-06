/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _PopularArtists_popular_artists$ref: unique symbol;
export type PopularArtists_popular_artists$ref = typeof _PopularArtists_popular_artists$ref;
export type PopularArtists_popular_artists = {
    readonly artists: ReadonlyArray<({
        readonly id: string;
        readonly _id: string;
        readonly __id: string;
        readonly name: string | null;
        readonly image: ({
            readonly cropped: ({
                readonly url: string | null;
            }) | null;
        }) | null;
    }) | null> | null;
    readonly " $refType": PopularArtists_popular_artists$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "PopularArtists_popular_artists",
  "type": "PopularArtists",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "artists",
      "storageKey": null,
      "args": null,
      "concreteType": "Artist",
      "plural": true,
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
          "name": "__id",
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
        }
      ]
    }
  ]
};
(node as any).hash = '1c49138ba6baf7973c1aa1e59f1f0825';
export default node;
