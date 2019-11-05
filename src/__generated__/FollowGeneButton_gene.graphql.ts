/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
export type FollowGeneButton_gene = {
    readonly id: string;
    readonly slug: string;
    readonly is_followed: boolean | null;
    readonly " $refType": "FollowGeneButton_gene";
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "FollowGeneButton_gene",
  "type": "Gene",
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
(node as any).hash = 'e771524a20d62a99e58286bd97c71bd1';
export default node;
