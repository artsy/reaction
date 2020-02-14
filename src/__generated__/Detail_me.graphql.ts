/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Detail_me = {
    readonly conversation: {
        readonly internalID: string | null;
        readonly from: {
            readonly name: string;
        };
        readonly initialMessage: string;
        readonly messages: {
            readonly " $fragmentRefs": FragmentRefs<"Messages_messages">;
        } | null;
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
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "conversation",
      "storageKey": "conversation(id:\"840\")",
      "args": [
        {
          "kind": "Literal",
          "name": "id",
          "value": "840"
        }
      ],
      "concreteType": "Conversation",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "internalID",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "from",
          "storageKey": null,
          "args": null,
          "concreteType": "ConversationInitiator",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "name",
              "args": null,
              "storageKey": null
            }
          ]
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "initialMessage",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "messages",
          "storageKey": "messages(first:10)",
          "args": [
            {
              "kind": "Literal",
              "name": "first",
              "value": 10
            }
          ],
          "concreteType": "MessageConnection",
          "plural": false,
          "selections": [
            {
              "kind": "FragmentSpread",
              "name": "Messages_messages",
              "args": null
            }
          ]
        }
      ]
    }
  ]
};
(node as any).hash = 'd65e4bdc8fda4adcfee31f5b137a0867';
export default node;
