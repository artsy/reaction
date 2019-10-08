/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _LotInfo_artwork$ref: unique symbol;
export type LotInfo_artwork$ref = typeof _LotInfo_artwork$ref;
export type LotInfo_artwork = {
    readonly _id: string;
    readonly date: string | null;
    readonly title: string | null;
    readonly imageUrl: string | null;
    readonly artistNames: string | null;
    readonly " $refType": LotInfo_artwork$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "LotInfo_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "_id",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "date",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "title",
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
      "alias": "artistNames",
      "name": "artist_names",
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
(node as any).hash = '0f99e65d0fccd0cc06748c0b0bc328e7';
export default node;
