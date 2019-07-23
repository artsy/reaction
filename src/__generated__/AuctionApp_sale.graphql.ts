/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _AuctionApp_sale$ref: unique symbol;
export type AuctionApp_sale$ref = typeof _AuctionApp_sale$ref;
export type AuctionApp_sale = {
    readonly id: string;
    readonly name: string | null;
    readonly " $refType": AuctionApp_sale$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "AuctionApp_sale",
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
      "name": "name",
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
(node as any).hash = '45d242394533ca27d70663c04d107c58';
export default node;
