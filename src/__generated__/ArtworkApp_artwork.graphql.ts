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
      "name": "ArtworkSidebar_artwork",
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
(node as any).hash = 'eb39ddb4b6ade84d5070591f00dd80f9';
export default node;
