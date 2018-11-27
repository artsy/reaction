/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _ArtworkContextAuction_artwork$ref: unique symbol;
export type ArtworkContextAuction_artwork$ref = typeof _ArtworkContextAuction_artwork$ref;
export type ArtworkContextAuction_artwork = {
    readonly id: string;
    readonly " $refType": ArtworkContextAuction_artwork$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "ArtworkContextAuction_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "id",
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
(node as any).hash = 'f52c87e490f8626344e6fe74bcbcd3d3';
export default node;
