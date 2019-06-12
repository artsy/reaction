/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
declare const _Follow_artist$ref: unique symbol;
export type Follow_artist$ref = typeof _Follow_artist$ref;
export type Follow_artist = {
    readonly __id: string;
    readonly id: string;
    readonly is_followed: boolean | null;
    readonly " $refType": Follow_artist$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "Follow_artist",
  "type": "Artist",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "__id",
      "args": null,
      "storageKey": null
    },
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
      "name": "is_followed",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = 'e2c8c185e485a2f0cf3079ead7217a61';
export default node;
