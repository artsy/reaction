/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistConsignHeader_artist = {
    readonly name: string | null;
    readonly " $fragmentRefs": FragmentRefs<"ArtistConsignHeaderImages_artist">;
    readonly " $refType": "ArtistConsignHeader_artist";
};
export type ArtistConsignHeader_artist$data = ArtistConsignHeader_artist;
export type ArtistConsignHeader_artist$key = {
    readonly " $data"?: ArtistConsignHeader_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistConsignHeader_artist">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ArtistConsignHeader_artist",
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
      "kind": "FragmentSpread",
      "name": "ArtistConsignHeaderImages_artist",
      "args": null
    }
  ]
};
(node as any).hash = '4bd7853624db3f04f4cd12380d3450b0';
export default node;
