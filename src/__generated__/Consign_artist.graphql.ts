/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Consign_artist = {
    readonly id: string;
    readonly " $refType": "Consign_artist";
};
export type Consign_artist$data = Consign_artist;
export type Consign_artist$key = {
    readonly " $data"?: Consign_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"Consign_artist">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "Consign_artist",
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
    }
  ]
};
(node as any).hash = 'b2d2d1c5cde2f8cc2269d33d2a4366cb';
export default node;
