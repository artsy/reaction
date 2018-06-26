/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type ArtworkApp_artwork = {};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "ArtworkApp_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "Sidebar_artwork",
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
(node as any).hash = '61b33a92c023736ddf0f417b66cc7211';
export default node;
