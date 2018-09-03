/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _ArtworkDetailsAboutTheWork_artwork$ref: unique symbol;
export type ArtworkDetailsAboutTheWork_artwork$ref = typeof _ArtworkDetailsAboutTheWork_artwork$ref;
export type ArtworkDetailsAboutTheWork_artwork = {
    readonly additional_information: string | null;
    readonly " $refType": ArtworkDetailsAboutTheWork_artwork$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "ArtworkDetailsAboutTheWork_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "additional_information",
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
(node as any).hash = 'fc282ef6a294362f03aa663e6b3913f0';
export default node;
