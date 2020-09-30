/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FollowGeneButton_gene = {
    readonly id: string;
    readonly internalID: string;
    readonly slug: string;
    readonly name: string | null;
    readonly is_followed: boolean | null;
    readonly " $refType": "FollowGeneButton_gene";
};
export type FollowGeneButton_gene$data = FollowGeneButton_gene;
export type FollowGeneButton_gene$key = {
    readonly " $data"?: FollowGeneButton_gene$data;
    readonly " $fragmentRefs": FragmentRefs<"FollowGeneButton_gene">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FollowGeneButton_gene",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": "is_followed",
      "args": null,
      "kind": "ScalarField",
      "name": "isFollowed",
      "storageKey": null
    }
  ],
  "type": "Gene"
};
(node as any).hash = '76484c1820e13b5b07970107b5e1f5ca';
export default node;
