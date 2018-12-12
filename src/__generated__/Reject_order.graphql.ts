/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _Reject_order$ref: unique symbol;
export type Reject_order$ref = typeof _Reject_order$ref;
export type Reject_order = {
    readonly id: string | null;
    readonly stateExpiresAt: string | null;
    readonly " $refType": Reject_order$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "Reject_order",
  "type": "Order",
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
      "name": "stateExpiresAt",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": "__id",
      "name": "id",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '8c6f00be05dfc79a6272149506646a01';
export default node;
