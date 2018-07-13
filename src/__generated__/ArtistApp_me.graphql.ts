/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type ArtistApp_me = {};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "ArtistApp_me",
  "type": "Me",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "RecentlyViewed_me",
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
(node as any).hash = '24aff09bf0356bd55a01dd4618c57818';
export default node;
