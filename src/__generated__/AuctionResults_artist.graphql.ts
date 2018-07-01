/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type AuctionResults_artist = {};



const node: ConcreteFragment = {
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
(node as any).hash = '75a2a7fb0c52b2221a3eb378a5f6df38';
export default node;
