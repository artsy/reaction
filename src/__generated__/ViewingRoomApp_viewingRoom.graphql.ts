/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomApp_viewingRoom = {
    readonly " $fragmentRefs": FragmentRefs<"ViewingRoomHeader_viewingRoom">;
    readonly " $refType": "ViewingRoomApp_viewingRoom";
};
export type ViewingRoomApp_viewingRoom$data = ViewingRoomApp_viewingRoom;
export type ViewingRoomApp_viewingRoom$key = {
    readonly " $data"?: ViewingRoomApp_viewingRoom$data;
    readonly " $fragmentRefs": FragmentRefs<"ViewingRoomApp_viewingRoom">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ViewingRoomApp_viewingRoom",
  "type": "ViewingRoom",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "ViewingRoomHeader_viewingRoom",
      "args": null
    }
  ]
};
(node as any).hash = '5b669e0de97a0a87c6ed65389c648208';
export default node;
