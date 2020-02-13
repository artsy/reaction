/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AuctionResultHeader_artist = {
    readonly name: string | null;
    readonly " $refType": "AuctionResultHeader_artist";
};
export type AuctionResultHeader_artist$data = AuctionResultHeader_artist;
export type AuctionResultHeader_artist$key = {
    readonly " $data"?: AuctionResultHeader_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"AuctionResultHeader_artist">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "AuctionResultHeader_artist",
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
(node as any).hash = '3705a4553b3415bd32e1e992ed1f9d0f';
export default node;
