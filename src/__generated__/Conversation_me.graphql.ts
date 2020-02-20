/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Conversation_me = {
    readonly conversation: {
        readonly " $fragmentRefs": FragmentRefs<"Conversation_conversation">;
    } | null;
    readonly " $refType": "Conversation_me";
};
export type Conversation_me$data = Conversation_me;
export type Conversation_me$key = {
    readonly " $data"?: Conversation_me$data;
    readonly " $fragmentRefs": FragmentRefs<"Conversation_me">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "Conversation_me",
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
(node as any).hash = '18150510f9877cb7750c9445cf147f55';
export default node;
