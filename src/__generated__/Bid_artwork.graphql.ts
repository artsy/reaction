/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _Bid_artwork$ref: unique symbol;
export type Bid_artwork$ref = typeof _Bid_artwork$ref;
export type Bid_artwork = {
    readonly _id: string;
    readonly title: string | null;
    readonly imageUrl: string | null;
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
      "name": "_id",
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
      "alias": null,
      "name": "__id",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = 'cee34f856a382ad6742ed3ddde563119';
export default node;
