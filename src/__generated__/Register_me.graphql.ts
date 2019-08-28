/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _Register_me$ref: unique symbol;
export type Register_me$ref = typeof _Register_me$ref;
export type Register_me = {
    readonly id: string;
    readonly " $refType": Register_me$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "Register_me",
  "type": "Me",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "id",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "__id",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '6252a43fa617a5b5d2d66ceffe124a21';
export default node;
