/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _AuctionApp_me$ref: unique symbol;
export type AuctionApp_me$ref = typeof _AuctionApp_me$ref;
export type AuctionApp_me = {
    readonly name: string | null;
    readonly " $refType": AuctionApp_me$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "AuctionApp_me",
  "type": "Me",
  "metadata": null,
  "argumentDefinitions": [],
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
      "name": "__id",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '6515d90c614f0b80c6154e38e2ee3896';
export default node;
