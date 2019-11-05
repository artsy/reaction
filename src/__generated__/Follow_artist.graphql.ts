/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
export type Follow_artist = {
    readonly id: string;
    readonly slug: string;
    readonly is_followed: boolean | null;
    readonly " $refType": "Follow_artist";
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
      "name": "id",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "slug",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": "is_followed",
      "name": "isFollowed",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '222ffbc9318fa671f86c1b8664e1be9e';
export default node;
