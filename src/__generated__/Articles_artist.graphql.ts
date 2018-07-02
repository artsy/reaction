/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type Articles_artist = {};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "Articles_artist",
  "type": "Artist",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "ArtistArticles_artist",
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
(node as any).hash = '98d755e5b63a5214bafae8262897cdab';
export default node;
