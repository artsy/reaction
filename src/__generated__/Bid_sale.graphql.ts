/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _Bid_sale$ref: unique symbol;
export type Bid_sale$ref = typeof _Bid_sale$ref;
export type Bid_sale = {
    readonly id: string;
    readonly _id: string;
    readonly status: string | null;
    readonly " $refType": Bid_sale$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "Bid_sale",
  "type": "Sale",
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
      "name": "_id",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "status",
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
(node as any).hash = '55be147118fbf3e3348fad552697eb6a';
export default node;
