/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Detail_me = {
    readonly conversation: {
        readonly " $fragmentRefs": FragmentRefs<"Conversation_conversation">;
    } | null;
    readonly " $refType": "Detail_me";
};
export type Detail_me$data = Detail_me;
export type Detail_me$key = {
    readonly " $data"?: Detail_me$data;
    readonly " $fragmentRefs": FragmentRefs<"Detail_me">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "Detail_me",
  "type": "Me",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "conversationID",
      "type": "String!",
      "defaultValue": null
    }
  ],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "conversation",
      "storageKey": null,
      "args": [
        {
          "kind": "Variable",
          "name": "id",
          "variableName": "conversationID"
        }
      ],
      "concreteType": "Conversation",
      "plural": false,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "Conversation_conversation",
          "args": null
        }
      ]
    }
  ]
};
(node as any).hash = '31b7e7cba20fc4499aca7969cf52b9ca';
export default node;
