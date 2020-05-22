/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FlashBanner_me = {
    readonly canRequestEmailConfirmation: boolean;
    readonly " $refType": "FlashBanner_me";
};
export type FlashBanner_me$data = FlashBanner_me;
export type FlashBanner_me$key = {
    readonly " $data"?: FlashBanner_me$data;
    readonly " $fragmentRefs": FragmentRefs<"FlashBanner_me">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "FlashBanner_me",
  "type": "Me",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "canRequestEmailConfirmation",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '22d7d766aeec869eb44fe74bb86416a4';
export default node;
