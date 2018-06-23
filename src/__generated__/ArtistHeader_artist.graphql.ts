/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type ArtistHeader_artist = {
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
(node as any).hash = 'e984b0711b6aab50d62ddb33321545f5';
export default node;
