/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
export type Register_me = {
    readonly internalID: string;
    readonly " $refType": "Register_me";
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "Register_me",
  "type": "Me",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "internalID",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '531cbde168ca200001bfd2874f3be044';
export default node;
