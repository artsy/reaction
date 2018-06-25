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
      "name": "AuctionResultsRefetchContainer_artist",
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
(node as any).hash = '99101b76ffdf52f17472e70fbfbc22f7';
export default node;
