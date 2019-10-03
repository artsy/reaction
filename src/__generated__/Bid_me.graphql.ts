/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _Bid_me$ref: unique symbol;
export type Bid_me$ref = typeof _Bid_me$ref;
export type Bid_me = {
    readonly id: string;
    readonly " $refType": Bid_me$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "Bid_me",
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
(node as any).hash = '537b9a624b9b8880c8b845ac1a76601d';
export default node;
