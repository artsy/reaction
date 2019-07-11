/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _AuctionApp_sale$ref: unique symbol;
export type AuctionApp_sale$ref = typeof _AuctionApp_sale$ref;
export type AuctionApp_sale = {
    readonly id: string;
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
      "name": "__id",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '6f562e78150096f19413809fae60ce24';
export default node;
