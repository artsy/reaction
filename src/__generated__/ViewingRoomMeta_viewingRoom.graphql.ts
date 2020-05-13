/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomMeta_viewingRoom = {
    readonly title: string;
    readonly introStatement: string;
    readonly " $refType": "ViewingRoomMeta_viewingRoom";
};
export type ViewingRoomMeta_viewingRoom$data = ViewingRoomMeta_viewingRoom;
export type ViewingRoomMeta_viewingRoom$key = {
    readonly " $data"?: ViewingRoomMeta_viewingRoom$data;
    readonly " $fragmentRefs": FragmentRefs<"ViewingRoomMeta_viewingRoom">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ViewingRoomMeta_viewingRoom",
  "type": "ViewingRoom",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "title",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "introStatement",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '67079ff482966f470612b46d07b5b40f';
export default node;
