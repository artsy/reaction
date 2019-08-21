/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _Bid_artwork$ref: unique symbol;
export type Bid_artwork$ref = typeof _Bid_artwork$ref;
export type Bid_artwork = {
    readonly id: string;
    readonly imageUrl: string | null;
    readonly artist_names: string | null;
    readonly displayLabel: string | null;
    readonly " $refType": Bid_artwork$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "Bid_artwork",
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
      "name": "imageUrl",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "artist_names",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "displayLabel",
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
(node as any).hash = 'ee62c4ee6bcf35494827b69611b75865';
export default node;
