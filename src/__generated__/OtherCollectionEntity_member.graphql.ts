/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _OtherCollectionEntity_member$ref: unique symbol;
export type OtherCollectionEntity_member$ref = typeof _OtherCollectionEntity_member$ref;
export type OtherCollectionEntity_member = {
    readonly slug: string;
    readonly thumbnail: string | null;
    readonly title: string;
    readonly " $refType": OtherCollectionEntity_member$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "OtherCollectionEntity_member",
  "type": "MarketingCollection",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "slug",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "thumbnail",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "title",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": "__id",
      "name": "id",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '9240c380fecb65bb0486a4b0f4fd151b';
export default node;
