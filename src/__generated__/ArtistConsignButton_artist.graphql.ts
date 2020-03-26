/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistConsignButton_artist = {
    readonly name: string | null;
    readonly href: string | null;
    readonly image: {
        readonly cropped: {
            readonly url: string | null;
        } | null;
    } | null;
    readonly " $refType": "ArtistConsignButton_artist";
};
export type ArtistConsignButton_artist$data = ArtistConsignButton_artist;
export type ArtistConsignButton_artist$key = {
    readonly " $data"?: ArtistConsignButton_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistConsignButton_artist">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ArtistConsignButton_artist",
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
          "storageKey": "cropped(height:66,width:75)",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 66
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 75
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
};
(node as any).hash = '6e7d1acc55f65bdb49a761446150dd24';
export default node;
