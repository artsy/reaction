/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ConversationApp_me = {
    readonly " $fragmentRefs": FragmentRefs<"Conversations_me">;
    readonly " $refType": "ConversationApp_me";
};
export type ConversationApp_me$data = ConversationApp_me;
export type ConversationApp_me$key = {
    readonly " $data"?: ConversationApp_me$data;
    readonly " $fragmentRefs": FragmentRefs<"ConversationApp_me">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ConversationApp_me",
  "type": "Me",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "Conversations_me",
      "args": null
    }
  ]
};
(node as any).hash = '354ef28cb5343963c0a7b97c145b37ad';
export default node;
