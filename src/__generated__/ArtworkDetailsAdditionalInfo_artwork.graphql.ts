/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _ArtworkDetailsAdditionalInfo_artwork$ref: unique symbol;
export type ArtworkDetailsAdditionalInfo_artwork$ref = typeof _ArtworkDetailsAdditionalInfo_artwork$ref;
export type ArtworkDetailsAdditionalInfo_artwork = {
    readonly series: string | null;
    readonly publisher: string | null;
    readonly manufacturer: string | null;
    readonly provenance: string | null;
    readonly image_rights: string | null;
    readonly " $refType": ArtworkDetailsAdditionalInfo_artwork$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "ArtworkDetailsAdditionalInfo_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "series",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "publisher",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "manufacturer",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "provenance",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "image_rights",
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
(node as any).hash = 'c4f01d0818bc22c6a73c74ed1bec812e';
export default node;
