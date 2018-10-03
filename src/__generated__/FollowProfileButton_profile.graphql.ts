/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _FollowProfileButton_profile$ref: unique symbol;
export type FollowProfileButton_profile$ref = typeof _FollowProfileButton_profile$ref;
export type FollowProfileButton_profile = {
    readonly __id: string;
    readonly is_followed: boolean | null;
    readonly " $refType": FollowProfileButton_profile$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "FollowProfileButton_profile",
  "type": "Profile",
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
      "name": "is_followed",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '5dc7784baa1ce244858e04a0edefee60';
export default node;
