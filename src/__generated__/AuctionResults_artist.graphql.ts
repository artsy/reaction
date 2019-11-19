/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AuctionResults_artist = {
    readonly " $fragmentRefs": FragmentRefs<"ArtistAuctionResults_artist">;
    readonly " $refType": "AuctionResults_artist";
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "AuctionResults_artist",
  "type": "Artist",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "ArtistAuctionResults_artist",
      "args": null
    }
  ]
};
(node as any).hash = '75a2a7fb0c52b2221a3eb378a5f6df38';
export default node;
