/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomStatementRoute_viewingRoom = {
    readonly " $fragmentRefs": FragmentRefs<"ViewingRoomIntro_viewingRoom" | "ViewingRoomWorks_viewingRoom" | "ViewingRoomSubsections_viewingRoom">;
    readonly " $refType": "ViewingRoomStatementRoute_viewingRoom";
};
export type ViewingRoomStatementRoute_viewingRoom$data = ViewingRoomStatementRoute_viewingRoom;
export type ViewingRoomStatementRoute_viewingRoom$key = {
    readonly " $data"?: ViewingRoomStatementRoute_viewingRoom$data;
    readonly " $fragmentRefs": FragmentRefs<"ViewingRoomStatementRoute_viewingRoom">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ViewingRoomStatementRoute_viewingRoom",
  "type": "ViewingRoom",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "ViewingRoomIntro_viewingRoom",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ViewingRoomWorks_viewingRoom",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ViewingRoomSubsections_viewingRoom",
      "args": null
    }
  ]
};
(node as any).hash = '0a75295ac5a8aca9f7d211f215810c21';
export default node;
