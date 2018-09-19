/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _ArtworkDetailsAboutTheWorkFromArtsy_artwork$ref: unique symbol;
export type ArtworkDetailsAboutTheWorkFromArtsy_artwork$ref = typeof _ArtworkDetailsAboutTheWorkFromArtsy_artwork$ref;
export type ArtworkDetailsAboutTheWorkFromArtsy_artwork = {
    readonly description: string | null;
    readonly " $refType": ArtworkDetailsAboutTheWorkFromArtsy_artwork$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "ArtworkDetailsAboutTheWorkFromArtsy_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "description",
      "args": null,
      "storageKey": null
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
(node as any).hash = 'e111216a2e8a4223ef87d25499bc5760';
export default node;
