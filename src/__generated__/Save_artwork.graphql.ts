/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
export type Save_artwork = {
    readonly id: string;
    readonly internalID: string;
    readonly slug: string;
    readonly is_saved: boolean | null;
    readonly title: string | null;
    readonly " $refType": "Save_artwork";
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "Save_artwork",
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
      "name": "internalID",
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
      "alias": "is_saved",
      "name": "isSaved",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "title",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = 'beeb9a74a0ff8d75076752d5be66523c';
export default node;
