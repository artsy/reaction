/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Messages_messages = {
    readonly edges: ReadonlyArray<{
        readonly node: {
            readonly " $fragmentRefs": FragmentRefs<"Message_message">;
        } | null;
    } | null> | null;
    readonly " $refType": "Messages_messages";
};
export type Messages_messages$data = Messages_messages;
export type Messages_messages$key = {
    readonly " $data"?: Messages_messages$data;
    readonly " $fragmentRefs": FragmentRefs<"Messages_messages">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "Messages_messages",
  "type": "MessageConnection",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "edges",
      "storageKey": null,
      "args": null,
      "concreteType": "MessageEdge",
      "plural": true,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "node",
          "storageKey": null,
          "args": null,
          "concreteType": "Message",
          "plural": false,
          "selections": [
            {
              "kind": "FragmentSpread",
              "name": "Message_message",
              "args": null
            }
          ]
        }
      ]
    }
  ]
};
(node as any).hash = 'e3d3eb117a81c6588453524a55302ee4';
export default node;
