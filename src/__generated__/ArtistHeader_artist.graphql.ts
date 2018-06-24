/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type ArtistHeader_artist = {
    readonly name: string | null;
    readonly bio: string | null;
    readonly carousel: ({
        readonly images: ReadonlyArray<({
            readonly resized: ({
                readonly url: string | null;
            }) | null;
        }) | null> | null;
    }) | null;
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
      "name": "name",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "bio",
      "args": null,
      "storageKey": null
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
              "kind": "LinkedField",
              "alias": null,
              "name": "resized",
              "storageKey": "resized(height:300)",
              "args": [
                {
                  "kind": "Literal",
                  "name": "height",
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
            }
          ]
        }
      ]
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
(node as any).hash = 'fed4de77e2861c8a8910d2baafe80255';
export default node;
