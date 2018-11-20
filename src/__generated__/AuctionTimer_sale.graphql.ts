/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _AuctionTimer_sale$ref: unique symbol;
export type AuctionTimer_sale$ref = typeof _AuctionTimer_sale$ref;
export type AuctionTimer_sale = {
    readonly live_start_at: string | null;
    readonly end_at: string | null;
    readonly " $refType": AuctionTimer_sale$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "AuctionTimer_sale",
  "type": "Sale",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "live_start_at",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "end_at",
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
(node as any).hash = '1f2163f3979be7879c3399cf91a8524f';
export default node;
