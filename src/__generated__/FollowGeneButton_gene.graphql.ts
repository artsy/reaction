/**
 * @generated SignedSource<<9bd1eda96cc61d2d40a457bcf5ec73de>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FollowGeneButton_gene$data = {
  readonly id: string;
  readonly internalID: string;
  readonly slug: string;
  readonly name: string | null;
  readonly is_followed: boolean | null;
  readonly " $fragmentType": "FollowGeneButton_gene";
};
export type FollowGeneButton_gene = FollowGeneButton_gene$data;
export type FollowGeneButton_gene$key = {
  readonly " $data"?: FollowGeneButton_gene$data;
  readonly " $fragmentSpreads": FragmentRefs<"FollowGeneButton_gene">;
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
  "type": "Gene",
  "abstractKey": null
};

(node as any).hash = "76484c1820e13b5b07970107b5e1f5ca";

export default node;
