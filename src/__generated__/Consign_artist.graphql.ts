/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Consign_artist = {
    readonly name: string | null;
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
      "name": "name",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '1c784fbe42ca703c6c717e19627f8391';
export default node;
