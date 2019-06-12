/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { ArtistAuctionResults_artist$ref } from "./ArtistAuctionResults_artist.graphql";
declare const _AuctionResults_artist$ref: unique symbol;
export type AuctionResults_artist$ref = typeof _AuctionResults_artist$ref;
export type AuctionResults_artist = {
    readonly " $fragmentRefs": ArtistAuctionResults_artist$ref;
    readonly " $refType": AuctionResults_artist$ref;
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
