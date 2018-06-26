/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type RecentlyViewed_me = {
    readonly recentlyViewedArtworkIds: ReadonlyArray<string | null>;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "RecentlyViewed_me",
  "type": "Me",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "recentlyViewedArtworkIds",
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
(node as any).hash = '4a4051a37e94d686bcf9e133d4edaf3f';
export default node;
