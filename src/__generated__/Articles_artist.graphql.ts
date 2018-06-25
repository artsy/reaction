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
      "name": "ArticlesRefetchContainer_artist",
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
(node as any).hash = 'b58861f1b65a42941e00521630825aff';
export default node;
