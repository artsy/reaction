/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Message_message = {
    readonly internalID: string;
    readonly body: string | null;
    readonly createdAt: string | null;
    readonly isFromUser: boolean | null;
    readonly from: {
        readonly name: string | null;
        readonly email: string | null;
    } | null;
    readonly " $refType": "Message_message";
};
export type Message_message$data = Message_message;
export type Message_message$key = {
    readonly " $data"?: Message_message$data;
    readonly " $fragmentRefs": FragmentRefs<"Message_message">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "Message_message",
  "type": "Message",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "internalID",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "body",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "createdAt",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "isFromUser",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "from",
      "storageKey": null,
      "args": null,
      "concreteType": "MessageInitiator",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "name",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "email",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
(node as any).hash = '8f5506e296f74d8b4a79772cff897128';
export default node;
