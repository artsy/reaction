/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
export type FollowProfileButton_profile = {
    readonly id: string;
    readonly slug: string;
    readonly is_followed: boolean | null;
    readonly " $refType": "FollowProfileButton_profile";
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "FollowProfileButton_profile",
  "type": "Profile",
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
(node as any).hash = '1a39019c6ce24400ef796489391f9b3a';
export default node;
